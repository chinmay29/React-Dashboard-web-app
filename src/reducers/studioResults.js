import {
  INVALIDATE_STAGING, INVALIDATE_PRODUCTION, REQUEST_STAGING, REQUEST_PRODUCTION, RECEIVE_STAGING, RECEIVE_PRODUCTION
} from "../actions/studioResultActions";


function fetchStudio(state = {
	isFetchingStaging: false,
	didInvalideStaging: false,
	isFetchingProduction: false,
	didInvalideProduction: false,
	stagingResult: [],
	productionResult: []
}, action) {
	switch (action.type) {
		case INVALIDATE_STAGING:
			return Object.assign({}, state, {
				didInvalideStaging: true
			});
		case INVALIDATE_PRODUCTION:
			return Object.assign({}, state, {
				didInvalideProduction: true
			});
		case REQUEST_STAGING:
			return Object.assign({}, state, {
				isFetchingStaging: true,
				didInvalideStaging: false
			});
		case REQUEST_PRODUCTION:
			return Object.assign({}, state, {
				isFetchingProduction: true,
				didInvalideProduction: false
			});
		case RECEIVE_STAGING:
			// const out = [];
			// action.stagingResult.forEach((results) => {
			// 	out.push(results);
			// })
			// console.log("stagingResult", out);
			return Object.assign({}, state, {
				isFetchingStaging: false,
				didInvalideStaging: false,
				stagingResult: action.stagingResult,
				lastUpdatedResults: action.receiveAt,
			});
		case RECEIVE_PRODUCTION:
			return Object.assign({}, state, {
				isFetchingProduction: false,
				didInvalideProduction: false,
				productionResult: action.productionResult,
				lastUpdatedResults: action.receiveAt,
			});
		default:
			return state;
	}
}

export default function studioByEnv(state = {
	isFetchingStaging: false,
	isFetchingProduction: false,
	didInvalideProduction: true,
	didInvalideStaging: true,
	stagingResult: [],
	productionResult: []
}, action) {
	switch (action.type) {
		case INVALIDATE_STAGING:
		case INVALIDATE_PRODUCTION:
		case RECEIVE_STAGING:
		case REQUEST_STAGING:
		case RECEIVE_PRODUCTION:
		case REQUEST_PRODUCTION:
			return Object.assign({}, state, fetchStudio(state, action));
		default:
			return state;
	}
}
