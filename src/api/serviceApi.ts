import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/redux/store";
import type {
	ICreateServiceRequest,
	ICreateServiceResponse,
	IFindServicesRequest,
	IFindServicesResponse,
} from "@/common/types";

const { VITE_API_URL } = import.meta.env;

export const Service = createApi({
	reducerPath: "api/services",
	baseQuery: fetchBaseQuery({
		baseUrl: VITE_API_URL + "/services",
		prepareHeaders: (headers, { getState }) => {
			const token: string = (getState() as RootState).login.value.accessToken;
			if (token) headers.set("Authorization", `Bearer ${token}`);
			return headers;
		},
	}),
	tagTypes: ["services"],
	endpoints(builder) {
		return {
			// Login mutation
			createService: builder.mutation<
				ICreateServiceResponse,
				ICreateServiceRequest
			>({
				query: (payload) => ({
					url: "/",
					method: "POST",
					body: payload,
				}),
			}),
			findServices: builder.query<IFindServicesResponse, IFindServicesRequest>({
				query: (queryParams) =>
					`/?${new URLSearchParams(queryParams as any).toString()}`,
			}),
		};
	},
});

export const { useCreateServiceMutation, useFindServicesQuery } = Service;
