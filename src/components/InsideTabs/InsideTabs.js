import React, { PropTypes, Component } from "react";
import BuildTable from "../BuildTable/BuildTable";
import { Tabs, Tab } from "react-bootstrap";
import TestResultTable from "../TestResultTable/TestResultTable";

export default class InsideTabs extends Component {
	render() {
		return (
			<div>
				<Tabs defaultActiveKey={1}>
					<Tab eventKey={1} title="Builds">
						<div>
							<BuildTable buildJson={this.props.buildJson} osType={this.props.osType} />
						</div>
					</Tab>
					<Tab eventKey={2} title="Test Results">
						<div>
							<TestResultTable resultJson={this.props.resultJson} deviceList={this.props.deviceList} osType={this.props.osType} />
						</div>
					</Tab>
				</Tabs>
			</div>
		);
	}
}

InsideTabs.propTypes = {
	buildJson: PropTypes.array.isRequired,
	osType: PropTypes.string.isRequired,
	resultJson: PropTypes.array.isRequired,
	deviceList: PropTypes.array.isRequired
};
