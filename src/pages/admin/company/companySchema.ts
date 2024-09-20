import { z } from "zod";

export const CompanySchema = z.object({
	companyName: z
		.string()
		.min(1, "Company name is required")
		.max(255, "Company name is too long"),
	companyManager: z.string().min(1, "Manager is required"), // Remains string for dropdown
});

export type CompanyFormData = z.infer<typeof CompanySchema>;