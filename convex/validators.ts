import { v } from "convex/values";
import type { Infer } from "convex/values";

export const createUserArgs = v.object({
  clerkId: v.string(),
  name: v.string(),
  imageUrl: v.string(),
  email: v.string(),
  subscription: v.optional(v.string()),
  credits: v.optional(v.number()),
});

export const createTripDetailsArgs = v.object({
  tripId: v.string(),
  tripDetail: v.any(),
  uid: v.id("users"),
});

export type CreateUserArgs = Infer<typeof createUserArgs>;
export type CreateTripDetailsArgs = Infer<typeof createTripDetailsArgs>;
