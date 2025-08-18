import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema(
  {
    users: defineTable({
      address: v.string(),
      chainId: v.string(),
      createdAt: v.number(),
      updatedAt: v.number(),
    }).index("by_address", ["address"]),
  },
  {
    schemaValidation: true,
    strictTableNameTypes: true,
  },
);
