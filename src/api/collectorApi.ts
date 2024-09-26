import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/redux/store";
import type {
	ILoginStateResponse,
	IFindCollectorsResponse,
	ICollectorLoginInput,
} from "@/common/types"; // Import setUser action

const { VITE_API_URL } = import.meta.env;

export const Collector = createApi({
	reducerPath: "api/collectors",
	baseQuery: fetchBaseQuery({
		baseUrl: VITE_API_URL + "/collectors",
		prepareHeaders: (headers, { getState }) => {
			const token: string = (getState() as RootState).login.value.accessToken;
			if (token) headers.set("Authorization", `Bearer ${token}`);
			return headers;
		},
	}),
	tagTypes: ["collectors"],
	endpoints(builder) {
		return {
			setLoginCollector: builder.mutation<
				ILoginStateResponse,
				ICollectorLoginInput
			>({
				query: (payload) => ({
					url: "/",
					method: "POST",
					body: payload,
				}),
			}),
			findCollectors: builder.query<IFindCollectorsResponse, void>({
				query: () => `/`,
			}),
		};
	},
});

export const { useFindCollectorsQuery, useSetLoginCollectorMutation } =
	Collector;
