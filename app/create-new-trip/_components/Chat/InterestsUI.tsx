"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export type InterestType = {
  id: number;
  title: string;
  desc: string;
  icon: string;
  category: string;
};

export const selectInterestsList: InterestType[] = [
  {
    id: 1,
    title: "Culture & History",
    desc: "Museums, historical sites, local traditions",
    icon: "🏛️",
    category: "culture",
  },
  {
    id: 2,
    title: "Nature & Outdoors",
    desc: "Hiking, parks, wildlife, scenic views",
    icon: "🌲",
    category: "nature",
  },
  {
    id: 3,
    title: "Food & Dining",
    desc: "Local cuisine, restaurants, food tours",
    icon: "🍽️",
    category: "food",
  },
  {
    id: 4,
    title: "Adventure & Sports",
    desc: "Water sports, climbing, extreme activities",
    icon: "🏄‍♂️",
    category: "adventure",
  },
  {
    id: 5,
    title: "Shopping & Markets",
    desc: "Local markets, boutiques, souvenirs",
    icon: "🛍️",
    category: "shopping",
  },
  {
    id: 6,
    title: "Nightlife & Entertainment",
    desc: "Bars, clubs, shows, live music",
    icon: "🎭",
    category: "nightlife",
  },
  {
    id: 7,
    title: "Relaxation & Wellness",
    desc: "Spas, beaches, meditation, yoga",
    icon: "🧘‍♀️",
    category: "wellness",
  },
  {
    id: 8,
    title: "Technology & Innovation",
    desc: "Tech museums, startups, modern attractions",
    icon: "🤖",
    category: "technology",
  },
];

// Loading Component
export const InterestsUILoading = ({
  input,
}: {
  input?: { message?: string };
}) => (
  <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
    <div className="flex items-center space-x-2">
      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
      <span className="text-blue-800">{"Loading interest options..."}</span>
    </div>
  </div>
);

// Error Component
export const InterestsUIError = ({
  error,
  input,
}: {
  error: string;
  input?: { message?: string };
}) => (
  <div className="p-4 border border-red-200 rounded-lg bg-red-50">
    <div className="text-red-800">
      <strong>Error loading interests:</strong> {error}
    </div>
    {input?.message && (
      <div className="text-sm text-red-600 mt-1">Context: {input.message}</div>
    )}
  </div>
);

// Success Component (Main Component)
function InterestsUI({
  onSelectInterests,
}: {
  onSelectInterests: (interests: InterestType[]) => void;
}) {
  const [selectedInterests, setSelectedInterests] = useState<InterestType[]>(
    [],
  );

  const handleInterestToggle = (interest: InterestType) => {
    setSelectedInterests((prev) => {
      const isSelected = prev.some((item) => item.id === interest.id);
      if (isSelected) {
        return prev.filter((item) => item.id !== interest.id);
      } else {
        return [...prev, interest];
      }
    });
  };

  const handleConfirm = () => {
    if (selectedInterests.length > 0) {
      onSelectInterests(selectedInterests);
    }
  };

  return (
    <div className="flex flex-col space-y-4 mt-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          What interests you most?
        </h3>
        <p className="text-sm text-gray-600">
          Select all that apply (you can choose multiple), or write in the chat
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {selectInterestsList.map((interest) => {
          const isSelected = selectedInterests.some(
            (item) => item.id === interest.id,
          );
          return (
            <div
              onClick={() => handleInterestToggle(interest)}
              key={interest.id}
              className={`group relative p-4 border rounded-xl bg-gradient-to-br transition-all duration-300 cursor-pointer ${
                isSelected
                  ? "border-primary shadow-lg bg-gradient-to-br from-primary/10 to-primary/5"
                  : "border-gray-200 from-white to-gray-50 hover:border-primary hover:shadow-lg hover:scale-105"
              }`}
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                  {interest.icon}
                </div>
                <h3 className="font-semibold text-gray-800 group-hover:text-primary transition-colors duration-300 text-sm">
                  {interest.title}
                </h3>
                <p className="text-xs text-gray-500 leading-tight">
                  {interest.desc}
                </p>
                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center pt-4">
        <Button
          onClick={handleConfirm}
          disabled={selectedInterests.length === 0}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Confirm{" "}
          {selectedInterests.length > 0 &&
            `(${selectedInterests.length} selected)`}
        </Button>
      </div>
    </div>
  );
}

export default InterestsUI;
