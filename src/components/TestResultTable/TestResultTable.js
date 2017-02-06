import React, { PropTypes, Component } from "react";
import { Table } from "react-bootstrap";
import moment from "moment";
import { Link } from "react-router";

export default class TestResultTable extends Component {
	render() {
		require("./TestResultTable.scss");
		const titles = ["Id", "Device", "OS Version", "Test Count"];
		const date = [];
		let today = moment().format("YYYY-MM-DD");
		today = (moment(today, "YYYY-MM-DD").subtract(1, "days")).format("YYYY-MM-DD");
		const startOfWeek = (moment(today, "YYYY-MM-DD").subtract(7, "days")).format("YYYY-MM-DD");

		while (today > startOfWeek) {
			date.push(today);
			today = (moment(today, "YYYY-MM-DD").subtract(1, "days")).format("YYYY-MM-DD");
		}
		//creating dates titles dynamically
		const dateCol = date.map((i) => <th key={i} id="dates">{i}</th>);

		//creating titles jsx variable from titles array
		const titleCol = titles.map((i) => <th key={i} id="titles">{i}</th>);

		function passStyle(res, col, osType) {
			//console.log(res.res);
			let value = 0;
			switch (col) {
				case 1:
					value = res.res.Pass1;
					break;
				case 2:
					value = res.res.Pass2;
					break;
				case 3:
					value = res.res.Pass3;
					break;
				case 4:
					value = res.res.Pass4;
					break;
				case 5:
					value = res.res.Pass5;
					break;
				case 6:
					value = res.res.Pass6;
					break;
				case 7:
					value = res.res.Pass7;
					break;
				default:
					break;
			}
			if (osType === "Android") {
				if (value > "35") {
					return {
						background: "green"
					};
				} else if (value > 30 && value < 36) {
					return {
						background: "orange"
					};
				} else if (value === "") {
					return {
						background: "white"
					};
				} else if (value < 30) {
					return {
						background: "red"
					};
				}
			} else {
				if (value > "32") {
					return {
						background: "green"
					};
				} else if (value > 26 && value < 32) {
					return {
						background: "orange"
					};
				} else if (value === "") {
					return {
						background: "white"
					};
				} else if (value < 25) {
					return {
						background: "red"
					};
				}
			}
		}
		function rowHide(res) {
			if (res.res.deviceName === "") {
				return {
					display: "none"
				};
			}
		}
		return (
			<div>
			<Table
				responsive={true}
				striped={true}
				bordered={true}
				hover={true}
				id="table"
			>
				<caption> Table to show number of passed tests in last 7 days. Click on the test run to see detailed view with all test run related files. </caption>
				<thead>
					<tr>
					{titleCol}
					{dateCol}
					</tr>
				</thead>
				<tbody>
					{this.props.resultJson.map((res, i) =>
					<tr key={i} style={rowHide({ res })}>
					<td key={i+1}>{i+1}</td>
					<td key={i+2}>{res.deviceName}</td>
					<td key={i+3}>{res.deviceVersion}</td>
					<td key={i+4} style={tidStyle}>{res.testCount}</td>
					<td key={i+5} style={passStyle({ res }, 1, this.props.osType)}><Link to={`/ResultView/${this.props.osType}/${date[0]}/${res.runId1}/${res.Pass1}`}>{res.Pass1}</Link></td>
					<td key={i+6} style={passStyle({ res }, 2, this.props.osType)}><Link to={`/ResultView/${this.props.osType}/${date[1]}/${res.runId2}/${res.Pass2}`}>{res.Pass2}</Link></td>
					<td key={i+7} style={passStyle({ res }, 3, this.props.osType)}><Link to={`/ResultView/${this.props.osType}/${date[2]}/${res.runId3}/${res.Pass3}`}>{res.Pass3}</Link></td>
					<td key={i+8} style={passStyle({ res }, 4, this.props.osType)}><Link to={`/ResultView/${this.props.osType}/${date[3]}/${res.runId4}/${res.Pass4}`}>{res.Pass4}</Link></td>
					<td key={i+9} style={passStyle({ res }, 5, this.props.osType)}><Link to={`/ResultView/${this.props.osType}/${date[4]}/${res.runId5}/${res.Pass5}`}>{res.Pass5}</Link></td>
					<td key={i+10} style={passStyle({ res }, 6, this.props.osType)}><Link to={`/ResultView/${this.props.osType}/${date[5]}/${res.runId6}/${res.Pass6}`}>{res.Pass6}</Link></td>
					<td key={i+11} style={passStyle({ res }, 7, this.props.osType)}><Link to={`/ResultView/${this.props.osType}/${date[6]}/${res.runId7}/${res.Pass7}`}>{res.Pass7}</Link></td>
					</tr>
					)}
				</tbody>
			</Table>
			</div>
		);
	}
}
TestResultTable.propTypes = {
	resultJson: PropTypes.array.isRequired,
	osType: PropTypes.string.isRequired,
	deviceList: PropTypes.array.isRequired
};
const tidStyle = {
	color: "green"
};
