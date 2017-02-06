"use strict";

/************************************************************************
 *
 * Dependencies / Libraries
 *
 ************************************************************************/
const Promise = require("bluebird");
exports = module.exports = {};
const testdroidConfig = require("./testdroid-config");
const requestManager = require("./testdroid-request-manager");

/************************************************************************
 *
 * constiables / Constants
 *
 ************************************************************************/
const getProjectURI = "/api/v2/me/projects/";

exports.getTestRunPerformance = function testRunPerfomance(osType, runId) {
	let projectId;
	if (osType === "Android") {
		projectId = testdroidConfig.androidProjectId;
	} else {
		projectId = testdroidConfig.iosProjectId;
	}
	const runsPromise = new Promise((resolve, reject) => {
		const options = {
			uri: `${testdroidConfig.cloudURI}${getProjectURI}${projectId}/runs/${runId}/performance.zip`,
			json: true,
			method: "POST"
		};

		requestManager.testdroidRequest(options)
		.then((runsData) => {
			//log.info(deviceData.data.length + " devices in group");
			//console.log(runsData);
			resolve(runsData);
		})
		.catch((err) => {
			//log.error("Could not get devices: " + JSON.stringify(err, null, 2));
			reject(err);
		});
	});
	return runsPromise;
};

exports.getTestRunLogs = function testRunLogs(osType, runId) {
	let projectId;
	if (osType === "Android") {
		projectId = testdroidConfig.androidProjectId;
	} else {
		projectId = testdroidConfig.iosProjectId;
	}
	const runsPromise = new Promise((resolve, reject) => {
		const options = {
			uri: `${testdroidConfig.cloudURI}${getProjectURI}${projectId}/runs/${runId}/logs.zip`,
			json: true,
			method: "POST"
		};

		requestManager.testdroidRequest(options)
		.then((runsData) => {
			//log.info(deviceData.data.length + " devices in group");
			//console.log(runsData);
			resolve(runsData);
		})
		.catch((err) => {
			//log.error("Could not get devices: " + JSON.stringify(err, null, 2));
			reject(err);
		});
	});
	return runsPromise;
};

exports.getTestRunScreenshots = function testRunScreenshots(osType, runId) {
	let projectId;
	if (osType === "Android") {
		projectId = testdroidConfig.androidProjectId;
	} else {
		projectId = testdroidConfig.iosProjectId;
	}
	const runsPromise = new Promise((resolve, reject) => {
		const options = {
			uri: `${testdroidConfig.cloudURI}${getProjectURI}${projectId}/runs/${runId}/screenshots.zip`,
			json: true,
			method: "POST"
		};

		requestManager.testdroidRequest(options)
		.then((runsData) => {
			//log.info(deviceData.data.length + " devices in group");
			//console.log(runsData);
			resolve(runsData);
		})
		.catch((err) => {
			//log.error("Could not get devices: " + JSON.stringify(err, null, 2));
			reject(err);
		});
	});
	return runsPromise;
};

exports.getTestRunSummary = function testRunSummary(osType, runId) {
	let projectId;
	if (osType === "Android") {
		projectId = testdroidConfig.androidProjectId;
	} else {
		projectId = testdroidConfig.iosProjectId;
	}
	const runsPromise = new Promise((resolve, reject) => {
		const options = {
			uri: `${testdroidConfig.cloudURI}${getProjectURI}${projectId}/runs/${runId}/reports/summary?type=PDF`,
			json: true,
			method: "GET"
		};

		requestManager.testdroidRequest(options)
		.then((runsData) => {
			//log.info(deviceData.data.length + " devices in group");
			//console.log(runsData);
			resolve(runsData);
		})
		.catch((err) => {
			//log.error("Could not get devices: " + JSON.stringify(err, null, 2));
			reject(err);
		});
	});
	return runsPromise;
};
