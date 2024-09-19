import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

const headerRouter = [{ route: "/admin/settings", title: "Settings" }];
const AdminHeader = () => {
	return (
		<header className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
			<div className="flex items-center space-x-4">
				<Link className="text-2xl font-bold text-gray-800" to="/admin">
					Admin
				</Link>
				<nav className="hidden md:flex space-x-6">
					{headerRouter.map((data, i) => (
						<Link
							key={i}
							className="text-gray-600 hover:text-gray-800"
							to={data.route}
						>
							{data.title}
						</Link>
					))}
				</nav>
			</div>
			<div className="flex items-center space-x-4">
				<DropdownMenu>
					<DropdownMenuTrigger>
						<i className="fas fa-user-circle text-xl" />{" "}
						{/* Placeholder for trigger */}
					</DropdownMenuTrigger>
					<DropdownMenuContent className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
						<DropdownMenuItem className="flex items-center space-x-2 p-2 hover:bg-gray-100">
							<i className="fas fa-user mr-2" /> <span>Profile</span>
						</DropdownMenuItem>
						<DropdownMenuItem className="flex items-center space-x-2 p-2 hover:bg-gray-100">
							<i className="fas fa-sign-out-alt mr-2" /> <span>Logout</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
};

export default AdminHeader;
