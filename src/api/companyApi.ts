import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/redux/store";
import type {
	ICreateCompanyRequest,
	ICreateCompanyResponse,
	IFindCompaniesResponse,
} from "@/common/types";

const { VITE_API_URL } = import.meta.env;

export const Company = createApi({
	reducerPath: "api/company",
	baseQuery: fetchBaseQuery({
		baseUrl: VITE_API_URL + "/company",
		prepareHeaders: (headers, { getState }) => {
			const token: string = (getState() as RootState).login.value.accessToken;
			if (token) headers.set("Authorization", `Bearer ${token}`);
			return headers;
		},
	}),
	tagTypes: ["company"],
	endpoints(builder) {
		return {
			// Login mutation
			createCompany: builder.mutation<
				ICreateCompanyResponse,
				ICreateCompanyRequest
			>({
				query: (payload) => ({
					url: "/",
					method: "POST",
					body: payload,
				}),
			}),
			findCompanies: builder.query<IFindCompaniesResponse, void>({
				query: () => `/`,
			}),
		};
	},
});

export const { useCreateCompanyMutation, useFindCompaniesQuery } = Company;
