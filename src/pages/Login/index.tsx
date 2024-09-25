import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import UserLogin from "./userLogin";
import CollectorLogin from "./collectorLogin";

const RadioButtonComponent: React.FC = () => {
	const [isOn, setIsOn] = useState(true);

	return (
		<div className="flex flex-col items-center justify-center space-y-4 m-5 p-6">
			<div className="bg-white shadow-lg rounded-lg border border-gray-200 transition duration-300 ease-in-out transform hover:scale-105 p-5">
				<RadioGroup
					className="flex items-center justify-center space-x-4"
					value={isOn ? "default" : "collector"}
					onValueChange={(value) => {
						setIsOn(value === "default");
					}}
				>
					<div className="flex items-center">
						<RadioGroupItem id="r1" value="default" />
						<Label htmlFor="r1">User</Label>
					</div>
					<div className="flex items-center">
						<RadioGroupItem id="r2" value="collector" />
						<Label htmlFor="r2">Collector</Label>
					</div>
				</RadioGroup>

				<div className="transition-opacity duration-300">
					{isOn ? <UserLogin /> : <CollectorLogin />}
				</div>
			</div>
		</div>
	);
};

export default RadioButtonComponent;
