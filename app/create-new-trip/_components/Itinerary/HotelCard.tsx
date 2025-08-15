"use client";

import { Loader2, MapPin, Star } from "lucide-react";
import type { Hotel } from "@/types/trip_details";
import axios from "axios";
import { useEffect, useState } from "react";

interface HotelCardProps {
  hotel: Hotel;
}

export function HotelCard({ hotel }: HotelCardProps) {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getGooglePlaceDetails = async () => {
    setIsLoading(true);
    const response = await axios.post("/api/google-place-details", {
      placeName: hotel.hotel_name,
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
      <div className="w-full h-40 overflow-hidden bg-muted">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
        ) : photoUrl ? (
          <img
            src={photoUrl}
            alt={hotel.hotel_name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <MapPin className="w-8 h-8" />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {hotel.hotel_name}
        </h3>

        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
          {hotel.hotel_address}
        </p>

        <a
          href={`https://www.google.com/maps?q=${hotel.hotel_name},${hotel.hotel_address}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-600 hover:text-blue-800 mb-2 line-clamp-1 flex items-center gap-1 transition-colors"
        >
          <MapPin className="w-3 h-3" />
          {hotel.hotel_address}
        </a>

        <div className="flex items-center justify-between">
          <span className="text-lg font-medium text-gray-900">
            {hotel.hotel_per_night}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">{hotel.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
