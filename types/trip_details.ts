interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

interface Hotel {
  hotel_name: string;
  hotel_address: string;
  description: string;
  geo_coordinates: GeoCoordinates;
  hotel_image_url: string;
  hotel_per_night: string;
  rating: number;
}

interface ItineraryItem {
  day: number;
  place_name: string;
  best_time_to_visit: string;
  place_address: string;
  place_description: string;
  place_details: string;
  place_geo_coordinates: GeoCoordinates;
  place_image_url: string;
  place_rating: number;
  ticket_price: string;
  time_travel_each_location: string;
}

interface TripPlan {
  destination: string;
  duration: string;
  origin: string;
  budget: "Low" | "Medium" | "High" | string; // You can make this more specific if needed
  group_size: string;
  hotels: Hotel[];
  itinerary: ItineraryItem[];
}

// If you need the top-level structure
interface TripPlanResponse {
  trip_plan: TripPlan;
}

export type {
  TripPlan,
  TripPlanResponse,
  Hotel,
  ItineraryItem,
  GeoCoordinates,
};
