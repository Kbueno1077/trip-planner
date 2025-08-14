"use client";

import { Star, MapPin, Clock, Train, Loader2 } from "lucide-react";
import type { Activity } from "@/types/trip_details";
import axios from "axios";
import { useEffect, useState } from "react";

interface ActivityCardProps {
  activity: Activity;
}

export function ActivityCard({ activity }: ActivityCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  const getGooglePlaceDetails = async () => {
    setIsLoading(true);
    const response = await axios.post("/api/google-place-details", {
      placeName: activity.place_name,
    });
    setPhotoUrl(response.data.photo);
    setIsLoading(false);
  };

  useEffect(() => {
    getGooglePlaceDetails();
  }, []);

  return (
    <div className="bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Image Section */}
      <div className="w-full h-32 overflow-hidden">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
        ) : (
          <img
            src={photoUrl ?? ""}
            alt={activity.place_name}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <h4 className="text-md font-semibold text-gray-900 flex-1 truncate">
            {activity.place_name}
          </h4>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex-shrink-0">
            {activity.time_of_day}
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {activity.place_details}
        </p>

        <a
          href={`https://www.google.com/maps?q=${activity.place_name},${activity.place_address}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-600 hover:text-blue-800 mb-2 line-clamp-1 flex items-center gap-1 transition-colors"
        >
          <MapPin className="w-3 h-3" />
          {activity.place_address}
        </a>

        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
          {activity.place_description}
        </p>

        <div className="flex items-center justify-between mb-2">
          <span className="text-md font-medium text-gray-900">
            {activity.ticket_price}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">
              {activity.place_rating}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Train className="w-3 h-3" />
            {activity.time_travel_each_location}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Best: {activity.best_time_to_visit}
          </span>
        </div>
      </div>
    </div>
  );
}
