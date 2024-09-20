import { useFindCompaniesQuery } from "@/api/companyApi";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/loader";

const CompaniesList = () => {
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

	return <>{isLoading ? <Loader /> : <>s</>}</>;
};

export default CompaniesList;
