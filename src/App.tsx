import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { FunctionComponent } from "./common/types";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/registration";
import { Counter } from "./pages/Counter";
import ProtectedRoute from "./features/protectedRoute";
import NotFound from "./pages/notFound";
import AdminLayout from "./components/layout/admin";
import CustomerLayout from "./components/layout/customer";
import ManagerLayout from "./components/layout/manager";

// import { TanStackRouterDevelopmentTools } from "./components/utils/development-tools/TanStackRouterDevelopmentTools";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const App = (): FunctionComponent => {
	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<Router>
					<Routes>
						<Route element={<ProtectedRoute />}>
							<Route element={<Login />} path="/login" />
							<Route element={<Register />} path="/register" />
							<Route element={<CustomerLayout />} path="/">
								<Route index element={<Counter />} path="/" />
							</Route>
							<Route element={<AdminLayout />} path="/admin">
								<Route element={<Counter />} path="/admin" />
							</Route>
							<Route element={<ManagerLayout />} path="/manager">
								<Route element={<Counter />} path="/manager" />
							</Route>
							<Route element={<NotFound />} path="*" />
						</Route>
					</Routes>
				</Router>
			</QueryClientProvider>
		</Provider>
	);
};

export default App;
