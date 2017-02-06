"use strict";

/************************************************************************
 *
 * Dependencies / Libraries
 *
 ************************************************************************/
exports = module.exports = {};

/************************************************************************
 *
 * constiables / Constants
 *
 ************************************************************************/
const testdroidProjectConfig = require("./testdroid_project_config");
const TESTDROID_CREDS_FILE = "./testdroid_credentials.json";
let testdroidCreds;

try {
	testdroidCreds = require(TESTDROID_CREDS_FILE);
} catch (err) {
	const errMsg = `Could not read ${TESTDROID_CREDS_FILE} Make sure it exists and is properly constructed.  See the example file for details on how to make a valid crendtials file.`;
	throw errMsg;
}

/************************************************************************
 *
 * Module exports
 *
 ************************************************************************/

exports.user = testdroidCreds.user;
exports.pass = testdroidCreds.pass;
exports.encodedUserPass = new Buffer(`${testdroidCreds.user}:${testdroidCreds.pass}`).toString("base64");

//These should "never" change, so not going to put them in config files
exports.appiumUploadURI = "http://appium.testdroid.com/upload";
exports.appiumURI = "http://appium.testdroid.com/wd/hub";
exports.cloudURI = "https://cloud.testdroid.com";
exports.androidProjectId = testdroidProjectConfig.android.projectId;
exports.androidDeviceGroupId = testdroidProjectConfig.android.deviceGroupId;
exports.defaultAndroidDevice = "LG Google Nexus 5X 6.0";
exports.iosProjectId = testdroidProjectConfig.ios.projectId;
exports.iosDeviceGroupId = testdroidProjectConfig.ios.deviceGroupId;
