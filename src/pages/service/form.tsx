import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormItem,
	FormLabel,
	FormMessage,
	FormField,
	FormControl,
} from "@/components/ui/form";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils"; // assuming you have a utility for Tailwind CSS
import { type ServiceFormData, ServiceSchema } from "./serviceSchema";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/loader";
import { errorMessageHandling } from "@/common/helpers";
import { useCreateServiceMutation } from "@/api/serviceApi";

const ServicesForm = () => {
	const { toast } = useToast();
	const { companyId } = useParams();

	const [isLoading, setIsLoading] = useState(false);

	// API ---
	const [createServiceMutation, { isLoading: isLoadingCreateService }] =
		useCreateServiceMutation();

	useEffect(() => {
		if (isLoadingCreateService) {
			setIsLoading(true);
		} else setIsLoading(false);
	}, [isLoadingCreateService]);

	const form = useForm<ServiceFormData>({
		resolver: zodResolver(ServiceSchema),
		defaultValues: {
			serviceName: "",
			serviceDescription: "",
		},
	});

	const onSubmit = (values: ServiceFormData) => {
		createServiceMutation({ ...values, companyId: Number(companyId) })
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
							<h2 className="text-lg font-semibold mb-4">Add Service</h2>

							{/* Company Name */}
							<FormField
								control={form.control}
								name="serviceName"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="serviceName">Service Name</FormLabel>
										<FormControl>
											<Input
												id="serviceName"
												{...field}
												className={cn(
													form.formState.errors.serviceName && "border-red-500"
												)}
											/>
										</FormControl>
										{form.formState.errors.serviceName && (
											<FormMessage>
												{form.formState.errors.serviceName?.message}
											</FormMessage>
										)}
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="serviceDescription"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="serviceDescription">
											Service Description
										</FormLabel>
										<FormControl>
											<Input
												id="serviceDescription"
												{...field}
												className={cn(
													form.formState.errors.serviceDescription &&
														"border-red-500"
												)}
											/>
										</FormControl>
										{form.formState.errors.serviceDescription && (
											<FormMessage>
												{form.formState.errors.serviceDescription?.message}
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
								Add Service
							</Button>
						</form>
					</Form>
				</div>
			)}
		</>
	);
};

export default ServicesForm;
