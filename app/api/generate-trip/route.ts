import { aj } from "@/arcject/config";
import { finalPrompt } from "@/data/finalPrompt";
import { PRO_PLAN_ID } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, generateObject } from "ai";
import { tripPlanSchema } from "./structuredData";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { v4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();
    const { has } = await auth();
    const hasPremiumAccess = has({ plan: PRO_PLAN_ID });

    const decision = await aj.protect(req, {
      requested: 5,
      userId: user?.primaryEmailAddress?.emailAddress ?? "",
    });

    if (!hasPremiumAccess && decision.reason.isRateLimit()) {
      return NextResponse.json(
        {
          error: "Too Many Requests",
          message:
            "You have reached the rate limit for today. Please try again tomorrow.",
        },
        { status: 429 },
      );
    }

    const body = await req.json();
    const messages = body?.messages ?? [];

    // For final trip plan generation with structured output
    const geminiResponse = await generateObject({
      model: openai("gpt-4o-mini"), // Fixed model name
      schema: tripPlanSchema,
      system: finalPrompt,
      messages: convertToModelMessages(messages, {
        ignoreIncompleteToolCalls: true,
      }),
    });
    let convexTripId = null;
    // Save trip details to Convex if user is authenticated
    if (user?.primaryEmailAddress?.emailAddress) {
      try {
        const userDoc = await fetchQuery(api.user.getUserByEmail, {
          email: user.primaryEmailAddress.emailAddress,
        });

        if (userDoc) {
          const tripId = v4();

          // Save trip details to Convex using server-side mutation
          const newTripDetails = await fetchMutation(
            api.tripDetails.createNewTripDetails,
            {
              tripId: tripId,
              tripDetail: {
                ...geminiResponse.object.trip_plan,
                id: tripId,
              },
              uid: userDoc._id,
            },
          );

          convexTripId = newTripDetails._id;
          console.log("✅ Trip details saved to Convex successfully");
        }
      } catch (error) {
        console.error("❌ Error saving trip details to Convex:", error);
        console.error("Error details:", error);
        // Don't fail the request if saving to Convex fails
      }
    }

    return NextResponse.json({
      trip_plan: { ...geminiResponse.object.trip_plan, id: convexTripId },
    });
  } catch (error: unknown) {
    console.error("Error in Generate Trip route:", error);
    return NextResponse.json(
      {
        error: String(error),
        message: "Sorry, something went wrong. Please try again.",
      },
      { status: 500 },
    );
  }
}
