"use client";

import { Button } from "@/components/ui/button";
import { TripPlan } from "@/types/trip_details";

function FinalUI({
  isFinalLoading,
  tripDetails,
}: {
  isFinalLoading: boolean;
  tripDetails: TripPlan | null;
}) {
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

      <Button
        className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300 font-medium"
        disabled={isFinalLoading}
        onClick={() => {
          // Handle view trip action
          console.log("View trip clicked");
        }}
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

        {!isFinalLoading && tripDetails && "View Trip"}
      </Button>
    </div>
  );
}

export default FinalUI;
