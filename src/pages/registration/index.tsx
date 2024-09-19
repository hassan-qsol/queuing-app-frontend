import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type RegistrationSchema, registrationSchema } from "./registrationSchema"; // Adjust the import path

const Registration: React.FC = () => {
	// Initialize react-hook-form with Zod validation schema
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegistrationSchema>({
		resolver: zodResolver(registrationSchema),
	});

	// Handle form submission
	const onSubmit = (data: RegistrationSchema): void => {
		console.log("Login Data:", data);
		// Add logic to handle login (e.g., API call)
	};

	return (
		<form className="max-w-md mx-auto p-4" onSubmit={handleSubmit(onSubmit)}>
			{/* Register Field */}
			<div className="mb-4">
				<label
					className="block text-sm font-medium text-gray-700"
					htmlFor="organization"
				>
					Organization
				</label>
				<input
					id="organization"
					type="organization"
					className={`mt-1 block w-full p-2 border ${
						errors.organization ? "border-red-500" : "border-gray-300"
					} rounded-md`}
					{...register("organization")}
				/>
				{errors.email && (
					<p className="text-red-500 text-sm">{errors.email.message}</p>
				)}
			</div>

			{/* Email Field */}
			<div className="mb-4">
				<label
					className="block text-sm font-medium text-gray-700"
					htmlFor="email"
				>
					Email
				</label>
				<input
					id="email"
					type="email"
					className={`mt-1 block w-full p-2 border ${
						errors.email ? "border-red-500" : "border-gray-300"
					} rounded-md`}
					{...register("email")}
				/>
				{errors.email && (
					<p className="text-red-500 text-sm">{errors.email.message}</p>
				)}
			</div>

			{/* Password Field */}
			<div className="mb-4">
				<label
					className="block text-sm font-medium text-gray-700"
					htmlFor="password"
				>
					Password
				</label>
				<input
					id="password"
					type="password"
					className={`mt-1 block w-full p-2 border ${
						errors.password ? "border-red-500" : "border-gray-300"
					} rounded-md`}
					{...register("password")}
				/>
				{errors.password && (
					<p className="text-red-500 text-sm">{errors.password.message}</p>
				)}
			</div>

			{/* Submit Button */}
			<div>
				<button
					className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
					type="submit"
				>
					SignUp
				</button>
			</div>
		</form>
	);
};

export default Registration;
