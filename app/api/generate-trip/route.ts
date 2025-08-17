import { finalPrompt } from "@/data/finalPrompt";
import { PRO_PLAN_ID } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { aj } from "@/arcject/config";

import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { tripPlanSchema } from "./structuredData";

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
      model: google("gemini-2.0-flash-exp"),
      schema: tripPlanSchema,
      messages: [
        {
          role: "system",
          content: finalPrompt,
        },
        ...messages,
      ],
    });

    return NextResponse.json({
      trip_plan: geminiResponse.object.trip_plan,
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
