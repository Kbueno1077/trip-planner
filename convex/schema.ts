import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    name: v.string(),
    imageUrl: v.string(),
    email: v.string(),
    subscription: v.optional(v.string()),
    credits: v.optional(v.number()),
  }),

  tripDetails: defineTable({
    tripId: v.string(),
    tripDetail: v.any(),
    uid: v.id("users"),
  }),
});
