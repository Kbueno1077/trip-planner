"use client";

import { Button } from "@/components/ui/button";
import { useTripDetailContext } from "@/context/TripDetailContext";
import { TripPlan } from "@/types/trip_details";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { ChatMessages } from "@/app/api/chat/route";

// Loading Component
export const FinalUILoading = ({ input }: { input?: { message?: string } }) => (
  <div className="p-4 border border-green-200 rounded-lg bg-green-50">
    <div className="flex items-center space-x-2">
      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
      <span className="text-green-800">{"Loading final trip plan..."}</span>
    </div>
  </div>
);

// Error Component
export const FinalUIError = ({
  error,
  input,
}: {
  error: string;
  input?: { message?: string };
}) => (
  <div className="p-4 border border-red-200 rounded-lg bg-red-50">
    <div className="text-red-800">
      <strong>Error generating trip:</strong> {error}
    </div>
    {input?.message && (
      <div className="text-sm text-red-600 mt-1">Context: {input.message}</div>
    )}
  </div>
);

// Success Component (Main Component)
function FinalUI({
  onAction,
  messages,
}: {
  onAction?: (action: {
    action: string;
    data?: Record<string, unknown>;
  }) => void;
  messages: ChatMessages[];
}) {
  const router = useRouter();
  const { tripDetails, setTripDetails } = useTripDetailContext();
  const [isFinalLoading, setIsFinalLoading] = useState(false);

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
      console.log("🚀 ~ FinalUI ~ result:", result);

      setTripDetails(result?.trip_plan);
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

  const handleGenerateTrip = () => {
    if (onAction) {
      onAction({
        action: "generate_final",
        data: { message: "Generate my final trip plan" },
      });
    }
    whenFinal();
  };

  const handleViewTrip = () => {
    console.log("🚀 ~ handleViewTrip ~ tripDetails:", tripDetails);
    if (tripDetails?.id) {
      router.push(`/view/${tripDetails.id}`);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 mt-6 p-8 border border-gray-200 rounded-xl bg-gradient-to-br from-white to-gray-50">
      <div className="flex items-center space-x-3">
        <span className="text-2xl">✈️</span>
        <h2 className="text-xl font-semibold text-primary">
          Planning your dream trip...
        </h2>
      </div>

      <p className="text-sm text-gray-600 text-center max-w-md leading-relaxed">
        We&apos;re creating the perfect itinerary based on your preferences.
        This will just take a moment.
      </p>

      {!tripDetails ? (
        <Button
          className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300 font-medium"
          disabled={isFinalLoading}
          onClick={handleGenerateTrip}
        >
          {isFinalLoading && (
            <div className="flex space-x-2 mt-1">
              <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-white rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-white rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          )}

          {!isFinalLoading && "Generate Trip Plan"}
        </Button>
      ) : (
        <Button
          className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300 font-medium"
          onClick={handleViewTrip}
        >
          View Trip
        </Button>
      )}
    </div>
  );
}

export default FinalUI;
