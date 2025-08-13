import { finalPrompt } from "@/data/finalPrompt";
import { prompt } from "@/data/prompt";
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = body?.messages ?? body?.body?.messages ?? [];
    const isFinal = body?.isFinal ?? false;

    // Get the model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
      generationConfig: {
        temperature: 1,
        topP: 0.9,
        topK: 40,
        responseMimeType: "application/json", // This ensures JSON response
      },
    });

    // Prepare the system prompt
    const systemPrompt = isFinal ? finalPrompt : prompt;

    // Convert messages to Gemini format
    const geminiMessages = [
      {
        role: "user",
        parts: [{ text: systemPrompt }],
      },
      ...messages.map((msg: { role: string; content: string }) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      })),
    ];

    // Send message to Gemini with full conversation history
    const result = await model.generateContent({ contents: geminiMessages });
    const response = await result.response;
    const responseText = response.text();

    type AiResponse = { resp: string; ui: string };
    let data: AiResponse;

    try {
      data = JSON.parse(responseText) as AiResponse;
    } catch {
      // Fallback if JSON parsing fails
      data = { resp: responseText, ui: "" };
    }

    return NextResponse.json(data satisfies AiResponse);
  } catch (error) {
    console.error("Error in Gemini AI route:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
