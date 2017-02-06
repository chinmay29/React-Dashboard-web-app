import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import StudioResult from "../../components/StudioResult/StudioResult";
import { selectOS } from "../../actions/buildActions";
import { invalidateStaging, invalidateProduction, fetchStagingResultIfNeeded, fetchProductionResultIfNeeded } from "../../actions/studioResultActions";

export class Studio extends Component {
	constructor(props) {
		super(props);
		this.handleRefreshClick = this.handleRefreshClick.bind(this);
	}
	componentWillMount() {
		const { dispatch } = this.props;
		dispatch(selectOS("studio"));
	}
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(fetchStagingResultIfNeeded("Staging"));
		dispatch(fetchProductionResultIfNeeded("Prod"));
	}
	handleRefreshClick(e) {
		e.preventDefault();

		const { dispatch } = this.props;
		dispatch(invalidateStaging());
		dispatch(invalidateProduction());
		dispatch(fetchStagingResultIfNeeded("Staging"));
		dispatch(fetchProductionResultIfNeeded("Prod"));
	}
	render() {
		const { isFetchingStaging, stagingResult, productionResult, lastUpdated } = this.props;
		//const isEmptyStaging = stagingResult.length === 0;
		require("./Studio.scss");
		return (
			<div>
				<p>
					{
						lastUpdated &&
						<span id="lastUpdated">
						Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
						{" "}
						</span>
					}
					{
						!isFetchingStaging &&
						<a
							href="#"
							onClick={this.handleRefreshClick}
						>
						Refresh
						</a>
					}
				</p>
					{
					isFetchingStaging ? <h4>Loading STAGING AND PRODUCTION Test results...</h4> :
					<div>
					<StudioResult stagingResult={stagingResult} productionResult={productionResult} />
					</div>

				}
			</div>
		);
	}
}

Studio.propTypes = {
	selectedOS: PropTypes.string.isRequired,
	lastUpdated: PropTypes.number,
	dispatch: PropTypes.func.isRequired,
	stagingResult: PropTypes.array.isRequired,
	productionResult: PropTypes.array.isRequired,
	isFetchingStaging: PropTypes.bool.isRequired,
	isFetchingProduction: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
	const { selectedOS, studioByEnv } = state;
	const {
		isFetchingStaging,
		isFetchingProduction,
		lastUpdatedResults: lastUpdated,
		stagingResult,
		productionResult
	} = studioByEnv;
	return {
		selectedOS,
		isFetchingStaging,
		isFetchingProduction,
		stagingResult,
		productionResult,
		lastUpdated
	};
}

export default connect(mapStateToProps)(Studio);
