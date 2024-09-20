import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
	Form,
	FormItem,
	FormControl,
	FormLabel,
	FormMessage,
	FormField,
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
import { useEffect, useMemo, useState } from "react";
import Loader from "@/components/ui/loader";
import {
	errorMessageHandling,
	getCurrentLatitudeLongitude,
} from "@/common/helpers";
import { useCreateCompanyMutation } from "@/api/companyApi";

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
	const { currentData: findManagersData, isFetching } = useFindManagersQuery(
		undefined, // No query parameters
		{
			refetchOnMountOrArgChange: true, // Options for the query
		}
	);
	const managerOptions = useMemo(() => {
		return findManagersData?.response?.length ? findManagersData.response : [];
	}, [findManagersData?.response]);

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
		},
	});

	const onSubmit = async (values: CompanyFormData) => {
		const payload = {
			...values,
			companyManager: Number(values.companyManager),
			lat: coordinates?.lat || 0,
			lng: coordinates?.lng || 0,
		};

		await createCompanyMutation(payload)
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
