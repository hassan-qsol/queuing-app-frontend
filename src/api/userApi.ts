// userApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/redux/store";
import type {
	IFindManagersResponse,
	ILoginInput,
	ILoginStateResponse,
	IFindCollectorsResponse,
	ICustomerLoginInput
} from "@/common/types"; // Import setUser action

const { VITE_API_URL } = import.meta.env;

export const Users = createApi({
	reducerPath: "api/users",
	baseQuery: fetchBaseQuery({
		baseUrl: VITE_API_URL + "/users",
		prepareHeaders: (headers, { getState }) => {
			const token: string = (getState() as RootState).login.value.accessToken;
			if (token) headers.set("Authorization", `Bearer ${token}`);
			return headers;
		},
	}),
	tagTypes: ["users"],
	endpoints(builder) {
		return {
			// Login mutation
			setLogin: builder.mutation<ILoginStateResponse, ILoginInput>({
				query: (payload) => ({
					url: "/login",
					method: "POST",
					body: payload,
				}),
			}),
			setLoginCollector: builder.mutation<ILoginStateResponse, ICustomerLoginInput>({
				query: (payload) => ({
					url: "/login-collector",
					method: "POST",
					body: payload,
				}),
			}),
			findManagers: builder.query<IFindManagersResponse, void>({
				query: () => `/`,
			}),
			findCollectors: builder.query<IFindCollectorsResponse, void>({
				query: () => `/collectors`,
			}),
		};
	},
});

export const {
	useSetLoginMutation,
	useFindManagersQuery,
	useFindCollectorsQuery,
	useSetLoginCollectorMutation
	
} = Users;
