import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const authCreateUser = mutation({
  args: {
    address: v.string(),
    chainId: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_address", (q) => q.eq("address", args.address))
      .unique();

    if (existing) {
      return existing;
    }

    const now = Date.now();
    const user = await ctx.db.insert("users", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });

    return await ctx.db.get(user);
  },
});