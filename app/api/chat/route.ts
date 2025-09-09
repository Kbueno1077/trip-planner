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
import { prompt } from "./_components/prompt";

const tools = {
  showBudgetUI: tool({
    description:
      "Show budget selection UI to the user. Only use this when you need to ask about budget preferences.",
    inputSchema: z.object({
      message: z.string().describe("Message to display with the budget UI"),
      genUI: z.string().describe("The UI Component we are going to render"),
    }),
    execute: async ({ message }) => {
      return {
        message,
        uiType: "budget-selection",
      };
    },
  }),
  showGroupSizeUI: tool({
    description:
      "Show group size selection UI to the user. Only use this when you need to ask about group size.",
    inputSchema: z.object({
      message: z.string().describe("Message to display with the group size UI"),
      genUI: z.string().describe("The UI Component we are going to render"),
    }),
    execute: async ({ message }) => {
      return {
        message,
        uiType: "group-size-selection",
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
      genUI: z.string().describe("The UI Component we are going to render"),
    }),
    execute: async ({ message }) => {
      return {
        message,
        uiType: "trip-duration-selection",
      };
    },
  }),
  showInterestsUI: tool({
    description:
      "Show interests selection UI to the user. Only use this when you need to ask about travel interests and preferences.",
    inputSchema: z.object({
      message: z.string().describe("Message to display with the interests UI"),
      genUI: z.string().describe("The UI Component we are going to render"),
    }),
    execute: async ({ message }) => {
      return {
        message,
        uiType: "interests-selection",
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
      genUI: z.string().describe("The UI Component we are going to render"),
    }),
    execute: async ({ message }) => {
      return {
        message,
        uiType: "accommodation-selection",
      };
    },
  }),
  showFinalUI: tool({
    description:
      "Show final trip generation UI to the user. Only use this when all required information has been collected.",
    inputSchema: z.object({
      message: z.string().describe("Message to display with the final UI"),
      genUI: z.string().describe("The UI Component we are going to render"),
    }),
    execute: async ({ message }) => {
      return {
        message,
        uiType: "final-trip-generation",
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
      model: openai("gpt-4.1-mini"),
      tools,
      system: prompt,
      experimental_transform: smoothStream({ chunking: "word" }),
      toolChoice: "auto",
      messages: convertToModelMessages(messages, {
        ignoreIncompleteToolCalls: true,
        tools: tools,
      }),
      stopWhen: stepCountIs(2),
      onStepFinish(stepFinished) {
        console.log("Step finished:", stepFinished);
      },
    });

    const steps = result.steps;
    const allToolCalls = (await steps).flatMap((step) => step.toolCalls);
    console.log("🚀 ~ POST ~ allToolCalls:", allToolCalls);

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
