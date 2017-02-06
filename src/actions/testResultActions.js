import moment from "moment";
import request from "sync-request";

export const REQUEST_TESTRESULT = "REQUEST_TESTRESULT";
export const RECEIVE_TESTRESULT = "RECEIVE_TESTRESULT";
export const SELECT_OS = "SELECT_OS";
export const INVALIDATE_RESULT = "INVALIDATE_RESULT";

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

function requestTestResult(os) {
	return {
		type: REQUEST_TESTRESULT,
		os
	};
}


function receiveTestResult(os, resultJson, deviceList) {
	return {
		type: RECEIVE_TESTRESULT,
		os,
		resultArray: resultJson,
		deviceList,
		receiveAt: Date.now()
	};
}

function fetchWeekResult(os) {
	const res = request("GET", `/apiTestRuns?osType=${os}`);
	const jsonObj = JSON.parse(res.getBody());
	return jsonObj;
}

function mappedToDevices(deviceList, resultJson) {
	const finalResultJson = [];
	const deviceListLen = Object.keys(deviceList).length;
	const resultJsonLen = Object.keys(resultJson).length;
	let flag = 0;
	for (let i = 0, len = deviceListLen; i < len; i++) {
		for (let j = 0, len1 = resultJsonLen; j < len1; j++) {
			if (deviceList[i].deviceName === resultJson[j].deviceName) {
				finalResultJson.push({ id: resultJson[j].id, deviceName: deviceList[i].deviceName, deviceVersion: deviceList[i].deviceVersion, testCount: resultJson[j].TotalTestNo, date: resultJson[j].date, PassedTests: resultJson[j].PassedTests, FailedTests: resultJson[j].failedTests, deviceStatus: resultJson[j].deviceStatus });
				flag = flag + 1;
			}
		}
		if (flag === 0) {
			finalResultJson.push({ id: "", deviceName: deviceList[i].deviceName, deviceVersion: deviceList[i].deviceVersion, testCount: "", date: "", PassedTests: "", FailedTests: "", deviceStatus: "" });
		} else {
			flag = 0;
		}
	}
	return finalResultJson;
}
//create final Table json
function createFinalTable(result) {
	const finalTable = [];
	const date = [];
	let today = moment().format("L");
	today =(moment(today, "L").subtract(1, "days")).format("L");
	const startOfWeek =(moment(today, "L").subtract(7, "days")).format("L");

	while (today > startOfWeek) {
		date.push(today);
		today =(moment(today, "L").subtract(1, "days")).format("L");
	}
	let resultLen = Object.keys(result).length;

	const x = new Array(19);
	for (let i = 0; i < 18; i++) {
		x[i] = new Array(15);
	}
	for (let i = 0; i < 18; i++) {
		for (let j = 0; j < 13; j++) {
			x[i][j] = "";
		}
	}
	const runId = ["", "", "", "", "", "", ""];
	for (let i = 0; i < 18; i++) {
		for (let j = 0; j < 10; j++) {
			if (j === 0) {
				x[i][j] = i + 1;
			} else if (j === 1 || j === 2) {
				let k = 0;
				while (k < resultLen) {
					const tempName = result[k].deviceName;
					const tempDate = result[k].date;
					const tempCount = result[k].testCount;
					const tempPass = result[k].PassedTests;
					const tempRunId = result[k].id;
					const tempDeviceVersion = result[k].deviceVersion;
					if (x[i][j] !== tempName && x[i][j] !== "") {
						k = k + 1;
					} else {
						if (j === 2) {
						} else {
							x[i][j] = tempName;
							x[i][2] = tempDeviceVersion;
							x[i][j + 2] = tempCount;
							if (tempDate === date[0]) {
								x[i][j + 3] = tempPass;
								runId[0] = tempRunId;
								result.splice(k, 1);
								k = 0;
								resultLen = resultLen - 1;
							} else if (tempDate === date[1]) {
								x[i][j + 4] = tempPass;
								runId[1] = tempRunId;
								result.splice(k, 1);
								k = 0;
								resultLen = resultLen - 1;
							} else if (tempDate === date[2]) {
								x[i][j + 5] = tempPass;
								runId[2] = tempRunId;
								result.splice(k, 1);
								k = 0;
								resultLen = resultLen - 1;
							} else if (tempDate === date[3]) {
								x[i][j + 6] = tempPass;
								runId[3] = tempRunId;
								result.splice(k, 1);
								k = 0;
								resultLen = resultLen - 1;
							} else if (tempDate === date[4]) {
								x[i][j + 7] = tempPass;
								runId[4] = tempRunId;
								result.splice(k, 1);
								k = 0;
								resultLen = resultLen - 1;
							} else if (tempDate === date[5]) {
								x[i][j + 8] = tempPass;
								runId[5] = tempRunId;
								result.splice(k, 1);
								k = 0;
								resultLen = resultLen - 1;
							} else if (tempDate === date[6]) {
								x[i][j + 9] = tempPass;
								runId[6] = tempRunId;
								result.splice(k, 1);
								k = 0;
								resultLen = resultLen - 1;
							} else if (tempDate === "") {
								result.splice(k, 1);
								k = 0;
								resultLen = resultLen - 1;
							}
						}
					}
				}
			}
		}
	}
	for (let i = 0; i < 18; i++) {
		finalTable.push({ id: x[i][0], runId1: runId[0], runId2: runId[1], runId3: runId[2], runId4: runId[3], runId5: runId[4], runId6: runId[5], runId7: runId[6], deviceName: x[i][1], deviceVersion: x[i][2], testCount: x[i][3], Pass1: x[i][4], Pass2: x[i][5], Pass3: x[i][6], Pass4: x[i][7], Pass5: x[i][8], Pass6: x[i][9], Pass7: x[i][10] });
	}
	return finalTable;
}

function fetchDeviceList(os) {
 //  	fetch(`/apiDeviceList?osType=${os}`, {
	// 	method: "GET"
	// })
	// .then((response) => response.json())
	// .then((responseJson) => {
	// 	//console.log(responseJson, "dsdss");
	// 	return JSON.parse(responseJson);
	// });
	const res = request("GET", `/apiDeviceList?osType=${os}`);
	const jsonObj = JSON.parse(res.getBody());
	return jsonObj;
}

function fetchTestResults(os) {
	return (dispatch) => {
		//call requestBuilds
		dispatch(requestTestResult(os));

		let deviceList = [];
		let resultJson = [];
		let finalResultJson = [];

		//fetch all devices in the android group
		deviceList = fetchDeviceList(os);

		//fetch all weekly result
		resultJson = fetchWeekResult(os);

		//create mapped array to display
		finalResultJson = mappedToDevices(deviceList, resultJson);

		//create final Table json
		let finalTable = [];
		finalTable = createFinalTable(finalResultJson);
		dispatch(receiveTestResult(os, finalTable, deviceList));
	};
}

function shouldFetchTestResult(state, os) {
	const results = state.resultsByOS[os];
	//console.log(results);
	if (!results) {
		//console.log("hey");
		return true;
	}
	if (results.isFetchingResults) {
		return false;
	}
	return results.didInvalideResults;
}

export function fetchTestResultIfNeeded(os) {
	return (dispatch, getState) => {
		if (shouldFetchTestResult(getState(), os)) {
			return dispatch(fetchTestResults(os));
		}
	};
}
