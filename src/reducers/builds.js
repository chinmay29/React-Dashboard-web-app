import {
  INVALIDATE_OS,
  REQUEST_BUILDS, RECEIVE_BUILDS
} from "../actions/buildActions";

function builds(state = {
	isFetching: false,
	didInvalide: false,
	items: []
}, action) {
	switch (action.type) {
		case INVALIDATE_OS:
			return Object.assign({}, state, {
				didInvalide: true
			});
		case REQUEST_BUILDS:
			return Object.assign({}, state, {
				isFetching: true,
				didInvalide: false
			});
		case RECEIVE_BUILDS:
			return Object.assign({}, state, {
				isFetching: false,
				didInvalide: false,
				items: action.buildArray,
				lastUpdated: action.receiveAt
			});
		default:
			return state;
	}
}

export default function buildsByOS(state = { }, action) {
	switch (action.type) {
		case INVALIDATE_OS:
		case RECEIVE_BUILDS:
		case REQUEST_BUILDS:
			return Object.assign({}, state, {
				[action.os]: builds(state[action.os], action)
			});
		default:
			return state;
	}
}
