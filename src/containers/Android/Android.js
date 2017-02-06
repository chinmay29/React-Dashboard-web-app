import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import InsideTabs from "../../components/InsideTabs/InsideTabs";
import { selectOS, fetchBuildsIfNeeded, invalidateOS } from "../../actions/buildActions";
import { invalidateResult, fetchTestResultIfNeeded } from "../../actions/testResultActions";

export class Android extends Component {
	constructor(props) {
		super(props);
		this.handleRefreshClick = this.handleRefreshClick.bind(this);
	}
	componentWillMount() {
		const { dispatch } = this.props;
		//console.log("first");
		dispatch(selectOS("Android"));
	}
	componentDidMount() {
		//const { dispatch, selectedOS } = this.props;
		//console.log("second");
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.selectedOS !== this.props.selectedOS) {
			const { dispatch, selectedOS } = nextProps;
			dispatch(fetchBuildsIfNeeded(selectedOS));
			dispatch(fetchTestResultIfNeeded(selectedOS));
		}
	}

	handleRefreshClick(e) {
		e.preventDefault();

		const { dispatch, selectedOS } = this.props;
		dispatch(invalidateOS(selectedOS));
		dispatch(fetchBuildsIfNeeded(selectedOS));
		dispatch(invalidateResult(selectedOS));
		dispatch(fetchTestResultIfNeeded(selectedOS));
	}

	render() {
		const { selectedOS, builds, isFetching, lastUpdated, results, devices } = this.props;
		//const isEmpty = builds.length === 0;
		require("./Android.scss");
		return (
			<div>
				<p>
					{
						lastUpdated &&
						<span id="lastUpdate">
						Last updated at {new Date(lastUpdated).toLocaleTimeString()}. {" "}
						</span>
					}
					{
						!isFetching &&
						<a
							href="#"
							onClick={this.handleRefreshClick}
						>
						Refresh
						</a>
					}
				</p>
				{
					isFetching ? <h2>Loading...</h2>:
					<div>
					<InsideTabs
						buildJson={builds}
						osType={selectedOS}
						resultJson={results}
						deviceList={devices}
					/>
					</div>
				}
			</div>
		);
	}
}

Android.propTypes = {
	selectedOS: PropTypes.string.isRequired,
	builds: PropTypes.array.isRequired,
	isFetching: PropTypes.bool.isRequired,
	lastUpdated: PropTypes.number,
	dispatch: PropTypes.func.isRequired,
	results: PropTypes.array.isRequired,
	isFetchingResults: PropTypes.bool.isRequired,
	lastUpdatedResults: PropTypes.number,
	devices: PropTypes.array.isRequired
};

function mapStateToProps(state) {
	const { selectedOS, buildsByOS, resultsByOS } = state;
	const {
		isFetching,
		lastUpdated,
		items: builds
		} = buildsByOS[selectedOS] || {
			isFetching: true,
			items: []
		};

	const {
		isFetchingResults,
		lastUpdatedResults,
		resultItems: results,
		deviceList: devices
		} = resultsByOS[selectedOS] || {
			isFetchingResults: true,
			resultItems: [],
			deviceList: []
		};
	return {
		selectedOS,
		builds,
		isFetching,
		lastUpdated,
		isFetchingResults,
		lastUpdatedResults,
		results,
		devices
	};
}

export default connect(mapStateToProps)(Android);
