import { z } from "zod";

export const CompanySchema = z.object({
	companyName: z
		.string()
		.min(1, "Company name is required")
		.max(255, "Company name is too long"),
	companyManager: z.string().min(1, "Manager is required"), // Remains string for dropdown
	lat: z
		.number()
		.min(-90, "Latitude must be between -90 and 90")
		.max(90, "Latitude must be between -90 and 90"),
	lng: z
		.number()
		.min(-180, "Longitude must be between -180 and 180")
		.max(180, "Longitude must be between -180 and 180"),
});

export type CompanyFormData = z.infer<typeof CompanySchema>;