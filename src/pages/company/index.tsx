import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
	Form,
	FormItem,
	FormLabel,
	FormMessage,
	FormField,
	FormDescription,
	FormControl,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
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
import { useEffect, useState } from "react";
import Loader from "@/components/ui/loader";
import {
	errorMessageHandling,
	getCurrentLatitudeLongitude,
} from "@/common/helpers";
import { useCreateCompanyMutation } from "@/api/companyApi";
import { Checkbox } from "@/components/ui/checkbox";

const weekdays = [
	{
		id: "1",
		label: "Monday",
	},
	{
		id: "2",
		label: "Tuesday",
	},
	{
		id: "3",
		label: "Wednesday",
	},
	{
		id: "4",
		label: "Thursday",
	},
	{
		id: "5",
		label: "Friday",
	},
	{
		id: "6",
		label: "Saturday",
	},
	{
		id: "7",
		label: "Sunday",
	},
] as const;

const CompanyForm = () => {
	const { toast } = useToast();
	const [coordinates, setCoordinates] = useState<{
		lat: number;
		lng: number;
	} | null>(null);

	const [isLoading, setIsLoading] = useState(false);

	// API ---
	const [createCompanyMutation, { isLoading: isLoadingCreateCompany }] =
		useCreateCompanyMutation();
	const { currentData: managerOptions, isFetching } = useFindManagersQuery(
		undefined, // No query parameters
		{
			refetchOnMountOrArgChange: true, // Options for the query
		}
	);

	useEffect(() => {
		const fetchCoordinates = async () => {
			try {
				const coords = await getCurrentLatitudeLongitude();
				setCoordinates(coords);
			} catch (error: any) {
				console.error(error.message);
			}
		};

		void fetchCoordinates();
	}, []);

	useEffect(() => {
		if (isLoadingCreateCompany || isFetching) {
			setIsLoading(true);
		} else setIsLoading(false);
	}, [isLoadingCreateCompany, isFetching]);

	const form = useForm<CompanyFormData>({
		resolver: zodResolver(CompanySchema),
		defaultValues: {
			companyName: "",
			weekdays: ["1", "2", "3", "4", "5", "6", "7"],
		},
	});

	const onSubmit = (values: CompanyFormData) => {
		const payload = {
			...values,
			companyManager: Number(values.companyManager),
			lat: coordinates?.lat || 0,
			lng: coordinates?.lng || 0,
		};

		createCompanyMutation(payload)
			.unwrap()
			.then((resp) => {
				toast({
					title: "Success",
					description: resp.response,
				});
			})
			.catch((e: any) => {
				toast({
					variant: "destructive",
					title: "Operation Failed",
					description: errorMessageHandling(e),
				});
			});
	};

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div className="space-y-4 p-6 bg-white rounded shadow-md">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<h2 className="text-lg font-semibold mb-4">Add Company</h2>

							<Card className="w-full max-w-sm mx-auto shadow-lg border border-gray-200 rounded-lg">
								<CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white rounded-t-lg">
									<CardTitle className="text-xl font-semibold">
										Current Geolocation
									</CardTitle>
								</CardHeader>
								<CardContent className="p-6">
									<div className="text-lg mb-4">
										<p>
											<strong>Latitude:</strong> {coordinates?.lat}
										</p>
										<p>
											<strong>Longitude:</strong> {coordinates?.lng}
										</p>
									</div>
								</CardContent>
							</Card>

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
													{managerOptions?.response?.map((manager) => (
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
							<FormField
								control={form.control}
								name="weekdays"
								render={() => (
									<FormItem>
										<div className="mb-4 mt-5">
											<FormLabel className="text-base">Weekdays</FormLabel>
											<FormDescription>
												Select weekdays on which company will operate.
											</FormDescription>
										</div>
										{/* Container to hold weekdays in a row */}
										<div className="flex flex-wrap gap-4">
											{weekdays.map((day) => (
												<FormField
													key={day.id}
													control={form.control}
													name="weekdays"
													render={({ field }) => {
														return (
															<FormItem
																key={day.id}
																className="flex flex-row items-center space-x-2 border rounded bg-blue-500 p-2"
															>
																<FormControl>
																	<Checkbox
																		checked={field.value?.includes(day.id)}
																		className="mt-0"
																		onCheckedChange={(checked) => {
																			return checked
																				? field.onChange([
																						...field.value,
																						day.id,
																					])
																				: field.onChange(
																						field.value?.filter(
																							(value) => value !== day.id
																						)
																					);
																		}}
																	/>
																</FormControl>
																<FormLabel className="text-sm text-white">
																	{day.label}
																</FormLabel>
															</FormItem>
														);
													}}
												/>
											))}
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Submit Button */}
							<Button
								className="mt-5 w-max bg-blue-500 text-white"
								type="submit"
							>
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
