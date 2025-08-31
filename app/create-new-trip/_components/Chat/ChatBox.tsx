"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useTripDetailContext } from "@/context/TripDetailContext";
import { useUserContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import { useGenerativeActions } from "@/hooks/use-generative-actions";
import { useChat } from "@ai-sdk/react";
import { useGenerativeUI, useRenderGenerativeUI } from "@front10/generative-ui";
import { useMutation } from "convex/react";
import { Loader2, SendIcon } from "lucide-react";
import { useLayoutEffect, useState } from "react";
import { toast } from "sonner";
import { v4 } from "uuid";

import { ChatMessages } from "@/app/api/chat/route";
import { DefaultChatTransport, ToolUIPart } from "ai";
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
  const saveTripDetails = useMutation(api.tripDetails.createNewTripDetails);

  // Front10 Generative UI hooks
  const { registerComponent } = useGenerativeUI();
  const renderGenerativeUI = useRenderGenerativeUI();
  const { handleUserAction } = useGenerativeActions();

  const [input, setInput] = useState("");

  const { messages, sendMessage, status, error, stop } = useChat<ChatMessages>({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  // Register components with the generative UI system
  useLayoutEffect(() => {
    registerComponent({
      toolId: "tool-showBudgetUI",
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
        const content = handleUserAction(action);
        onSend(content);
      },
    });

    registerComponent({
      toolId: "tool-showGroupSizeUI",
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
        const content = handleUserAction(action);
        onSend(content);
      },
    });

    registerComponent({
      toolId: "tool-showTripDurationUI",
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
        const content = handleUserAction(action);
        onSend(content);
      },
    });

    registerComponent({
      toolId: "tool-showFinalUI",
      LoadingComponent: FinalUILoading,
      SuccessComponent: ({ onAction }) => (
        <FinalUI isFinalLoading={isFinalLoading} tripDetails={tripDetails} />
      ),
      ErrorComponent: FinalUIError,
      onUserAction: (action) => {
        const content = handleUserAction(action);
        whenFinal();
      },
    });
  }, [registerComponent, handleUserAction, isFinalLoading, tripDetails]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input.trim()) {
      onSend(input);
    }
  };

  const onSend = async (message?: string) => {
    if (!input && !message) return;

    sendMessage({
      text: message ?? input,
    });

    setInput("");
  };

  const whenFinal = async () => {
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
      setTripDetails(result?.data?.trip_plan);
      setIsFinalLoading(false);

      if (userDetails) {
        const tripId = v4();

        await saveTripDetails({
          tripId: tripId,
          tripDetail: {
            ...result?.data?.trip_plan,
            id: tripId,
          },
          uid: userDetails._id,
        });
      }
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
    } finally {
      setIsFinalLoading(false);
    }
  };

  const renderGenUI = (part: ToolUIPart) => {
    let state:
      | "input-streaming"
      | "input-available"
      | "output-available"
      | "output-error" = "output-available";

    if (status === "streaming" || status === "submitted") {
      state = "input-streaming";
    }

    const renderedComponent = renderGenerativeUI({
      toolId: part.type,
      state,
      input: part.input,
      output: { success: true },
      toolCallId: part.toolCallId,
    });

    if (renderedComponent) {
      return <div>{renderedComponent}</div>;
    }

    // Fallback for unregistered tools
    return (
      <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
        Tool not registered: {part.type}
      </div>
    );
  };

  return (
    <div className="h-[90dvh] flex flex-col px-3">
      {messages.length === 0 && (
        <EmptyBoxState
          onSelectOption={(option) => {
            onSend(option);
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
                      switch (part.type) {
                        case "text":
                          return (
                            <div
                              key={`${message.id}-${part.text}-${index}`}
                              className="whitespace-pre-wrap leading-relaxed"
                            >
                              {part.text}
                            </div>
                          );

                        case "tool-showBudgetUI":
                        case "tool-showGroupSizeUI":
                        case "tool-showTripDurationUI":
                        case "tool-showFinalUI":
                          return (
                            <div
                              key={`${message.id}-${part.toolCallId}-${index}`}
                            >
                              {renderGenUI(part)}
                            </div>
                          );

                        default:
                          return null;
                      }
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
