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

exports.getDevices = function devices(osType) {

	//Uncomment this to use a default device (see testdroid-config)
  // return new Promise(function(resolve, reject) {
  // 	resolve({});
  // });
	const getDeviceGroupURI = "/api/v2/me/device-groups";
	let deviceGroup;
	if (osType === "Android") {
		deviceGroup = testdroidConfig.androidDeviceGroupId;
	} else {
		deviceGroup = testdroidConfig.iosDeviceGroupId;
		//console.log(deviceGroup);
	}

	const getDevicesInGroupURI = `${getDeviceGroupURI}/${deviceGroup}/devices`;

	const devicesPromise = new Promise((resolve, reject) => {
		const options = {
			uri: `${testdroidConfig.cloudURI}${getDevicesInGroupURI}`,
			json: true
		};

		requestManager.testdroidRequest(options)
		.then((deviceData) => {
			//console.log(deviceData.data);
			//log.info(deviceData.data.length + " devices in group");
			resolve(deviceData.data);
		})
		.catch((err) => {
			//log.error("Could not get devices: " + JSON.stringify(err, null, 2));
			reject(err);
		});
	});
	return devicesPromise;
};
