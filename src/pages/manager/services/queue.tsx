import { useState, useEffect } from "react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card"; // Using Shadcn card component
import { Badge } from "@/components/ui/badge"; // Using Shadcn badge component
import {
	useFindTicketsQuery,
	useUpdateTicketsQueueMutation,
} from "@/api/ticketApi";
import Loader from "@/components/ui/loader";
import { ETicketStatus } from "@/common/types";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { errorMessageHandling } from "@/common/helpers";
import { useToast } from "@/hooks/use-toast";

const getStatusColor = (status: ETicketStatus) => {
	switch (status) {
		case ETicketStatus.COMPLETED:
			return "bg-green-500";
		case ETicketStatus.PROCESS:
			return "bg-yellow-500";
		case ETicketStatus.PENDING:
			return "bg-red-500";
		default:
			return "bg-gray-500";
	}
};

const QueueList: React.FC = () => {
	const { companyId, serviceId } = useParams();
	const [isLoading, setIsLoading] = useState(false);
	const { toast } = useToast();

	// API ---
	const {
		currentData: findServicesData,
		isFetching,
		refetch,
	} = useFindTicketsQuery(
		{
			companyId: String(companyId),
			serviceId: String(serviceId),
		},
		{
			refetchOnMountOrArgChange: true,
		}
	);
	const [updateTicketsQueueMutation, { isLoading: isUpdatingQueue }] =
		useUpdateTicketsQueueMutation();

	useEffect(() => {
		if (isFetching || isUpdatingQueue) {
			setIsLoading(true);
		} else setIsLoading(false);
	}, [isFetching, isUpdatingQueue]);

	const onUpdate = (ticketId: number, status: ETicketStatus) => {
		setIsLoading(true);
		updateTicketsQueueMutation({
			ticketId,
			status,
			companyId: Number(companyId),
		})
			.unwrap()
			.then(async () => {
				await refetch();
				setIsLoading(false);
			})
			.catch((e: any) => {
				setIsLoading(false);
				toast({
					variant: "destructive",
					title: "Operation Failed",
					description: errorMessageHandling(e),
				});
			});
	};

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div className="p-4">
					<div className="max-h-[600px] overflow-y-auto border border-gray-300 rounded-md p-5">
						{findServicesData?.response?.length ? (
							<>
								{findServicesData.response.map((ticket) => (
									<Card key={ticket.ticketNo} className="shadow-md mb-2">
										<CardHeader>
											<CardTitle>Ticket # {ticket.ticketNo}</CardTitle>
											<CardDescription>
												Collector CNIC: {ticket.collectorCNIC}
											</CardDescription>
										</CardHeader>
										<CardContent className="flex w-full justify-between">
											<Badge
												className={`text-white ${getStatusColor(ticket.status)} w-24 h-8 flex items-center justify-center`}
											>
												{ticket.status.toUpperCase()}
											</Badge>

											{ticket.myTurn && (
												<Button
													onClick={() => {
														onUpdate(ticket.id, ticket.status);
													}}
												>
													{ticket.status === ETicketStatus.PENDING
														? "Process the Ticket"
														: "Processed, Next ticket."}
												</Button>
											)}
										</CardContent>
									</Card>
								))}
							</>
						) : (
							<p>No Tickets for today.</p>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default QueueList;
