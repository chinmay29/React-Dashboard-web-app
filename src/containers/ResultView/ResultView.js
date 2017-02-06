import React, { PropTypes, Component } from "react";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import { selectOS } from "../../actions/buildActions";

import { fetchPerformanceData, fetchLogData, fetchScreenshotData, fetchReportFile }
	from "../../actions/detailResultFiles";

export class ResultView extends Component {
	componentWillMount() {
		const { dispatch, selectedOS } = this.props;
		//this also should be input
		dispatch(selectOS(this.props.params.os));
		dispatch(fetchPerformanceData(selectedOS, this.props.params.runId));
		dispatch(fetchLogData(selectedOS, this.props.params.runId));
		dispatch(fetchScreenshotData(selectedOS, this.props.params.runId));
		dispatch(fetchReportFile(selectedOS, this.props.params.date));
	}
	componentDidMount() {
		//const { dispatch, selectedOS } = this.props;
	}

	componentWillReceiveProps(nextProps) {
		//const { dispatch, selectedOS } = nextProps;
	}

	render() {
		//  console.log("props", this.props.runId, this);
		const { selectedOS, logFile, screenshotFile, performanceFile, reportFile } = this.props;
		require("./ResultView.scss");

		let link = "";
		if (selectedOS === "Android") {
			console.log("Android");
			link = `https://cloud.testdroid.com/#service/testrun/87414857/${this.props.params.runId}`;
		} else {
			link = `https://cloud.testdroid.com/#service/testrun/87873070/${this.props.params.runId}`;
		}
		return (
			<div>
				<Table
					responsive={true}
					striped={true}
					bordered={true}
					hover={true}
					id="ResTable"
				>
					<tbody>
						<tr>
							<td> OS </td>
							<td> {selectedOS} </td>
						</tr>
						<tr>
							<td>Date </td>
							<td> {this.props.params.date} </td>
						</tr>
						<tr>
							<td> Result (number of Passed tests) </td>
							{selectedOS === "Android" ?
								<td> {this.props.params.passTests} / 40 </td> :
								<td> {this.props.params.passTests} / 36 </td>
							}
						</tr>
						<tr>
							<td> testdroid test run link </td>
							<td> <a href={link} target="_blank"> Testdroid view </a></td>
						</tr>
						<tr>
							<td>Test run files</td>
							<td><a href={logFile}>Log File</a></td>
						</tr>
						<tr>
							<td></td>
							<td><a href={performanceFile}>Memory usage File</a></td>
						</tr>
						<tr>
							<td></td>
							<td><a href={screenshotFile}>All Screenshots</a></td>
						</tr>
						<tr>
							<td></td>
							<td><a href={reportFile} download={true}>Report File</a></td>
						</tr>
					</tbody>
				</Table>
			</div>
		);
	}
}

ResultView.propTypes = {
	selectedOS: PropTypes.string.isRequired,
	logFile: PropTypes.string.isRequired,
	performanceFile: PropTypes.string.isRequired,
	screenshotFile: PropTypes.string.isRequired,
	reportFile: PropTypes.string.isRequired,
	dispatch: PropTypes.func.isRequired,
	params: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	const { selectedOS, detailFiles } = state;
	const {
		performanceFile,
		logFile,
		screenshotFile,
		reportFile
	} = detailFiles[selectedOS]|| {
		isFetching: true,
		performanceFile: "",
		logFile: "",
		screenshotFile: "",
		reportFile: ""
	};

	return {
		selectedOS,
		performanceFile,
		logFile,
		screenshotFile,
		reportFile
	};
}

export default connect(mapStateToProps)(ResultView);
