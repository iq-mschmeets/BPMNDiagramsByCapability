import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import { data, dataSet, groupedDataSet } from "./data.js";
import BusinessCapabilityBPMNDiagramList from "./BusinessCapabilityBPMNDiagramList.js";

function App() {
	return (
		<div className="App">
			<h4>Business Process Models Grouped by Capability</h4>
			<section>
				<BusinessCapabilityBPMNDiagramList
					data={groupedDataSet(data.data, data.meta, 3)}
					onRemoveDiagram={function(evt) {
						console.log("removeDiagram ", evt);
						alert('The "Remove Diagram" feature is not complete.');
					}}
					onAddDiagram={function(evt) {
						console.log("addDiagram ", evt);
						alert('The "Add Diagram" feature is not complete.');
					}}
				/>
			</section>
		</div>
	);
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
