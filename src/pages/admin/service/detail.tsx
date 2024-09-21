import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValue,
} from "@/components/ui/select";
import {
	Form,
	FormItem,
	FormLabel,
	FormMessage,
	FormField,
	FormControl,
} from "@/components/ui/form";
import { type TicketFormData, TicketSchema } from "./ticketSchema";
import { useEffect, useState, useMemo } from "react";
import Loader from "@/components/ui/loader";
import { useFindCollectorsQuery } from "@/api/userApi";
import { Button } from "@/components/ui/button";

const ServicesForm = () => {
	const [isLoading, setIsLoading] = useState(false);

	// API ---
	const { currentData: findCollectorsData, isFetching } =
		useFindCollectorsQuery(
			undefined, // No query parameters
			{
				refetchOnMountOrArgChange: true, // Options for the query
			}
		);
	const collectors = useMemo(() => {
		return findCollectorsData?.response?.length
			? findCollectorsData.response
			: [];
	}, [findCollectorsData?.response]);

	useEffect(() => {
		if (isFetching) {
			setIsLoading(true);
		} else setIsLoading(false);
	}, [isFetching]);

	const form = useForm<TicketFormData>({
		resolver: zodResolver(TicketSchema),
		defaultValues: {
			collectorName: "",
		},
	});

	const onSubmit = (values: TicketFormData) => {
		console.log(values);
	};

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div className="space-y-4 p-6 bg-white rounded shadow-md">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<Card className="w-80 mb-5">
								<CardHeader>
									<CardTitle className="text-center">Ticket Number</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-center text-2xl font-semibold">12345</p>
								</CardContent>
								<CardFooter className="flex justify-center">
									<Button>Get Ticket</Button>
								</CardFooter>
							</Card>
							{/* Company Name */}
							<FormField
								control={form.control}
								name="collectorName"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="collectorName">Collector</FormLabel>
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
													{collectors.map((manager) => (
														<SelectItem key={manager.id} value={manager.id}>
															{manager.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormControl>
										{form.formState.errors.collectorName && (
											<FormMessage>
												{form.formState.errors.collectorName?.message}
											</FormMessage>
										)}
									</FormItem>
								)}
							/>
						</form>
					</Form>
				</div>
			)}
		</>
	);
};

export default ServicesForm;
