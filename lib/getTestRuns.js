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

exports.getTestRuns = function testRuns(osType) {

	//Uncomment this to use a default device (see testdroid-config)
  // return new Promise(function(resolve, reject) => {
  // 	resolve({});
  // });
	console.log(osType);
	let projectId;
	if (osType === "Android") {
		projectId = testdroidConfig.androidProjectId;
	} else {
		projectId = testdroidConfig.iosProjectId;
	}
	const runsPromise = new Promise((resolve, reject) => {
		const options = {
			uri: `${testdroidConfig.cloudURI}${getProjectURI}${projectId}/runs`,
			json: true
		};

		requestManager.testdroidRequest(options)
		.then((runsData) => {
			//log.info(deviceData.data.length + " devices in group");
			resolve(runsData.data);
		})
		.catch((err) => {
			//log.error("Could not get devices: " + JSON.stringify(err, null, 2));
			reject(err);
		});
	});
	return runsPromise;
};

exports.getRunInfo = (osType, runId) => {
	let projectId;
	if (osType === "Android") {
		projectId = testdroidConfig.androidProjectId;
	} else {
		projectId = testdroidConfig.iosProjectId;
	}
	const runInfoPromise = new Promise((resolve, reject) => {
		const options = {
			uri: `${testdroidConfig.cloudURI}${getProjectURI}${projectId}/runs/${runId}/device-runs/`,
			json: true
		};

		requestManager.testdroidRequest(options)
		.then((runsData) => {
			//log.info(deviceData.data.length + " devices in group");
			resolve(runsData.data);
		})
		.catch((err) => {
			//log.error("Could not get devices: " + JSON.stringify(err, null, 2));
			reject(err);
		});
	});
	return runInfoPromise;
};
