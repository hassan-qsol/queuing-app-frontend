import type { FunctionComponent } from "../common/types";

// const environment = import.meta.env["VITE_APP_TITLE"];
export const Counter = (): FunctionComponent => {
	return (
		<div>
			{/* {environment} */}
			<div>
				<button
					aria-label="Increment value"
					onClick={() => {
						console.log("ok");
					}}
				>
					Customer
				</button>
			</div>
		</div>
	);
};
