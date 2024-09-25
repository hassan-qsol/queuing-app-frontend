import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import UserLogin from "./userLogin";
import CollectorLogin from "./collectorLogin";

const RadioButtonComponent: React.FC = () => {
	const [isOn, setIsOn] = useState(true);

	return (
		<div className="space-y-4">
			<RadioGroup
				value={isOn ? "default" : "collector"}
				onValueChange={(value) => {
					setIsOn(value === "default");
				}}
			>
				<div className="flex items-center space-x-2">
					<RadioGroupItem id="r1" value="default" />
					<Label htmlFor="r1">User</Label>
				</div>
				<div className="flex items-center space-x-2">
					<RadioGroupItem id="r2" value="collector" />
					<Label htmlFor="r2">Collector</Label>
				</div>
			</RadioGroup>

			{isOn ? <UserLogin /> : <CollectorLogin />}
		</div>
	);
};

export default RadioButtonComponent;
