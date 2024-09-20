import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input"; // assuming shadcn components
import { Button } from "@/components/ui/button";
import {
	Form,
	FormItem,
	FormControl,
	FormLabel,
	FormMessage,
	FormField,
} from "@/components/ui/form";
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils"; // assuming you have a utility for Tailwind CSS
import { type CompanyFormData, CompanySchema } from "./companySchema";
import { useFindManagersQuery } from "@/api/userApi";
import { useMemo } from "react";
import Loader from "@/components/ui/loader";

const CompanyForm = () => {
	// API ---
	const { currentData: findManagersData, isFetching } = useFindManagersQuery(
		undefined, // No query parameters
		{
			refetchOnMountOrArgChange: true, // Options for the query
		}
	);
	const managerOptions = useMemo(() => {
		return findManagersData?.response?.length ? findManagersData.response : [];
	}, [findManagersData?.response]);

	const form = useForm<CompanyFormData>({
		resolver: zodResolver(CompanySchema),
		defaultValues: {
			companyName: "",
			lat: 0.0,
			lng: 0.0,
		},
	});

	const onSubmit = (values: CompanyFormData) => {
		const payload = {
			...values,
			companyManager: Number(values.companyManager),
		};
		console.log(payload);
		// Handle form submission, e.g., send data to an API
	};

	return (
		<>
			{isFetching ? (
				<Loader />
			) : (
				<div className="space-y-4 p-6 bg-white rounded shadow-md">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<h2 className="text-lg font-semibold mb-4">Add Company</h2>

							{/* Company Name */}
							<FormField
								control={form.control}
								name="companyName"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="companyName">Company Name</FormLabel>
										<FormControl>
											<Input
												id="companyName"
												{...field}
												className={cn(
													form.formState.errors.companyName && "border-red-500"
												)}
											/>
										</FormControl>
										{form.formState.errors.companyName && (
											<FormMessage>
												{form.formState.errors.companyName?.message}
											</FormMessage>
										)}
									</FormItem>
								)}
							/>

							{/* Company Manager Dropdown */}
							<FormField
								control={form.control}
								name="companyManager"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="companyManager">
											Company Manager
										</FormLabel>
										<FormControl>
											<Select
												defaultValue=""
												value={field.value} // set the value from form state
												onValueChange={field.onChange} // handle change
											>
												<SelectTrigger>
													<SelectValue placeholder="Select a manager" />
												</SelectTrigger>
												<SelectContent>
													{managerOptions.map((manager) => (
														<SelectItem key={manager.id} value={manager.id}>
															{manager.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormControl>
										{form.formState.errors.companyManager && (
											<FormMessage>
												{form.formState.errors.companyManager?.message}
											</FormMessage>
										)}
									</FormItem>
								)}
							/>

							{/* Latitude */}
							<FormField
								control={form.control}
								name="lat"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="lat">Latitude</FormLabel>
										<FormControl>
											<Input
												id="lat"
												step="any"
												type="number"
												{...field}
												className={cn(
													form.formState.errors.lat && "border-red-500"
												)}
												onChange={(e) => {
													field.onChange(parseFloat(e.target.value));
												}} // convert string to number
											/>
										</FormControl>
										{form.formState.errors.lat && (
											<FormMessage>
												{form.formState.errors.lat?.message}
											</FormMessage>
										)}
									</FormItem>
								)}
							/>

							{/* Longitude */}
							<FormField
								control={form.control}
								name="lng"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="lng">Longitude</FormLabel>
										<FormControl>
											<Input
												id="lng"
												step="any"
												type="number"
												{...field}
												className={cn(
													form.formState.errors.lng && "border-red-500"
												)}
												onChange={(e) => {
													field.onChange(parseFloat(e.target.value));
												}} // convert string to number
											/>
										</FormControl>
										{form.formState.errors.lng && (
											<FormMessage>
												{form.formState.errors.lng?.message}
											</FormMessage>
										)}
									</FormItem>
								)}
							/>

							{/* Submit Button */}
							<Button className="w-full bg-blue-500 text-white" type="submit">
								Add Company
							</Button>
						</form>
					</Form>
				</div>
			)}
		</>
	);
};

export default CompanyForm;
