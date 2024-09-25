import { z } from "zod";

// Define the Zod schema for the login form
export const collectorSchema = z.object({
	cnic: z.string().length(13, "CNIC must be exactly 13 characters long"),
});

export type CollectorSchema = z.infer<typeof collectorSchema>;
