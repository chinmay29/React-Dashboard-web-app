import React, { PropTypes, Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

export default class BuildTable extends Component {
	render() {
		require("./BuildTable.scss");
		require("../../../node_modules/react-bootstrap-table/css/react-bootstrap-table-all.min.css");
		const jsonBuild = this.props.buildJson.map((build) => build);
		function urlFormat1(cell) {
			return `<a href=${cell}>app-press-now.apk</a>`;
		}
		function urlFormat2(cell) {
			return `<a href=${cell}>app-press-now.ipa</a>`;
		}
		const options = {
			hideSizePerPage: true
		};
		return (
			<div id="buildTable">
				<BootstrapTable
					data={jsonBuild}
					pagination={true}
					striped={true} hover={true} options={options}
				>
					<TableHeaderColumn dataField="id" isKey={true} width="50">ID</TableHeaderColumn>
					<TableHeaderColumn dataField="Date" width="200">Date</TableHeaderColumn>
					<TableHeaderColumn dataField="AppVersion" width="150">App version</TableHeaderColumn>
					{this.props.osType === "Android" ?
					<TableHeaderColumn dataField="buildUrl" dataFormat={urlFormat1} width="250">Build path</TableHeaderColumn>:
					<TableHeaderColumn dataField="buildUrl" dataFormat={urlFormat2} width="250">Build path</TableHeaderColumn>
					}
				</BootstrapTable>
			</div>
		);
	}
}
BuildTable.propTypes = {
	buildJson: PropTypes.array.isRequired,
	osType: PropTypes.string.isRequired
};
