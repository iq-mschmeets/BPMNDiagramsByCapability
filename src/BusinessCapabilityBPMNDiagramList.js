import React from "react";
import ReactDOM from "react-dom";

import BusinessCapability from "./BusinessCapability.js";

export default function BusinessCapabilityBPMNDiagramList(props) {
	console.log("P ", props);
	return (
		<ul style={{ paddingLeft: 10 }} className="list-unstyled">
			{Object.keys(props.data).map(function(key) {
				let rows = props.data[key];
				console.log(rows);

				return (
					<BusinessCapability
						label={key}
						rows={rows}
						onRemoveDiagram={props.onRemoveDiagram}
						onAddDiagram={props.onAddDiagram}
					/>
				);
			})}
		</ul>
	);
}