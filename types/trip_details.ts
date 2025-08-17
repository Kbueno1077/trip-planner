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

interface Activity {
  time_of_day: string;
  place_name: string;
  place_details: string;
  place_image_url: string;
  place_rating: number;
  place_address: string;
  place_description: string;
  ticket_price: string;
  time_travel_each_location: string;
  best_time_to_visit: string;
  place_geo_coordinates: GeoCoordinates;
}

interface ItineraryItem {
  day: number;
  activities: Activity[];
}

interface TripPlan {
  id?: string;
  destination: string;
  duration: string;
  origin: string;
  budget: "Low" | "Medium" | "High" | string;
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
  Activity,
  GeoCoordinates,
};
