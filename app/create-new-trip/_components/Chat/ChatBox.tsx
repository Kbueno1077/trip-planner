"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useTripDetailContext } from "@/context/TripDetailContext";
import { useUserContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import axios from "axios";
import { useMutation } from "convex/react";
import { Loader2, SendIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { v4 } from "uuid";
import BudgetUI, { BudgetType } from "./BudgetUI";
import EmptyBoxState from "./EmptyBoxState";
import FinalUI from "./FinalUI";
import GroupSizeUI, { type GroupSizeType } from "./GroupSizeUI";
import TripDurationUI from "./TripDurationUI";

interface Message {
  role: "user" | "assistant";
  content: string;
  ui?: string;
}

function ChatBox() {
  const [isFinalLoading, setIsFinalLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const { tripDetails, setTripDetails } = useTripDetailContext();
  const { userDetails } = useUserContext();
  const saveTripDetails = useMutation(api.tripDetails.createNewTripDetails);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSend();
  };

  const onSend = async (message?: string) => {
    if (!input && !message) return;

    const newMessage: Message = {
      role: "user",
      content: message ?? input,
    };

    setInput("");
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);

    setIsLoading(true);

    try {
      const result = await axios.post("/api/geminiAiModel", {
        messages: updatedMessages,
      });

      const responseData =
        typeof result.data === "string" ? JSON.parse(result.data) : result.data;

      const assistantMessage: Message = {
        role: "assistant",
        content: responseData.text || result.data,
        ui: responseData.ui || "none",
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Handle final state directly
      if (responseData.ui === "final") {
        setIsLoading(false);
        await whenFinal();
        return;
      }
    } catch (error: unknown) {
      console.error("Error sending message:", error);
      const errorMessage =
        error && typeof error === "object" && "response" in error
          ? (error as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : undefined;

      toast.error(
        errorMessage || "Sorry, something went wrong. Please try again.",
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            errorMessage ?? "Sorry, something went wrong. Please try again.",
          ui: "none",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const whenFinal = async () => {
    setIsFinalLoading(true);

    try {
      const result = await axios.post("/api/generate-trip", {
        messages: messages,
      });

      setTripDetails(result?.data?.trip_plan);
      setIsFinalLoading(false);

      if (userDetails) {
        await saveTripDetails({
          tripId: v4(),
          tripDetail: result?.data?.trip_plan,
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

  const onSelectGroupSize = (traveler: GroupSizeType) => {
    onSend(traveler.title.toString() + ", " + traveler.people.toString());
  };

  const onSelectBudget = (budget: BudgetType) => {
    onSend(budget.title.toString() + ", " + budget.desc.toString());
  };

  const onSelectDuration = (days: number) => {
    onSend(days.toString() + " " + "days");
  };

  const renderGenUI = (message: Message) => {
    const ui = message.ui || "none";

    switch (ui) {
      case "budget":
        return <BudgetUI onSelectBudget={onSelectBudget} />;
      case "tripDuration":
        return <TripDurationUI onSelectDuration={onSelectDuration} />;
      case "groupSize":
        return <GroupSizeUI onSelectGroupSize={onSelectGroupSize} />;
      case "final":
        return (
          <FinalUI isFinalLoading={isFinalLoading} tripDetails={tripDetails} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-[90dvh] flex flex-col pt-10 px-3 ">
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
            {messages.map((message: Message, index: number) => {
              const isUser = message.role === "user";

              if (isUser) {
                return (
                  <div
                    key={index}
                    className="max-w-lg w-fit bg-primary text-white px-4 py-2 rounded-md self-end"
                  >
                    {message.content}
                  </div>
                );
              } else {
                return (
                  <div
                    key={index}
                    className="flex w-fit justify-start mt-2 self-start"
                  >
                    <div className="max-w-lg bg-gray-100 text-black px-4 py-2 rounded-md">
                      {message.content}
                      {renderGenUI(message)}
                    </div>
                  </div>
                );
              }
            })}
          </div>

          {isLoading && (
            <div className="flex items-center mt-2 self-start">
              <div className="max-w-lg bg-gray-100 text-black px-4 py-2 rounded-md">
                <div className="flex items-center space-x-1">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
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
              disabled={isLoading || isFinalLoading}
            >
              {isLoading || isFinalLoading ? (
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
