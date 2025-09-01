"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export type AccommodationType = {
  id: number;
  title: string;
  desc: string;
  icon: string;
  category: string;
};

export const selectAccommodationList: AccommodationType[] = [
  {
    id: 1,
    title: "Hotel",
    desc: "Traditional hotels with full amenities",
    icon: "🏨",
    category: "hotel",
  },
  {
    id: 2,
    title: "Airbnb",
    desc: "Private homes and apartments",
    icon: "🏠",
    category: "airbnb",
  },
  {
    id: 3,
    title: "Hostel",
    desc: "Budget-friendly shared accommodations",
    icon: "🛏️",
    category: "hostel",
  },
  {
    id: 4,
    title: "Resort",
    desc: "Luxury resorts with all-inclusive options",
    icon: "🏖️",
    category: "resort",
  },
  {
    id: 5,
    title: "Bed & Breakfast",
    desc: "Cozy B&Bs with personal touch",
    icon: "🍳",
    category: "bnb",
  },
  {
    id: 6,
    title: "Friends/Family",
    desc: "Staying with friends or relatives",
    icon: "👨‍👩‍👧‍👦",
    category: "friends",
  },
  {
    id: 7,
    title: "Camping",
    desc: "Outdoor camping and glamping",
    icon: "⛺",
    category: "camping",
  },
  {
    id: 8,
    title: "Vacation Rental",
    desc: "Luxury vacation homes and villas",
    icon: "🏡",
    category: "vacation_rental",
  },
];

// Loading Component
export const AccommodationUILoading = ({
  input,
}: {
  input?: { message?: string };
}) => (
  <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
    <div className="flex items-center space-x-2">
      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
      <span className="text-blue-800">
        {"Loading accommodation options..."}
      </span>
    </div>
  </div>
);

// Error Component
export const AccommodationUIError = ({
  error,
  input,
}: {
  error: string;
  input?: { message?: string };
}) => (
  <div className="p-4 border border-red-200 rounded-lg bg-red-50">
    <div className="text-red-800">
      <strong>Error loading accommodation:</strong> {error}
    </div>
    {input?.message && (
      <div className="text-sm text-red-600 mt-1">Context: {input.message}</div>
    )}
  </div>
);

// Success Component (Main Component)
function AccommodationUI({
  onSelectAccommodation,
}: {
  onSelectAccommodation: (accommodations: AccommodationType[]) => void;
}) {
  const [selectedAccommodations, setSelectedAccommodations] = useState<
    AccommodationType[]
  >([]);

  const handleAccommodationToggle = (accommodation: AccommodationType) => {
    setSelectedAccommodations((prev) => {
      const isSelected = prev.some((item) => item.id === accommodation.id);
      if (isSelected) {
        return prev.filter((item) => item.id !== accommodation.id);
      } else {
        return [...prev, accommodation];
      }
    });
  };

  const handleConfirm = () => {
    if (selectedAccommodations.length > 0) {
      onSelectAccommodation(selectedAccommodations);
    }
  };

  return (
    <div className="flex flex-col space-y-4 mt-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Where would you like to stay?
        </h3>
        <p className="text-sm text-gray-600">
          Select all that apply (you can choose multiple), or write in the chat
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {selectAccommodationList.map((accommodation) => {
          const isSelected = selectedAccommodations.some(
            (item) => item.id === accommodation.id,
          );
          return (
            <div
              onClick={() => handleAccommodationToggle(accommodation)}
              key={accommodation.id}
              className={`group relative p-4 border rounded-xl bg-gradient-to-br transition-all duration-300 cursor-pointer ${
                isSelected
                  ? "border-primary shadow-lg scale-105 bg-gradient-to-br from-primary/10 to-primary/5"
                  : "border-gray-200 from-white to-gray-50 hover:border-primary hover:shadow-lg hover:scale-105"
              }`}
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                  {accommodation.icon}
                </div>
                <h3 className="font-semibold text-gray-800 group-hover:text-primary transition-colors duration-300 text-sm">
                  {accommodation.title}
                </h3>
                <p className="text-xs text-gray-500 leading-tight">
                  {accommodation.desc}
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
          disabled={selectedAccommodations.length === 0}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Confirm{" "}
          {selectedAccommodations.length > 0 &&
            `(${selectedAccommodations.length} selected)`}
        </Button>
      </div>
    </div>
  );
}

export default AccommodationUI;
