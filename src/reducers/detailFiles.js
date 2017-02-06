import { REQUEST_PERFORMANCE_DATA, RECEIVE_PERFORMANCE_DATA,
         REQUEST_LOG_DATA, RECEIVE_LOG_DATA,
         REQUEST_SCREENSHOT_DATA, RECEIVE_SCREENSHOT_DATA, REQUEST_REPORT_FILE, RECEIVE_REPORT_FILE }
         from "../actions/detailResultFiles";

function fetchFile(state = {
	isFetchingFile: false,
	didInvalideFile: false,
	logFile: "",
	performanceFile: "",
	screenshotFile: "",
	reportFile: ""
}, action) {
	switch (action.type) {
		case REQUEST_PERFORMANCE_DATA:
			return Object.assign({}, state, {
				isFetchingFile: true,
				didInvalideFile: false
			});
		case RECEIVE_PERFORMANCE_DATA:
			return Object.assign({}, state, {
				performanceFile: action.performanceFile,
			});
		case REQUEST_LOG_DATA:
			return Object.assign({}, state, {
				isFetchingFile: true,
				didInvalideFile: false
			});
		case RECEIVE_LOG_DATA:
			return Object.assign({}, state, {
				logFile: action.logFile,
			});
		case REQUEST_SCREENSHOT_DATA:
			return Object.assign({}, state, {
				isFetchingFile: true,
				didInvalideFile: false
			});
		case RECEIVE_SCREENSHOT_DATA:
			return Object.assign({}, state, {
				screenshotFile: action.screenshotFile,
			});
		case REQUEST_REPORT_FILE:
			return Object.assign({}, state, {
				isFetchingFile: true,
				didInvalideFile: false
			});
		case RECEIVE_REPORT_FILE:
			return Object.assign({}, state, {
				reportFile: action.reportFile,
			});
		default:
			return state;
	}
}
export default function detailFiles(state = { }, action) {
	switch (action.type) {
		case RECEIVE_PERFORMANCE_DATA:
		case REQUEST_PERFORMANCE_DATA:
		case RECEIVE_LOG_DATA:
		case REQUEST_LOG_DATA:
		case RECEIVE_SCREENSHOT_DATA:
		case REQUEST_SCREENSHOT_DATA:
		case RECEIVE_REPORT_FILE:
		case REQUEST_REPORT_FILE:
			return Object.assign({}, state, {
				[action.os]: fetchFile(state[action.os], action)
			});
		default:
			return state;
	}
}
