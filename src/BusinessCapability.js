import React from "react";
import ReactDOM from "react-dom";

import BPMNDiagramLink from "./BPMNDiagramLink.js";

export default class BusinessCapability extends React.Component {
	constructor(props) {
		super(props);
		this.state = { display: "none" };
		this.addDiagram = this.addDiagram.bind(this);
		this.toggle = this.toggle.bind(this);
	}
	addDiagram(evt) {
		evt.preventDefault();
		evt.stopPropagation();
		this.props.onAddDiagram(this.props.rows, this.props.label);
	}
	toggle(evt) {
		evt.preventDefault();
		evt.stopPropagation();
		this.setState({ display: this.state.display == "none" ? "block" : "none" });
	}
	render() {
		const p = this.props;
		const gly =
			this.state.display == "none"
				? "glyphicon glyphicon-chevron-right"
				: "glyphicon glyphicon-chevron-down";

		// Remove rows without a value for the "child".
		const rowSet = p.rows.filter(function(row) {
			return row.m("ELEMENT.ELEMENT_ID", 1) != "";
		});

		return (
			<li>
				<div className="business-cap" onClick={this.toggle}>
					<div className="wrapper">
						<div className="cap-txt">
							<span
								className={gly}
								style={{ paddingRight: 5, color: "rgb(164, 164, 164)" }}
							/>
							<span>{p.label}</span>
						</div>
						<div>
							<span
								className="badge"
								title="Number of BPMN Diagrams assigned to this Business Capability"
							>
								{rowSet.length}
							</span>
							<span
								title="Add BPMN Diagram to this Capability"
								style={{ paddingLeft: 5 }}
								onClick={this.addDiagram}
							>
								<span
									className="glyphicon glyphicon-plus"
									style={{ color: "green", cursor: "pointer" }}
								/>
							</span>
						</div>
					</div>
				</div>
				<ul
					className="list-unstyled"
					style={{ paddingLeft: 10, display: this.state.display }}
				>
					{rowSet.map(function(row, indx) {
						let p1 = {
							row: row,
							remove: p.onRemoveDiagram,
							key: indx,
							activateDiagram: p.activateDiagram
						};
						return BPMNDiagramLink(p1);
					})}
				</ul>
			</li>
		);
	}
}
