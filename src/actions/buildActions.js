export const REQUEST_BUILDS = "REQUEST_BUILDS";
export const RECEIVE_BUILDS = "RECEIVE_BUILDS";
export const SELECT_OS = "SELECT_OS";
export const INVALIDATE_OS = "INVALIDATE_OS";

export function selectOS(os) {
	return {
		type: SELECT_OS,
		os
	};
}

export function invalidateOS(os) {
	return {
		type: INVALIDATE_OS,
		os
	};
}

function requestBuilds(os) {
	return {
		type: REQUEST_BUILDS,
		os
	};
}


function receiveBuilds(os, json) {
	return {
		type: RECEIVE_BUILDS,
		os,
		buildArray: json,
		receiveAt: Date.now()
	};
}

function fetchBuilds(os) {
	return (dispatch) => {
		//call requestBuilds
		dispatch(requestBuilds(os));
		fetch(`/apiDailyBuilds?os=${os}`, {
			method: "GET"
		})
		.then((response) => response.json())
		.then((buildJson) => {
			////console.log(responseJson);
			dispatch(receiveBuilds(os, buildJson));
		});
	};
}

function shouldFetchBuilds(state, os) {
	const builds = state.buildsByOS[os];
	if (!builds) {
		return true;
	}
	if (builds.isFetching) {
		return false;
	}
	return builds.didInvalide;
}

export function fetchBuildsIfNeeded(os) {
	////console.log("OS:" + os);
	return (dispatch, getState) => {
		if (shouldFetchBuilds(getState(), os)) {
			return dispatch(fetchBuilds(os));
		}
	};
}
