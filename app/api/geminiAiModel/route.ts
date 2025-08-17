import { prompt } from "@/data/prompt";
import { PRO_PLAN_ID } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { google } from "@ai-sdk/google";
import { generateObject, convertToModelMessages } from "ai";
import { chatResponseSchema } from "./chatSchema";
import { aj } from "@/arcject/config";

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
      return new Response(
        JSON.stringify({
          error: "Too Many Requests",
          message:
            "You have reached the rate limit for today. Please try again tomorrow.",
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const body = await req.json();
    const messages = body?.messages ?? [];

    const result = await generateObject({
      model: google("gemini-2.0-flash-exp"),
      schema: chatResponseSchema,
      messages: [
        {
          role: "system",
          content: prompt,
        },
        ...messages,
      ],
    });

    return new Response(
      JSON.stringify({
        text: result.object.text,
        ui: result.object.ui,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error: unknown) {
    console.error("Error in Gemini AI route:", error);
    return new Response(
      JSON.stringify({
        error: String(error),
        message: "Sorry, something went wrong. Please try again.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
