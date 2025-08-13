import { mutation } from "./_generated/server";
import type { Doc } from "./_generated/dataModel";
import { createTripDetailsArgs } from "./validators";

export const createNewTripDetails = mutation({
  args: createTripDetailsArgs,

  handler: async (ctx, args): Promise<Doc<"tripDetails">> => {
    const tripDetailsId = await ctx.db.insert("tripDetails", args);
    const tripDetails = await ctx.db.get(tripDetailsId);

    return tripDetails!;
  },
});
