export const REQUEST_STAGING = "REQUEST_STAGING";
export const REQUEST_PRODUCTION = "REQUEST_PRODUCTION";
export const RECEIVE_STAGING = "RECEIVE_STAGING";
export const RECEIVE_PRODUCTION = "RECEIVE_PRODUCTION";
export const INVALIDATE_STAGING = "INVALIDATE_STAGING";
export const INVALIDATE_PRODUCTION = "INVALIDATE_PRODUCTION";

export function invalidateStaging() {
	return {
		type: INVALIDATE_STAGING,
	};
}

export function invalidateProduction() {
	return {
		type: INVALIDATE_STAGING,
	};
}

function requestStagingResult() {
	return {
		type: REQUEST_STAGING,
	};
}

function requestProductionResult() {
	return {
		type: REQUEST_PRODUCTION,
	};
}

function receiveStagingResult(stagingResult) {
	return {
		type: RECEIVE_STAGING,
		stagingResult,
		receiveAt: Date.now()
	};
}

function receiveProductionResult(productionResult) {
	return {
		type: RECEIVE_PRODUCTION,
		productionResult,
		receiveAt: Date.now()
	};
}

function fetchStagingResults() {
	return (dispatch) => {
		dispatch(requestStagingResult());
		fetch("/apiStudioResults?env=staging", {
			method: "GET"
		})
		.then((response) => response.json())
		.then((responseJson) => {
			dispatch(receiveStagingResult(responseJson));
		});
	};
}

function fetchProductionResults() {
	return (dispatch) => {
		//call requestBuilds
		dispatch(requestProductionResult());
		fetch("/apiStudioResults?env=prod", {
			method: "GET"
		})
		.then((response) => response.json())
		.then((responseJson) => {
			dispatch(receiveProductionResult(responseJson));
		});
	};
}

function shouldFetchStagingResult(state) {
	const results = state.studioByEnv;
	if (results.isFetchingStaging) {
		return false;
	}
	return results.didInvalideStaging;
}

export function fetchStagingResultIfNeeded() {
	return (dispatch, getState) => {
		if (shouldFetchStagingResult(getState())) {
			return dispatch(fetchStagingResults());
		}
	};
}

function shouldFetchProductionResult(state) {
	const results = state.studioByEnv;
	if (results.isFetchingProduction) {
		return false;
	}
	return results.didInvalideProduction;
}

export function fetchProductionResultIfNeeded() {
	return (dispatch, getState) => {
		if (shouldFetchProductionResult(getState())) {
			return dispatch(fetchProductionResults());
		}
	};
}
