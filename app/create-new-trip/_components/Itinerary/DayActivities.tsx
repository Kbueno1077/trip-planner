import type { Activity } from "@/types/trip_details";
import { ActivityCard } from "./ActivityCard";

interface DayActivitiesProps {
  activities: Activity[];
}

export function DayActivities({ activities }: DayActivitiesProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {activities.map((activity, index) => (
        <ActivityCard key={index} activity={activity} />
      ))}
    </div>
  );
}
