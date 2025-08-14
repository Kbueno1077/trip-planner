import { suggestions } from "@/app/_components/Hero";
import { Button } from "@/components/ui/button";
import React from "react";

function EmptyBoxState({
  onSelectOption,
}: {
  onSelectOption: (option: string) => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-3xl font-bold text-center">
        Start planning new <strong className="text-primary">trip</strong> using
        AI
      </h2>
      <p className="mt-2 text-lg text-center">
        Discover personalized trip recommendations
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-5 mt-6">
        {suggestions.map((suggestion) => (
          <Button
            variant="outline"
            key={suggestion.title}
            onClick={() => {
              onSelectOption(suggestion.title);
            }}
            className="group w-full flex justify-start rounded-full border py-6 px-4 cursor-pointer hover:bg-primary hover:text-white transition-all duration-300"
          >
            <div className="flex items-center gap-2">
              {suggestion.icon}
              <h2 className="text-xs sm:text-sm font-bold">
                {suggestion.title}
              </h2>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}

export default EmptyBoxState;
