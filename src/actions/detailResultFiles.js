import fetch from "isomorphic-fetch";

export const SELECT_OS = "SELECT_OS";
export const INVALIDATE_RESULT = "INVALIDATE_RESULT";
export const REQUEST_PERFORMANCE_DATA = "REQUEST_PERFORMANCE_DATA";
export const RECEIVE_PERFORMANCE_DATA = "RECEIVE_PERFORMANCE_DATA";
export const REQUEST_LOG_DATA = "REQUEST_LOG_DATA";
export const RECEIVE_LOG_DATA = "RECEIVE_LOG_DATA";
export const REQUEST_SCREENSHOT_DATA = "REQUEST_SCREENSHOT_DATA";
export const RECEIVE_SCREENSHOT_DATA = "RECEIVE_SCREENSHOT_DATA";
export const REQUEST_REPORT_FILE = "REQUEST_REPORT_FILE";
export const RECEIVE_REPORT_FILE = "RECEIVE_REPORT_FILE";

export function selectOS(os) {
	return {
		type: SELECT_OS,
		os
	};
}

export function invalidateResult(os) {
	return {
		type: INVALIDATE_RESULT,
		os
	};
}

function requestPerformanceData(os, runId) {
	return {
		type: REQUEST_PERFORMANCE_DATA,
		os,
		runId
	};
}

function receivePerformanceData(os, performanceFile) {
	return {
		type: RECEIVE_PERFORMANCE_DATA,
		os,
		performanceFile
	};
}

function requestLogData(os, runId) {
	return {
		type: REQUEST_LOG_DATA,
		os,
		runId
	};
}

function receiveLogData(os, logFile) {
	return {
		type: RECEIVE_LOG_DATA,
		os,
		logFile,
	};
}

function requestReportFile(os, date) {
	return {
		type: REQUEST_REPORT_FILE,
		os,
		date
	};
}

function receiveReportFile(os, reportFile) {
	return {
		type: RECEIVE_REPORT_FILE,
		os,
		reportFile
	};
}

function requestScreenshotData(os, runId) {
	return {
		type: REQUEST_SCREENSHOT_DATA,
		os,
		runId
	};
}

function receiveScreenshotData(os, screenshotFile) {
	return {
		type: RECEIVE_SCREENSHOT_DATA,
		os,
		screenshotFile
	};
}

export function fetchPerformanceData(os, runId) {
	return (dispatch) => {
		//dispath request
		dispatch(requestPerformanceData(os, runId));
		//fetch from server
		fetch(`/apiTestRunFiles?osType=${os}&runId=${runId}&params=performance`, {
			method: "GET"
		})
		.then((response) => response.json())
		.then((responseJson) => {
			dispatch(receivePerformanceData(os, responseJson.directUrl));
		});
	};
}

export function fetchLogData(os, runId) {
	return (dispatch) => {
		//dispath request
		dispatch(requestLogData(os, runId));

		fetch(`/apiTestRunFiles?osType=${os}&runId=${runId}&params=logs`, {
			method: "GET"
		})
		.then((response) => response.json())
		.then((responseJson) => {
			dispatch(receiveLogData(os, responseJson.directUrl));
		});
	};
}

export function fetchScreenshotData(os, runId) {
	return (dispatch) => {
		//dispath request
		dispatch(requestScreenshotData(os, runId));

		fetch(`/apiTestRunFiles?osType=${os}&runId=${runId}&params=screenshots`, {
			method: "GET"
		})
		.then((response) => response.json())
		.then((responseJson) => {
			dispatch(receiveScreenshotData(os, responseJson.directUrl));
		});
	};
}

export function fetchReportFile(os, date) {
	return (dispatch) => {
		//dispath request
		dispatch(requestReportFile(os, date));
		fetch(`/apiReportFile?os=${os}&date=${date}`, {
			method: "GET"
		})
		.then((response) => response.text())
		.then((reportFile) => {
			dispatch(receiveReportFile(os, reportFile));
		});
		// dispatch(receiveReportFile(os, reportFile));
	};
}
