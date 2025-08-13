import { mutation } from "./_generated/server";
import type { Doc } from "./_generated/dataModel";
import { createUserArgs } from "./validators";

export const createNewUser = mutation({
  args: createUserArgs,

  handler: async (ctx, args): Promise<Doc<"users">> => {
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (existingUser) {
      return existingUser;
    }

    const userId = await ctx.db.insert("users", args);
    const userDoc = await ctx.db.get(userId);
    // Invariant: inserted doc should exist
    if (!userDoc) {
      throw new Error("Failed to load inserted user document");
    }
    return userDoc;
  },
});
