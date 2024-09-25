import { useFindCompaniesQuery } from "@/api/companyApi";
import { useAppSelector } from "@/redux/hook";
import type { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/loader";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { EUserType } from "@/common/types";
import { Button } from "@/components/ui/button";

const CompaniesList = () => {
	const { value: loginValue } = useAppSelector(
		(state: RootState) => state.login
	);

	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	// API ---
	const { currentData: findCompaniesData, isFetching } = useFindCompaniesQuery(
		undefined, // No query parameters
		{
			refetchOnMountOrArgChange: true, // Options for the query
		}
	);
	useEffect(() => {
		if (isFetching) {
			setIsLoading(true);
		} else setIsLoading(false);
	}, [isFetching]);

	const handleNavigate = (companyId: number) => {
		if (loginValue.userType === EUserType.ADMIN)
			navigate(`/admin/company/${companyId}/services`);
		else if (loginValue.userType === EUserType.MANAGER)
			navigate(`/manager/company/${companyId}/services`);
		else navigate(`/company/${companyId}/services`);
	};

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div className="flex flex-wrap gap-4 justify-start">
					{findCompaniesData?.response?.map((company) => (
						<Card key={company.id} className="w-max p-2">
							<CardHeader>
								<CardTitle>Company Name</CardTitle>
								<CardDescription>{company.companyName}</CardDescription>
							</CardHeader>
							<CardContent className="flex flex-col gap-2">
								<CardTitle>Operational Days</CardTitle>
								{company.operating_days.map((data) => (
									<CardDescription key={data.weekday_id}>
										{data.weekday.day_name}
									</CardDescription>
								))}
							</CardContent>
							<div className="flex justify-evenly capitalize m-x-5 gap-2">
								<Button
									className={`flex items-center justify-center`}
									onClick={() => {
										handleNavigate(company.id);
									}}
								>
									view services
								</Button>
								{loginValue.userType !== EUserType.CUSTOMER && (
									<Button
										className={`flex items-center justify-center `}
										onClick={() => {
											navigate(`/admin/company/${company.id}/services/add`);
										}}
									>
										add service
									</Button>
								)}
							</div>
						</Card>
					))}
				</div>
			)}
		</>
	);
};

export default CompaniesList;
