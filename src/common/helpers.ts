import type { IErrorResponse, IFetchError } from "./types";

export const errorMessageHandling = (
	payload: IFetchError | IErrorResponse
): string => {
	if (payload?.status === "FETCH_ERROR") return "Server is unreachable.";
	else if (payload?.data?.statusCode) return payload?.data?.response.message;
	return "Something went wrong.";
};

export const getCurrentLatitudeLongitude = async (): Promise<{
	lat: number;
	lng: number;
}> => {
	return new Promise((resolve, reject) => {
		window.navigator.geolocation.getCurrentPosition(
			(pos) => {
				const coordinates = {
					lat: pos.coords.latitude,
					lng: pos.coords.longitude,
				};
				resolve(coordinates);
			},
			(err) => {
				console.error(err)
				reject(new Error("Geolocation is not available or permission denied."));
			}
		);
	});
};
