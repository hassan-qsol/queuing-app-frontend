import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type CollectorSchema, collectorSchema } from "./collectorSchema"; // Adjust the import path
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSetLoginCollectorMutation } from "@/api/userApi";
import { useDispatch } from "react-redux";
import { login } from "@/redux/login/loginSlice";
import { useToast } from "@/hooks/use-toast";
import { errorMessageHandling } from "@/common/helpers";

const CollectorLogin: React.FC = () => {
	// Initialize react-hook-form with Zod validation schema

	const dispatch = useDispatch();
	const { toast } = useToast();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CollectorSchema>({
		resolver: zodResolver(collectorSchema),
	});

	// --- API
	const [setCollectorLogin, { isLoading }] = useSetLoginCollectorMutation();

	// Handle form submission
	const onSubmit = async (values: CollectorSchema): Promise<void> => {
		await setCollectorLogin(values)
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
	};

	return (
		<form className="max-w-md mx-auto p-4" onSubmit={handleSubmit(onSubmit)}>
			{/* CNIC Field */}
			<div className="mb-4">
				<Label htmlFor="cnic">CNIC</Label>
				<Input
					id="cnic"
					className={`mt-1 block w-full p-2 border ${
						errors.cnic ? "border-red-500" : "border-gray-300"
					} rounded-md`}
					{...register("cnic")}
				/>
				{errors.cnic && (
					<p className="text-red-500 text-sm">{errors.cnic.message}</p>
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

export default CollectorLogin;
