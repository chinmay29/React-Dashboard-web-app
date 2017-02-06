import React, { Component, PropTypes } from "react";
import { Table } from "react-bootstrap";
import moment from "moment";

export default class StudioResult extends Component {

	render() {
		require("./StudioResult.scss");
		const date = [];
		let today = moment().format("YYYY-MM-DD");
		today = (moment(today, "YYYY-MM-DD").subtract(1, "days")).format("YYYY-MM-DD");
		const startOfWeek = (moment(today, "YYYY-MM-DD").subtract(7, "days")).format("YYYY-MM-DD");

		while (today > startOfWeek) {
			date.push(today);
			today = (moment(today, "YYYY-MM-DD").subtract(1, "days")).format("YYYY-MM-DD");
		}
		//console.log(moment(Date.parse("Mon, 15 Aug 2016 22:00:01 GMT")).format("YYYY-MM-DD"));
		return (
			<div>
			<Table
				responsive={true}
				striped={true}
				bordered={true}
				hover={true}
				id="table"
			>
				<caption> <b>STAGING</b> </caption>
				<thead>
					<tr>
					<th id="date">Date </th>
					<th>No of tests</th>
					<th>Errors</th>
					<th>Login (Passed assertions)[time]</th>
					<th>New project (Passed assertions)[time]</th>
					<th>Project Overview (Passed assertions)[time]</th>
					<th>Test design surface tools (Passed assertions)[time]</th>
					<th>Publish (Passed assertions)[time]</th>
					<th>Remove previous project (Passed assertions)[time]</th>
					<th>Logout (Passed assertions)[time]</th>
					</tr>
				</thead>
				<tbody>
					{this.props.stagingResult.map((res, i) =>
					<tr key={i}>
					<td key={i+1}>{moment(Date.parse(res.date)).format("YYYY-MM-DD")}</td>
					<td key={i+2}>{res.tests}</td>
					<td key={i+17}>{res.errors}</td>
					<td key={i+3}>{res.testArray[0].assertions}[{res.testArray[0].time}]</td>
					<td key={i+5}>{res.testArray[1].assertions}[{res.testArray[1].time}]</td>
					<td key={i+7}>{res.testArray[2].assertions}[{res.testArray[2].time}]</td>
					<td key={i+9}>{res.testArray[3].assertions}[{res.testArray[3].time}]</td>
					<td key={i+11}>{res.testArray[4].assertions}[{res.testArray[4].time}]</td>
					<td key={i+13}>{res.testArray[5].assertions}[{res.testArray[5].time}]</td>
					<td key={i+15}>{res.testArray[6].assertions}[{res.testArray[6].time}]</td>
					</tr>
					)}
				</tbody>
			</Table>
			<Table
				responsive={true}
				striped={true}
				bordered={true}
				hover={true}
				id="table"
			>
				<caption> <b>PRODUCTION</b> </caption>
				<thead>
					<tr>
					<th id="date">Date </th>
					<th>No of tests</th>
					<th>Errors</th>
					<th>Login (Passed assertions)[time]</th>
					<th>New project (Passed assertions)[time]</th>
					<th>Project Overview (Passed assertions)[time]</th>
					<th>Test design surface tools (Passed assertions)[time]</th>
					<th>Publish (Passed assertions)[time]</th>
					<th>Remove previous project (Passed assertions)[time]</th>
					<th>Logout (Passed assertions)[time]</th>
					</tr>
				</thead>
				<tbody>
					{this.props.productionResult.map((res, i) =>
					<tr key={i}>
					<td key={i+1}>{moment(Date.parse(res.date)).format("YYYY-MM-DD")}</td>
					<td key={i+2}>{res.tests}</td>
					<td key={i+17}>{res.errors}</td>
					<td key={i+3}>{res.testArray[0].assertions}[{res.testArray[0].time}]</td>
					<td key={i+5}>{res.testArray[1].assertions}[{res.testArray[1].time}]</td>
					<td key={i+7}>{res.testArray[2].assertions}[{res.testArray[2].time}]</td>
					<td key={i+9}>{res.testArray[3].assertions}[{res.testArray[3].time}]</td>
					<td key={i+11}>{res.testArray[4].assertions}[{res.testArray[4].time}]</td>
					<td key={i+13}>{res.testArray[5].assertions}[{res.testArray[5].time}]</td>
					<td key={i+15}>{res.testArray[6].assertions}[{res.testArray[6].time}]</td>
					</tr>
					)}
				</tbody>
			</Table>
			</div>
		);
	};
}
StudioResult.propTypes = {
	stagingResult: PropTypes.array.isRequired,
	productionResult: PropTypes.array.isRequired
};
