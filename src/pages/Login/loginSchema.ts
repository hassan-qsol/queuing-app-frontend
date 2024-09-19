import { z } from "zod";

// Define the Zod schema for the login form
export const loginSchema = z.object({
  userName: z.string(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
