import type { FC } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./header"; // Adjust the import path as necessary

const AdminLayout: FC = () => {
	return (
		<div className="flex flex-col h-screen">
			<AdminHeader />
			<main className="flex-1 overflow-y-auto p-6">
				<Outlet />
			</main>
		</div>
	);
};

export default AdminLayout;
