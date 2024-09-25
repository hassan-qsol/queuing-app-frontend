import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { FunctionComponent } from "./common/types";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/registration";
import ProtectedRoute from "./features/protectedRoute";
import NotFound from "./pages/notFound";
import AdminLayout from "./components/layout/admin";
import CustomerLayout from "./components/layout/customer";
import ManagerLayout from "./components/layout/manager";
import CompanyForm from "./pages/admin/company";
import CompaniesList from "./pages/admin/company/companiesList";
import ServicesList from "./pages/admin/service";
import ServicesForm from "./pages/admin/service/form";
import ServiceDetail from "./pages/admin/service/detail";
import RadioButtonComponent from "./pages/Login";
import Manager from "./pages/manager/services";
import QueueList from "./pages/manager/services/queue";

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
							<Route element={<RadioButtonComponent />} path="/login" />
							<Route element={<Register />} path="/register" />
							<Route element={<CustomerLayout />} path="/">
								<Route index element={<CompaniesList />} path="/" />
								<Route
									element={<ServicesList />}
									path="/company/:companyId/services"
								/>
								<Route
									element={<ServiceDetail />}
									path="/company/:companyId/services/:serviceId"
								/>
							</Route>
							<Route element={<AdminLayout />} path="/admin">
								<Route element={<CompanyForm />} path="/admin" />
								<Route element={<CompaniesList />} path="/admin/company" />
								<Route
									element={<ServicesForm />}
									path="/admin/company/:companyId/services/add"
								/>
								<Route
									element={<ServicesList />}
									path="/admin/company/:companyId/services"
								/>
								<Route
									element={<ServicesList />}
									path="/admin/company/:companyId/services/:serviceId"
								/>
							</Route>
							<Route element={<ManagerLayout />} path="/manager">
								<Route element={<Manager />} path="/manager" />
								<Route
									element={<QueueList />}
									path="/manager/company/:companyId/services/:serviceId"
								/>
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
