import type { FC } from "react";
import { Outlet } from "react-router-dom";
import CustomerHeader from "./header"; // Adjust the import path as necessary

const CustomerLayout: FC = () => {
	return (
		<div className="flex flex-col h-screen">
			<CustomerHeader />
			<main className="flex-1 overflow-y-auto p-6">
				<Outlet />
			</main>
		</div>
	);
};

export default CustomerLayout;
