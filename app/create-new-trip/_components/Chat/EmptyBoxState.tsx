import { Button } from "@/components/ui/button";
import { Globe2 } from "lucide-react";
import React from "react";

export const suggestions = [
  {
    title: "Create a new trip",
    icon: <Globe2 className="w-5 h-5 text-blue-400 group-hover:text-white" />,
  },
  {
    title: "Inspire me where to go",
    icon: <Globe2 className="w-5 h-5 text-green-500 group-hover:text-white" />,
  },
  {
    title: "Discover Hidden gems",
    icon: <Globe2 className="w-5 h-5 text-orange-500 group-hover:text-white" />,
  },
  {
    title: "Adventure destination",
    icon: <Globe2 className="w-5 h-5 text-yellow-600 group-hover:text-white" />,
  },
];

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
