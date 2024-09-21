import { z } from "zod";

export const ServiceSchema = z.object({
	serviceName: z
		.string()
		.min(1, "Service name is required")
		.max(255, "Service name is too long"),
	serviceDescription: z
		.string()
		.min(1, "Service description is required")
		.max(1000, "Service description is too long"),
});

export type ServiceFormData = z.infer<typeof ServiceSchema>;
