"use client";

import {
  Star,
  MapPin,
  Clock,
  Train,
  Loader2,
  Map,
  ExternalLink,
} from "lucide-react";
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
    <div className="group bg-white border max-w-[300px] min-w-[260px] border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-[400px] flex flex-col">
      <div className="relative w-full h-48 overflow-hidden">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        ) : photoUrl ? (
          <img
            src={photoUrl}
            alt={activity.place_name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <Map className="w-12 h-12 text-gray-400" />
          </div>
        )}

        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="text-sm font-medium text-gray-700">
            {activity.place_rating}
          </span>
        </div>

        <div className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-full">
          {activity.time_of_day}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1 pr-3">
            {activity.place_name}
          </h3>
          <div className="text-right">
            <span className="text-lg font-bold text-blue-600">
              {activity.ticket_price}
            </span>
            <p className="text-xs text-gray-500">per person</p>
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {activity.place_details}
        </p>

        <div className="flex items-start gap-2 mb-4">
          <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-600 line-clamp-2">
            {activity.place_address}
          </p>
        </div>

        <div className="flex items-center justify-between mb-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Train className="w-3 h-3" />
            {activity.time_travel_each_location}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Best: {activity.best_time_to_visit}
          </span>
        </div>

        <a
          href={`https://www.google.com/maps?q=${activity.place_name},${activity.place_address}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-gray-900 text-white text-sm font-medium py-2.5 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center gap-2 mt-auto"
        >
          <MapPin className="w-4 h-4" />
          View on Maps
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
