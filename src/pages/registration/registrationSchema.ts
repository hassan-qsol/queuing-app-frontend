import { z } from "zod";

// Define the Zod schema for the login form
export const registrationSchema = z.object({
  organization: z.string(),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type RegistrationSchema = z.infer<typeof registrationSchema>;
