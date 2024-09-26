import type { IErrorResponse, IFetchError } from "./types";

export const handleLogout = () => {
	console.log("ok");
	localStorage.removeItem("app-login-session");
	window.location.href = `/`;
};

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
				console.error(err);
				reject(new Error("Geolocation is not available or permission denied."));
			}
		);
	});
};

// Haversine formula to calculate distance between two points
export const calculateDistance = (
	lon1: number,
	lat1: number,
	lon2: number,
	lat2: number
): number => {
	const R = 6371; // Radius of the Earth in km
	const toRad = (value: number) => (value * Math.PI) / 180;

	const dLat = toRad(lat2 - lat1);
	const dLon = toRad(lon2 - lon1);
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(toRad(lat1)) *
			Math.cos(toRad(lat2)) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2);

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const distance = R * c; // Distance in km

	return distance;
};

// Calculate estimated travel time based on distance and speed (km/h)
export const calculateTravelTime = (
	distance: number,
	speed: number
): number => {
	if (speed <= 0) return 0; // Prevent division by zero or negative speed
	return distance / speed; // Time in hours
};
