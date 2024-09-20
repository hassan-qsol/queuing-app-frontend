import GeoDistanceCalculator from "@/components/utils/GeoDistanceCalculator";
import type { FunctionComponent } from "../common/types";

// const environment = import.meta.env["VITE_APP_TITLE"];
export const Counter = (): FunctionComponent => {
	return (
		<div>
			{/* {environment} */}
			<div>
				
				<GeoDistanceCalculator
					targetLatitude={24.86514272899492}
					targetLongitude={67.02530712270416}
				/>
			</div>
		</div>
	);
};
