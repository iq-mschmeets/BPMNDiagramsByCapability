import React from "react";
import ReactDOM from "react-dom";

export default (function BPMNDiagramLink(props) {
	const row = props.row;
	const editHref =
		"../request/elementForm?id=" + row.m("ELEMENT.ELEMENT_ID", 1);

	function remove() {
		props.remove(props.row);
	}

	function activateDiagram(evt) {
		evt.preventDefault();
		evt.stopPropagation();
		props.activateDiagram(props.row);
	}

	if (row.m("ELEMENT.ELEMENT_ID", 1) == "") {
		return null;
	}

	return (
		<li className="bpmn-diagram-item">
			<div className="wrapper">
				<div
					title="Show Diagram"
					data-widget="bpmn.link"
					data-need={row.m("ELEMENT.NEED", 0)}
					data-diagram-eid={row.m("ELEMENT.ELEMENT_ID", 1)}
					className="bpmn-link"
					onClick={activateDiagram}
				>
					{row.m("ELEMENT.DESCRIPTION", 1)}
				</div>
				<div className="mn">
					<a onClick={remove}>
						<span
							title="Remove Diagram"
							style={{ color: "red", paddingRight: 5 }}
							className="glyphicon glyphicon-remove"
						/>
					</a>
					<a title="Edit Diagram" target="_blank" href={editHref}>
						<span className="glyphicon glyphicon-edit" />
					</a>
				</div>
			</div>
		</li>
	);
});
