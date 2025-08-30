"use client";

import { Loader2, MapPin, Star, Bed, ExternalLink } from "lucide-react";
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
    <div className="group bg-white border max-w-[300px] min-w-[260px] border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-[400px] flex flex-col">
      <div className="relative w-full h-48 overflow-hidden">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        ) : photoUrl ? (
          <img
            src={photoUrl}
            alt={hotel.hotel_name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <Bed className="w-12 h-12 text-gray-400" />
          </div>
        )}

        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="text-sm font-medium text-gray-700">
            {hotel.rating}
          </span>
        </div>

        <div className="absolute top-3 left-3 bg-emerald-500 text-white text-xs font-medium px-3 py-1 rounded-full">
          Hotel
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1 pr-3">
            {hotel.hotel_name}
          </h3>
          <div className="text-right">
            <span className="text-lg font-bold text-emerald-600">
              {hotel.hotel_per_night}
            </span>
            <p className="text-xs text-gray-500">per night</p>
          </div>
        </div>

        <div className="flex items-start gap-2 mb-4">
          <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-600 line-clamp-2">
            {hotel.hotel_address}
          </p>
        </div>

        <a
          href={`https://www.google.com/maps?q=${hotel.hotel_name},${hotel.hotel_address}`}
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
