import { prompt } from "@/data/prompt";
import { PRO_PLAN_ID } from "@/lib/utils";
import { openai } from "@ai-sdk/openai";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { aj } from "@/arcject/config";
import {
  convertToModelMessages,
  InferUITools,
  streamText,
  tool,
  UIDataTypes,
  UIMessage,
} from "ai";
import { z } from "zod";

const tools = {
  showBudgetUI: tool({
    description: "Show budget selection UI to the user",
    inputSchema: z.object({
      message: z.string().describe("Message to display with the budget UI"),
    }),
  }),
  showGroupSizeUI: tool({
    description: "Show group size selection UI to the user",
    inputSchema: z.object({
      message: z.string().describe("Message to display with the group size UI"),
    }),
  }),
  showTripDurationUI: tool({
    description: "Show trip duration selection UI to the user",
    inputSchema: z.object({
      message: z
        .string()
        .describe("Message to display with the trip duration UI"),
    }),
  }),
  showFinalUI: tool({
    description: "Show final trip generation UI to the user",
    inputSchema: z.object({
      message: z.string().describe("Message to display with the final UI"),
    }),
  }),
};

export type ChatTools = InferUITools<typeof tools>;
export type ChatMessages = UIMessage<ChatTools, UIDataTypes>;

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

    const result = await streamText({
      model: openai("gpt-4.1-nano"),
      tools,
      system: prompt,
      messages: convertToModelMessages(messages, {
        ignoreIncompleteToolCalls: true,
        tools: tools,
      }),
    });

    return result.toUIMessageStreamResponse();
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
