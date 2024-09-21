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

// --- USER

export interface ILoginState {
	id: number;
	userName: string;
	email: string;
	fullName: string;
	userType: EUserType;
	accessToken: string;
	message?: string; // when it have some error
}

export interface ILoginInput {
	userName: string;
	password: string;
}

export interface ILoginStateResponse extends ResponseObject {
	response: ILoginState;
}

export interface IFindManager {
	id: string;
	name: string;
}

export interface IFindManagersResponse extends ResponseObject {
	response: Array<IFindManager>;
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
