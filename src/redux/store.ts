import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./login/loginSlice";
import { Users } from "@/api/userApi";
import { Collector } from "@/api/collectorApi";
import { Company } from "@/api/companyApi";
import { Ticket } from "@/api/ticketApi";
import { Service } from "@/api/serviceApi";

export const store = configureStore({
	reducer: {
		login: loginReducer,
		[Users.reducerPath]: Users.reducer,
		[Collector.reducerPath]: Collector.reducer,
		[Company.reducerPath]: Company.reducer,
		[Service.reducerPath]: Service.reducer,
		[Ticket.reducerPath]: Ticket.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }).concat(
			Users.middleware,
			Company.middleware,
			Service.middleware,
			Ticket.middleware,
			Collector.middleware
		),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
