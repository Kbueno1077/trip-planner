"use client";

import { ChatMessages } from "@/app/api/chat/route";
import { generateUUID } from "@/lib/utils";

export interface UserAction {
  toolId: string;
  toolCallId?: string;
  action: string;
  data?: any;
  context?: any;
}

export function useGenerativeActions({
  sendMessage,
}: {
  sendMessage: (message: ChatMessages) => void;
}) {
  const handleUserAction = (action: UserAction) => {
    // Create descriptive messages based on actions
    let content = "";

    switch (action.action) {
      case "select_budget":
        content = `I have selected my budget preference: ${action.data?.budget || "this budget"}. Please proceed to the next question.`;
        break;
      case "select_group_size":
        content = `I have selected my group size: ${action.data?.groupSize || "this group size"} (${action.data?.people || ""} people). Please proceed to the next question.`;
        break;
      case "select_duration":
        content = `I have selected my trip duration: ${action.data?.duration || "this duration"}. Please proceed to the next question.`;
        break;
      case "generate_final":
        content = `I have provided all the required information. Please generate my final trip plan.`;
        break;
      default:
        content = `I performed the action: ${action.action}`;
    }

    // Send to LLM using sendMessage (Vercel AI SDK v5)
    console.log("action", action);
    sendMessage({
      role: "user",
      id: generateUUID(),
      parts: [
        {
          type: "text",
          text: content,
        },
      ],
    });
  };

  return { handleUserAction };
}
