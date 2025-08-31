"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useTripDetailContext } from "@/context/TripDetailContext";
import { useUserContext } from "@/context/UserDetailContext";
import { useGenerativeActions } from "@/hooks/use-generative-actions";
import { useChat } from "@ai-sdk/react";
import { useGenerativeUI, useRenderGenerativeUI } from "@front10/generative-ui";
import { Loader2, SendIcon } from "lucide-react";
import { useCallback, useLayoutEffect, useState } from "react";
import { toast } from "sonner";

import { ChatMessages } from "@/app/api/chat/route";
import { DefaultChatTransport } from "ai";
import BudgetUI, { BudgetUIError, BudgetUILoading } from "./BudgetUI";
import EmptyBoxState from "./EmptyBoxState";
import FinalUI, { FinalUIError, FinalUILoading } from "./FinalUI";
import GroupSizeUI, {
  GroupSizeUIError,
  GroupSizeUILoading,
} from "./GroupSizeUI";
import TripDurationUI, {
  TripDurationUIError,
  TripDurationUILoading,
} from "./TripDurationUI";

function ChatBox() {
  const [isFinalLoading, setIsFinalLoading] = useState(false);

  const { tripDetails, setTripDetails } = useTripDetailContext();
  const { userDetails } = useUserContext();
  const [input, setInput] = useState("");

  const { messages, sendMessage, status, error, stop } = useChat<ChatMessages>({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  // Front10 Generative UI hooks
  const { registerComponent } = useGenerativeUI();
  const renderGenerativeUI = useRenderGenerativeUI();
  const { handleUserAction } = useGenerativeActions({ sendMessage });

  const whenFinal = useCallback(async () => {
    setIsFinalLoading(true);

    try {
      const response = await fetch("/api/generate-trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: messages,
        }),
      });

      const result = await response.json();
      console.log("🚀 ~ ChatBox ~ result:", result);

      setTripDetails(result?.data?.trip_plan);
      setIsFinalLoading(false);
    } catch (error: unknown) {
      console.error("Error in final step:", error);
      const errorMessage =
        error && typeof error === "object" && "response" in error
          ? (error as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : undefined;

      toast.error(
        errorMessage ??
          "Sorry, there was an error generating your final trip plan. Please try again.",
      );
      setIsFinalLoading(false);
    } finally {
      setIsFinalLoading(false);
    }
  }, [messages, setTripDetails]);

  // Register components with the generative UI system
  useLayoutEffect(() => {
    console.log("🔧 Registering components...");

    registerComponent({
      toolId: "showBudgetUI",
      LoadingComponent: BudgetUILoading,
      SuccessComponent: ({ onAction }) => (
        <BudgetUI
          onSelectBudget={(budget) => {
            onAction?.({
              action: "select_budget",
              data: { budget: budget.title, description: budget.desc },
            });
          }}
        />
      ),
      ErrorComponent: BudgetUIError,
      onUserAction: (action) => {
        handleUserAction(action);
      },
    });

    registerComponent({
      toolId: "showGroupSizeUI",
      LoadingComponent: GroupSizeUILoading,
      SuccessComponent: ({ onAction }) => (
        <GroupSizeUI
          onSelectGroupSize={(groupSize) => {
            onAction?.({
              action: "select_group_size",
              data: { groupSize: groupSize.title, people: groupSize.people },
            });
          }}
        />
      ),
      ErrorComponent: GroupSizeUIError,
      onUserAction: (action) => {
        handleUserAction(action);
      },
    });

    registerComponent({
      toolId: "showTripDurationUI",
      LoadingComponent: TripDurationUILoading,
      SuccessComponent: ({ onAction }) => (
        <TripDurationUI
          onSelectDuration={(duration) => {
            onAction?.({
              action: "select_duration",
              data: { duration: `${duration} days` },
            });
          }}
        />
      ),
      ErrorComponent: TripDurationUIError,
      onUserAction: (action) => {
        handleUserAction(action);
      },
    });

    registerComponent({
      toolId: "showFinalUI",
      LoadingComponent: FinalUILoading,
      SuccessComponent: ({ onAction }) => (
        <FinalUI
          isFinalLoading={isFinalLoading}
          tripDetails={tripDetails}
          onAction={onAction}
        />
      ),
      ErrorComponent: FinalUIError,
      onUserAction: (action) => {
        // handleUserAction(action);
        whenFinal();
      },
    });

    console.log("✅ Components registered successfully");
  }, [
    registerComponent,
    handleUserAction,
    isFinalLoading,
    tripDetails,
    whenFinal,
  ]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input.trim()) {
      sendMessage({
        text: input,
      });

      setInput("");
    }
  };

  return (
    <div className="h-[90dvh] flex flex-col px-3">
      {messages.length === 0 && (
        <EmptyBoxState
          onSelectOption={(option) => {
            sendMessage({
              text: option,
            });
          }}
        />
      )}

      {messages.length > 0 && (
        <section className="flex-1 overflow-auto p-4">
          <div className="flex flex-col justify-end mt-2 gap-3">
            {messages.map((message) => {
              return (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-4`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                        : "bg-white border border-gray-200 text-gray-800 shadow-sm hover:border-gray-300"
                    }`}
                  >
                    {message.parts?.map((part, index) => {
                      if (part.type.startsWith("tool-")) {
                        const toolId = part.type.replace("tool-", "");

                        // Use type guards to safely access properties
                        const toolCallId =
                          "toolCallId" in part
                            ? part.toolCallId
                            : `tool-${index}`;
                        const state =
                          "state" in part ? part.state : "input-available";
                        const input = "input" in part ? part.input : undefined;
                        const output =
                          "output" in part ? part.output : undefined;
                        const error =
                          "errorText" in part ? part.errorText : undefined;

                        console.log("🔧 Tool part:", {
                          toolId,
                          state,
                          input,
                          output,
                          error,
                          toolCallId,
                          partType: part.type,
                        });

                        const renderedComponent = renderGenerativeUI({
                          toolId,
                          state: state as
                            | "input-streaming"
                            | "input-available"
                            | "output-available"
                            | "output-error",
                          input,
                          output,
                          error,
                          toolCallId,
                        });

                        console.log(
                          "🎨 Rendered component:",
                          renderedComponent,
                        );

                        if (renderedComponent) {
                          return (
                            <div key={toolCallId}>{renderedComponent}</div>
                          );
                        }

                        // Fallback for unregistered tools
                        return (
                          <div
                            key={toolCallId}
                            className="p-4 border border-gray-200 rounded-lg bg-gray-50"
                          >
                            Tool not registered: {toolId}
                          </div>
                        );
                      }

                      if (part.type === "text") {
                        return (
                          <div key={`${message.id}-${part.text}-${index}`}>
                            {part.text}
                          </div>
                        );
                      }

                      return null;
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {(status === "streaming" || status === "submitted") && (
            <div className="flex items-center mt-2 self-start">
              <div className="max-w-lg bg-gray-100 text-black px-4 py-2 rounded-md">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                  <span className="text-gray-600">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      <section>
        <form onSubmit={handleSubmit}>
          <div className="relative rounded-2xl border p-3 sm:p-4">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Create a trip for Paris from New York"
              className="h-28 w-full resize-none bg-transparent shadow-none border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />

            <Button
              type="submit"
              size="icon"
              className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4"
              disabled={
                status === "streaming" ||
                status === "submitted" ||
                isFinalLoading
              }
            >
              {status === "streaming" ||
              status === "submitted" ||
              isFinalLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <SendIcon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default ChatBox;
