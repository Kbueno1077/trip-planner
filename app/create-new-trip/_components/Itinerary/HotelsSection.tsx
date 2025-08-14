import type { Hotel } from "@/types/trip_details";
import { HotelCard } from "./HotelCard";

interface HotelsSectionProps {
  hotels: Hotel[];
}

export function HotelsSection({ hotels }: HotelsSectionProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {hotels.map((hotel, index) => (
        <HotelCard key={hotel.hotel_name} hotel={hotel} />
      ))}
    </div>
  );
}
