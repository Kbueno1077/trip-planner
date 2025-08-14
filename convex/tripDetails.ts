import { mutation, query } from "./_generated/server";
import type { Doc } from "./_generated/dataModel";
import { createTripDetailsArgs } from "./validators";
import { v } from "convex/values";

export const createNewTripDetails = mutation({
  args: createTripDetailsArgs,

  handler: async (ctx, args): Promise<Doc<"tripDetails">> => {
    const tripDetailsId = await ctx.db.insert("tripDetails", args);
    const tripDetails = await ctx.db.get(tripDetailsId);

    return tripDetails!;
  },
});

export const getUserTrips = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args): Promise<Doc<"tripDetails">[]> => {
    const tripDetails = await ctx.db
      .query("tripDetails")
      .filter((q) => q.eq(q.field("uid"), args.userId))
      .order("desc")
      .collect();

    return tripDetails;
  },
});

export const getTripById = query({
  args: {
    userId: v.id("users"),
    tripId: v.id("tripDetails"),
  },
  handler: async (ctx, args): Promise<Doc<"tripDetails">[]> => {
    const tripDetails = await ctx.db
      .query("tripDetails")
      .filter((q) =>
        q.and(
          q.eq(q.field("uid"), args.userId),
          q.eq(q.field("_id"), args.tripId),
        ),
      )
      .collect();

    return tripDetails;
  },
});
