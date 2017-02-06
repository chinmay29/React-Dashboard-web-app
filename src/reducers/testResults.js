import {
  INVALIDATE_RESULT,
  REQUEST_TESTRESULT, RECEIVE_TESTRESULT
} from "../actions/testResultActions";


function results(state = {
	isFetchingResults: false,
	didInvalideResults: false,
	resultItems: []
}, action) {
	switch (action.type) {
		case INVALIDATE_RESULT:
			return Object.assign({}, state, {
				didInvalideResults: true
			});
		case REQUEST_TESTRESULT:
			return Object.assign({}, state, {
				isFetchingResults: true,
				didInvalideResults: false
			});
		case RECEIVE_TESTRESULT:
			return Object.assign({}, state, {
				isFetchingResults: false,
				didInvalideResults: false,
				resultItems: action.resultArray,
				lastUpdatedResults: action.receiveAt,
				deviceList: action.deviceList
			});
		default:
			return state;
	}
}

export default function resultsByOS(state = {
	isFetchingResults: false,
	resultItems: [],
	deviceList: []
}, action) {
	switch (action.type) {
		case INVALIDATE_RESULT:
		case RECEIVE_TESTRESULT:
		case REQUEST_TESTRESULT:
			return Object.assign({}, state, {
				[action.os]: results(state[action.os], action)
			});
		default:
			return state;
	}
}
