import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/loader";
import { useFindManagerServicesQuery } from "@/api/serviceApi";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";


const Manager = () => {
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false);

	// API ---
	const { currentData: findServicesData, isFetching } =
		useFindManagerServicesQuery(undefined, {
			refetchOnMountOrArgChange: true, // Options for the query
		});

	useEffect(() => {
		if (isFetching) {
			setIsLoading(true);
		} else setIsLoading(false);
	}, [isFetching]);

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div className="space-y-4 p-6 bg-white rounded ">
					<div className="flex flex-wrap gap-4 justify-start">
						{findServicesData?.response?.map((service) => (
							<Card
								key={service.id}
								className="w-64"
								onClick={() => {
									navigate(
										`/manager/company/${service.companyId}/services/${service.id}`
									);
								}}
							>
								<CardHeader>
									<CardTitle>Service Name</CardTitle>
									<CardDescription>
										{service.name.toUpperCase()}
									</CardDescription>
								</CardHeader>
								<CardContent className="flex flex-col gap-2">
									<CardTitle>Service Description</CardTitle>
									<CardDescription>{service.description}</CardDescription>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default Manager;
