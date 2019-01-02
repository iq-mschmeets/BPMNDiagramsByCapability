import React from "react";
import ReactDOM from "react-dom";

import BusinessCapability from "./BusinessCapability.js";

export default function BusinessCapabilityBPMNDiagramList(props) {
	return (
		<ul
			style={{ paddingLeft: 0, borderTop: "1px solid #f2f2f2" }}
			className="list-unstyled"
		>
			{Object.keys(props.data).map(function(key, indx) {
				let rows = props.data[key];

				return (
					<BusinessCapability
						label={key}
						key={indx}
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
