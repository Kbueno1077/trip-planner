import { mockResult } from "@/data/mockResult";
import { Timeline } from "@/components/ui/timeline";
import { HotelsSection } from "./HotelsSection";
import { DayActivities } from "./DayActivities";

export function Itinerary() {
  const data = [
    {
      title: "Recommended Hotels",
      content: <HotelsSection hotels={mockResult.hotels} />,
    },

    ...mockResult.itinerary.map((dayData) => {
      return {
        title: `Day ${dayData.day}`,
        content: <DayActivities activities={dayData.activities} />,
      };
    }),
  ];

  return (
    <div className="relative w-full h-[85dvh] overflow-auto px-5 pt-10">
      <Timeline data={data} tripDetails={mockResult} />
    </div>
  );
}
