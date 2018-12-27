import React from "react";
import ReactDOM from "react-dom";

import BusinessCapability from "./BusinessCapability.js";

export default function BusinessCapabilityBPMNDiagramList(props) {
	return (
		<ul style={{ paddingLeft: 10 }} className="list-unstyled">
			{Object.keys(props.data).map(function(key) {
				let rows = props.data[key];

				return (
					<BusinessCapability
						label={key}
						rows={rows}
						onRemoveDiagram={props.onRemoveDiagram}
						onAddDiagram={props.onAddDiagram}
						activateDiagram={props.onActivateDiagram}
					/>
				);
			})}
		</ul>
	);
}
