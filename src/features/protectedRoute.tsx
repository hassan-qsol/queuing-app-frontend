import { EUserType } from "@/common/types";
import { useAppSelector } from "@/redux/hook";
import type { RootState } from "@/redux/store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
	const { value: loginValue } = useAppSelector(
		(state: RootState) => state.login
	);

	const isAuthenticated = Boolean(localStorage.getItem("app-login-session"));
	const location = useLocation();

	// Redirect to login if not authenticated and trying to access a protected route
	if (!isAuthenticated && location.pathname !== "/login") {
		return <Navigate to="/login" />;
	}

	// Redirect to dashboard if authenticated and trying to access the login page
	if (isAuthenticated && location.pathname === "/login") {
		if (loginValue.userType === EUserType.ADMIN)
			return <Navigate to="/admin" />;
		else if (loginValue.userType === EUserType.MANAGER)
			return <Navigate to="/manager" />;
		else return <Navigate to="/" />;
	}

	if (isAuthenticated && location.pathname === "/") {
		if (
			loginValue.userType !== EUserType.CUSTOMER &&
			loginValue.userType === EUserType.ADMIN
		)
			return <Navigate to="/admin" />;
		else if (
			loginValue.userType !== EUserType.CUSTOMER &&
			loginValue.userType === EUserType.MANAGER
		)
			return <Navigate to="/manager" />;
	}

	if (isAuthenticated && location.pathname.startsWith("/admin")) {
		if (
			loginValue.userType !== EUserType.ADMIN &&
			loginValue.userType === EUserType.CUSTOMER
		)
			return <Navigate to="/" />;
		else if (
			loginValue.userType !== EUserType.ADMIN &&
			loginValue.userType === EUserType.MANAGER
		)
			return <Navigate to="/manager" />;
	}

	if (isAuthenticated && location.pathname.startsWith("/manager")) {
		if (
			loginValue.userType !== EUserType.MANAGER &&
			loginValue.userType === EUserType.CUSTOMER
		)
			return <Navigate to="/" />;
		else if (
			loginValue.userType !== EUserType.MANAGER &&
			loginValue.userType === EUserType.ADMIN
		)
			return <Navigate to="/admin" />;
	}

	return <Outlet />;
};

export default ProtectedRoute;
