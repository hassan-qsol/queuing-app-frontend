import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type LoginSchema, loginSchema } from "./loginSchema"; // Adjust the import path
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSetLoginMutation } from "@/api/userApi";
import { useDispatch } from "react-redux";
import { login } from "@/redux/login/loginSlice";
import { useToast } from "@/hooks/use-toast";
import { errorMessageHandling } from "@/common/helpers";

const UserLogin: React.FC = () => {
	// Initialize react-hook-form with Zod validation schema

	const dispatch = useDispatch();
	const { toast } = useToast();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
	});

	// --- API
	const [setUserLogin, { isLoading }] = useSetLoginMutation();

	// Handle form submission
	const onSubmit = async (values: LoginSchema): Promise<void> => {
		try {
			await setUserLogin(values)
				.unwrap()
				.then((resp) => {
					if (resp?.response?.accessToken) {
						console.log(resp.response);
						dispatch(login(resp.response));
						window.location.href = `/`;
					} else
						toast({
							variant: "destructive",
							title: "Unable to find Access Token",
						});
				})
				.catch((e: any) => {
					toast({
						variant: "destructive",
						title: "Login failed",
						description: errorMessageHandling(e),
					});
				});
		} catch (ex: any) {
			toast({
				variant: "destructive",
				title: "Login failed",
				description: ex?.message,
			});
		}
	};

	return (
		<form className="max-w-md mx-auto p-4" onSubmit={handleSubmit(onSubmit)}>
			{/* Email Field */}
			<div className="mb-4">
				<Label htmlFor="userName">User Name</Label>
				<Input
					id="userName"
					className={`mt-1 block w-full p-2 border ${
						errors.userName ? "border-red-500" : "border-gray-300"
					} rounded-md`}
					{...register("userName")}
				/>
				{errors.userName && (
					<p className="text-red-500 text-sm">{errors.userName.message}</p>
				)}
			</div>

			{/* Password Field */}
			<div className="mb-4">
				<Label htmlFor="password">Password</Label>
				<Input
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
			<div className="text-center">
				<Button disabled={isLoading} type="submit">
					Sign in
				</Button>
			</div>
		</form>
	);
};

export default UserLogin;
