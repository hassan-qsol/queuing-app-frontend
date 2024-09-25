// --- Default Boilerplate Settings
export type FunctionComponent = React.ReactElement | null;

type HeroIconSVGProps = React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> &
	React.RefAttributes<SVGSVGElement>;
type IconProps = HeroIconSVGProps & {
	title?: string;
	titleId?: string;
};
export type Heroicon = React.FC<IconProps>;

// --- Generic

export interface IErrorResponse {
	status: number;
	data: {
		statusCode: number;
		timestamp: string;
		path: string;
		response: {
			message: string;
			error: string;
			statusCode: number;
		};
	};
}

export interface IFetchError {
	status: "FETCH_ERROR";
	error: string;
}

// --- API

export interface ResponseObject {
	statusCode: number;
	response: unknown;
	path: string;
	timestamp: unknown;
}

export enum EUserType {
	ADMIN = "ADMIN",
	MANAGER = "MANAGER",
	CUSTOMER = "CUSTOMER",
}

export enum ETicketStatus {
	PROCESS = "PROCESS",
	PENDING = "PENDING",
	COMPLETED = "COMPLETED",
}

// --- USER

export interface ILoginState {
	id: number;
	userName?: string;
	email?: string;
	fullName?: string;
	cnic?: string;
	message?: string; // when it have some error
	userType: EUserType;
	accessToken: string;
}

export interface ILoginInput {
	userName: string;
	password: string;
}

export interface ILoginStateResponse extends ResponseObject {
	response: ILoginState;
}

export interface IFind {
	id: string;
	name: string;
}

export interface IFindManagersResponse extends ResponseObject {
	response: Array<IFind>;
}

export interface IFindCollectorsResponse extends ResponseObject {
	response: Array<IFind>;
}

// --- COLLECTOR

export interface ICustomerLoginInput {
	cnic: string;
}

// --- COMPANY

export interface ICreateCompanyRequest {
	companyName: string;
	companyManager: number;
	lat: number;
	lng: number;
}

export interface ICreateCompanyResponse extends ResponseObject {
	response: string;
}

export interface IFindCompanies {
	id: number;
	companyName: string;
	companyManager: number;
	weekdays: Array<string>;
	lat: number;
	lng: number;
	isOpen: boolean;
	operating_days: Array<{
		id: number;
		weekday_id: number;
		weekday: {
			day_name: string;
		};
	}>;
}

export interface IFindCompaniesResponse extends ResponseObject {
	response: Array<IFindCompanies>;
}

// --- SERVICE

export interface ICreateServiceRequest {
	serviceName: string;
	serviceDescription: string;
	companyId: number;
}

export interface ICreateServiceResponse extends ResponseObject {
	response: string;
}

export interface IFindServicesRequest {
	companyId: number;
}

export interface IFindServices {
	id: number;
	name: string;
	description: string;
}

export interface IFindServicesResponse extends ResponseObject {
	response: Array<IFindServices>;
}

export interface IManagerFindServices {
	id: number;
	name: string;
	description: string;
	companyId: number;
}

export interface IManagerFindServicesResponse extends ResponseObject {
	response: Array<IManagerFindServices>;
}

// --- TICKET

export interface IGenerateTicketRequest {
	serviceId: number;
	collectorId: number;
}

export interface IGenerateTicketResponse extends ResponseObject {
	response: number;
}

export interface IFindTicketsRequest {
	companyId: string;
	serviceId: string;
}

export interface IFindTickets {
	id: number;
	ticketNo: number;
	collectorId: number;
	collectorCNIC: string;
	status: ETicketStatus;
	myTurn: boolean;
}

export interface IFindTicketsResponse extends ResponseObject {
	response: Array<IFindTickets>;
}

export interface IUpdateTicketsQueueRequest {
	ticketId: number;
	companyId: number;
	status: ETicketStatus;
}

export interface IUpdateTicketsQueueResponse extends ResponseObject {
	response: string;
}
