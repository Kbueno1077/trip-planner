"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

function TripDurationUI({
  onSelectDuration,
}: {
  onSelectDuration: (days: number) => void;
}) {
  const [days, setDays] = useState(1);

  const handleIncrement = () => {
    setDays((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (days > 1) {
      setDays((prev) => prev - 1);
    }
  };

  const handleConfirm = () => {
    onSelectDuration(days);
  };

  return (
    <div className="flex flex-col items-center space-y-4 mt-4 p-6 border border-gray-200 rounded-xl bg-gradient-to-br from-white to-gray-50">
      <h3 className="text-lg font-semibold text-gray-800 text-center">
        How many days do you want to travel?
      </h3>

      <div className="flex items-center space-x-4">
        <Button
          onClick={handleDecrement}
          disabled={days <= 1}
          className="w-10 h-10 cursor-pointer rounded-full border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-xl font-semibold text-gray-600 hover:text-primary transition-colors duration-300"
        >
          -
        </Button>

        <div className="text-3xl font-bold text-primary min-w-[60px] text-center">
          {days}
        </div>

        <Button
          onClick={handleIncrement}
          className="w-10 h-10 cursor-pointer rounded-full border border-gray-300 bg-white hover:bg-gray-50 flex items-center justify-center text-xl font-semibold text-gray-600 hover:text-primary transition-colors duration-300"
        >
          +
        </Button>
      </div>

      <button
        onClick={handleConfirm}
        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300 font-medium"
      >
        Confirm
      </button>
    </div>
  );
}

export default TripDurationUI;
