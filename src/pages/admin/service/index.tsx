import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/loader";
import { useFindServicesQuery } from "@/api/serviceApi";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { useAppSelector } from "@/redux/hook";
import type { RootState } from "@/redux/store";
import { EUserType } from "@/common/types";

const ServicesList = () => {
	const { companyId } = useParams();
	const { value: loginValue } = useAppSelector(
		(state: RootState) => state.login
	);
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false);

	// API ---
	const { currentData: findServicesData, isFetching } = useFindServicesQuery(
		{
			companyId: Number(companyId),
		},
		{
			refetchOnMountOrArgChange: true, // Options for the query
		}
	);

	useEffect(() => {
		if (isFetching) {
			setIsLoading(true);
		} else setIsLoading(false);
	}, [isFetching]);

	const handleNavigate = (serviceId: number) => {
		if (loginValue.userType === EUserType.ADMIN)
			navigate(`/admin/company/${companyId}/services/${serviceId}`);
		else navigate(`/company/${companyId}/services/${serviceId}`);
	};

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
									handleNavigate(service.id);
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

export default ServicesList;
