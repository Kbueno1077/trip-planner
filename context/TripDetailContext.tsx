"use client";

import { TripPlan } from "@/types/trip_details";
import { createContext, useContext } from "react";

type TripDetailContextType = {
  tripDetails: TripPlan | null;
  setTripDetails: (tripDetails: TripPlan | null) => void;
};

export const TripDetailContext = createContext<TripDetailContextType | null>(
  null,
);

export const useTripDetailContext = () => {
  const context = useContext(TripDetailContext);
  if (!context) {
    throw new Error(
      "useTripDetailContext must be used within a TripDetailContextProvider",
    );
  }
  return context;
};
