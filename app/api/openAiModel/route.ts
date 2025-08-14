import { finalPrompt } from "@/data/finalPrompt";
import { prompt } from "@/data/prompt";
import { PRO_PLAN_ID } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { aj } from "../arcjet/route";

export const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

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
    const messages = body?.messages ?? body?.body?.messages ?? [];
    const isFinal = body?.isFinal ?? false;

    let completion: OpenAI.Chat.Completions.ChatCompletion;

    if (isFinal) {
      completion = await openai.chat.completions.create({
        model: "openai/gpt-oss-20b:free",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: finalPrompt,
          },
          ...messages,
        ],
      });
    } else {
      completion = await openai.chat.completions.create({
        model: "openai/gpt-oss-20b:free",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: prompt,
          },
          ...messages,
        ],
      });
    }

    const message = completion.choices[0].message;

    type AiResponse = { resp: string; ui: string };
    let data: AiResponse;
    try {
      data = JSON.parse(message.content ?? "{}") as AiResponse;
    } catch {
      data = { resp: message.content ?? "", ui: "" };
    }
    return NextResponse.json(data satisfies AiResponse);
  } catch (error) {
    console.error("Error in AI model route:", error);
    return NextResponse.json(
      {
        error: String(error),
        message: "Sorry, something went wrong. Please try again.",
      },
      { status: 500 },
    );
  }
}
