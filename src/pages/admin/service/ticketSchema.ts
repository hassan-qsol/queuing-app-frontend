import { z } from "zod";

export const TicketSchema = z.object({
	collectorName: z
		.string()
		.min(1, "Service name is required")
		.max(255, "Service name is too long"),
});

export type TicketFormData = z.infer<typeof TicketSchema>;
