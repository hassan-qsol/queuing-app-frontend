import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/loader";
import { Button } from "@/components/ui/button";
import { useGenerateTicketMutation } from "@/api/ticketApi";
import { useToast } from "@/hooks/use-toast";
import { errorMessageHandling } from "@/common/helpers";
import { useAppSelector } from "@/redux/hook";
import type { RootState } from "@/redux/store";
import { useParams } from "react-router-dom";
import { EUserType } from "@/common/types";

const ServicesForm = () => {
	const { serviceId } = useParams();
	const { value: loginValue } = useAppSelector(
		(state: RootState) => state.login
	);

	const [isLoading, setIsLoading] = useState(false);
	const [ticket, setTicket] = useState<undefined | number>();
	const { toast } = useToast();

	// --- API
	const [generateTicketMutation, { isLoading: isLoadingGenerateTicket }] =
		useGenerateTicketMutation();

	useEffect(() => {
		if (isLoadingGenerateTicket) {
			setIsLoading(true);
		} else setIsLoading(false);
	}, [isLoadingGenerateTicket]);

	const generateTicket = () => {
		if (loginValue.userType === EUserType.CUSTOMER) {
			generateTicketMutation({
				collectorId: loginValue.id,
				serviceId: Number(serviceId),
			})
				.unwrap()
				.then((resp) => {
					toast({
						title: `You ticket number is: ${resp.response}`,
					});
					setTicket(resp.response);
				})
				.catch((e: any) => {
					toast({
						variant: "destructive",
						title: "Login failed",
						description: errorMessageHandling(e),
					});
				});
		} else {
			toast({
				variant: "destructive",
				title: "Operation Failed",
				description: "This service is only for collectors",
			});
		}
	};

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div className="space-y-4 p-6 bg-white rounded shadow-md">
					<Card className="w-80 mb-5 text-center">
						<CardHeader>
							<CardTitle className="text-center text-lg font-medium">
								Ticket Number
							</CardTitle>
						</CardHeader>
						{typeof ticket === "number" && (
							<CardContent>
								<p className="text-center text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 shadow-lg animate-pulse">
									{ticket}
								</p>
							</CardContent>
						)}
						<CardFooter className="flex justify-center">
							<Button type="button" onClick={generateTicket}>
								Get Ticket
							</Button>
						</CardFooter>
					</Card>
				</div>
			)}
		</>
	);
};

export default ServicesForm;
