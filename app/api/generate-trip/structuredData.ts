import { z } from "zod";

export const tripPlanSchema = z.object({
  trip_plan: z.object({
    destination: z.string(),
    duration: z.string(),
    origin: z.string(),
    budget: z.string(),
    group_size: z.string(),
    hotels: z.array(
      z.object({
        hotel_name: z.string(),
        hotel_address: z.string(),
        hotel_per_night: z.string(),
        hotel_image_url: z.string(),
        geo_coordinates: z.object({
          latitude: z.number(),
          longitude: z.number(),
        }),
        rating: z.number(),
        description: z.string(),
      }),
    ),
    itinerary: z.array(
      z.object({
        day: z.number(),
        activities: z.array(
          z.object({
            time_of_day: z.string(),
            place_name: z.string(),
            place_details: z.string(),
            place_image_url: z.string(),
            place_rating: z.number(),
            place_address: z.string(),
            place_description: z.string(),
            ticket_price: z.string(),
            time_travel_each_location: z.string(),
            best_time_to_visit: z.string(),
            place_geo_coordinates: z.object({
              latitude: z.number(),
              longitude: z.number(),
            }),
          }),
        ),
      }),
    ),
  }),
});

export type TripPlan = z.infer<typeof tripPlanSchema>;
