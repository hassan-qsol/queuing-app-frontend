import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/redux/store";
import type {
	IFindTicketsRequest,
	IFindTicketsResponse,
	IGenerateTicketRequest,
	IGenerateTicketResponse,
	IUpdateTicketsQueueRequest,
	IUpdateTicketsQueueResponse,
} from "@/common/types";

const { VITE_API_URL } = import.meta.env;

export const Ticket = createApi({
	reducerPath: "api/tickets",
	baseQuery: fetchBaseQuery({
		baseUrl: VITE_API_URL + "/tickets",
		prepareHeaders: (headers, { getState }) => {
			const token: string = (getState() as RootState).login.value.accessToken;
			if (token) headers.set("Authorization", `Bearer ${token}`);
			return headers;
		},
	}),
	tagTypes: ["tickets"],
	endpoints(builder) {
		return {
			generateTicket: builder.mutation<
				IGenerateTicketResponse,
				IGenerateTicketRequest
			>({
				query: (payload) => ({
					url: "/",
					method: "POST",
					body: payload,
				}),
			}),
			updateTicketsQueue: builder.mutation<
				IUpdateTicketsQueueResponse,
				IUpdateTicketsQueueRequest
			>({
				query: (payload) => ({
					url: "/",
					method: "PATCH",
					body: payload,
				}),
			}),
			findTickets: builder.query<IFindTicketsResponse, IFindTicketsRequest>({
				query: (queryParams) =>
					`/?${new URLSearchParams(queryParams as any).toString()}`,
			}),
		};
	},
});

export const {
	useGenerateTicketMutation,
	useFindTicketsQuery,
	useUpdateTicketsQueueMutation,
} = Ticket;
