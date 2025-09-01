import { prompt } from "@/data/prompt";
import { PRO_PLAN_ID } from "@/lib/utils";
import { openai } from "@ai-sdk/openai";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { aj } from "@/arcject/config";
import {
  convertToModelMessages,
  InferUITools,
  smoothStream,
  stepCountIs,
  streamText,
  tool,
  UIDataTypes,
  UIMessage,
} from "ai";
import { z } from "zod";

const tools = {
  showBudgetUI: tool({
    description:
      "Show budget selection UI to the user. Only use this when you need to ask about budget preferences.",
    inputSchema: z.object({
      message: z.string().describe("Message to display with the budget UI"),
    }),
    execute: async ({ message }) => {
      console.log("🔧 showBudgetUI executed with message:", message);
      return {
        message,
        uiType: "budget-selection",
        status: "ready",
      };
    },
  }),
  showGroupSizeUI: tool({
    description:
      "Show group size selection UI to the user. Only use this when you need to ask about group size.",
    inputSchema: z.object({
      message: z.string().describe("Message to display with the group size UI"),
    }),
    execute: async ({ message }) => {
      console.log("🔧 showGroupSizeUI executed with message:", message);
      return {
        message,
        uiType: "group-size-selection",
        status: "ready",
      };
    },
  }),
  showTripDurationUI: tool({
    description:
      "Show trip duration selection UI to the user. Only use this when you need to ask about trip duration.",
    inputSchema: z.object({
      message: z
        .string()
        .describe("Message to display with the trip duration UI"),
    }),
    execute: async ({ message }) => {
      console.log("🔧 showTripDurationUI executed with message:", message);
      return {
        message,
        uiType: "trip-duration-selection",
        status: "ready",
      };
    },
  }),
  showInterestsUI: tool({
    description:
      "Show interests selection UI to the user. Only use this when you need to ask about travel interests and preferences.",
    inputSchema: z.object({
      message: z.string().describe("Message to display with the interests UI"),
    }),
    execute: async ({ message }) => {
      console.log("🔧 showInterestsUI executed with message:", message);
      return {
        message,
        uiType: "interests-selection",
        status: "ready",
      };
    },
  }),
  showAccommodationUI: tool({
    description:
      "Show accommodation selection UI to the user. Only use this when you need to ask about accommodation preferences.",
    inputSchema: z.object({
      message: z
        .string()
        .describe("Message to display with the accommodation UI"),
    }),
    execute: async ({ message }) => {
      console.log("🔧 showAccommodationUI executed with message:", message);
      return {
        message,
        uiType: "accommodation-selection",
        status: "ready",
      };
    },
  }),
  showFinalUI: tool({
    description:
      "Show final trip generation UI to the user. Only use this when all required information has been collected.",
    inputSchema: z.object({
      message: z.string().describe("Message to display with the final UI"),
    }),
    execute: async ({ message }) => {
      console.log("🔧 showFinalUI executed with message:", message);
      return {
        message,
        uiType: "final-trip-generation",
        status: "ready",
      };
    },
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
      experimental_transform: smoothStream({ chunking: "word" }),
      messages: convertToModelMessages(messages, {
        ignoreIncompleteToolCalls: true,
        tools: tools,
      }),
      stopWhen: stepCountIs(1),
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
