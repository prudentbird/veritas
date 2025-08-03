import { z } from "zod/v4";

export const authSchema = z.object({
  message: z.string(),
  signature: z.string(),
});

export type AuthData = z.infer<typeof authSchema>;
