import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./login/loginSlice";
import { Users } from "@/api/userApi";
import { Company } from "@/api/companyApi";
import { Service } from "@/api/serviceApi";

export const store = configureStore({
	reducer: {
		login: loginReducer,
		[Users.reducerPath]: Users.reducer,
		[Company.reducerPath]: Company.reducer,
		[Service.reducerPath]: Service.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }).concat(
			Users.middleware,
			Company.middleware,
			Service.middleware
		),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
