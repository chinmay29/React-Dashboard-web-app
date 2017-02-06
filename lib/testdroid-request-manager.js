"use strict";

/************************************************************************
 *
 * Dependencies / Libraries
 *
 ************************************************************************/
exports = module.exports = {};
const rp = require("request-promise");
const log = require("./log");
const testdroidConfig = require("./testdroid-config");
const moment = require("moment");
const sleep = require("sleep");

/************************************************************************
 *
 * constiables / Constants
 *
 ************************************************************************/
//http://help.testdroid.com/customer/en/portal/articles/2018492-api-calls---authorization
let tokenExpiry;
const indentationCharacters = 2;
const TOKEN_REFRESH_THRESHOLD_SECONDS = 100;

//-- token / auth management
const oAuthURI = "/oauth/token";

let authToken = {
	access_token: null,
	token_type: null,
	refresh_token: null,
	expires_in: 1600,
	scope: null
};

const acquireTokenRequest = {
	form: {
		client_id: "testdroid-cloud-api",
		grant_type: "password",
		username: testdroidConfig.user,
		password: testdroidConfig.pass
	},
	uri: testdroidConfig.cloudURI + oAuthURI,
	method: "POST"
};

const refreshTokenRequest = {
	form: {
		client_id: "testdroid-cloud-api",
		grant_type: "refresh_token",
		refresh_token: null
	},
	uri: testdroidConfig.cloudURI + oAuthURI,
	method: "POST"
};

const jsonRequest = rp.defaults({
	json: true
});

exports.testdroidRequest = function req(options) {
	return new Promise((resolve, reject) => {
		//console.log("came here!");		//console.log(options.uri);
		if (!tokenExpiry) {
			console.log("token expiry is not set");
			jsonRequest(acquireTokenRequest).then((tokenResult) => {
				authToken = tokenResult;
				tokenExpiry = moment().add(authToken.expires_in, "seconds");
				console.log(`expires in${tokenExpiry}`);
				log.important(`Acquired oauth token:${JSON.stringify(authToken, null, indentationCharacters)}`);
				options.qs ? options.qs.access_token = authToken.access_token : options.qs = {
					access_token: authToken.access_token
				};
				//console.log(options);
				rp(options).then((result) => {
					//console.log(result);
					resolve(result);
				});
			})
			.catch((err) => {
				console.log(err);
				log.error(`Failed to acquired oauth token:${err}`);
				reject("failed to acquire token");
			});
		} else if (tokenExpiry.subtract(TOKEN_REFRESH_THRESHOLD_SECONDS, "seconds").isBefore(moment())) {
			console.log("token has expired");
			refreshTokenRequest.form.refresh_token = authToken.refresh_token;
			console.log("lets refresh token ");
			jsonRequest(refreshTokenRequest).then((tokenResult) => {
				authToken = tokenResult;
				sleep.sleep(3);

				tokenExpiry = moment().add(9000, "seconds");
				console.log(tokenExpiry);
				log.important(`Refreshed oauth token:${JSON.stringify(authToken, null, indentationCharacters)}`);
				options.qs ? options.qs.access_token = authToken.access_token : options.qs = {
					access_token: authToken.access_token
				};
				rp(options).then((result) => {
					resolve(result);
				});
			})
			.catch((err) => {
				console.log(err);
				log.error(`Failed to refresh oauth token:${err}`);
				reject("failed to acquire token");
			});
		} else {
			log.important(`Oauth token not expiring (not refreshing):${tokenExpiry.toString()}`);
			options.qs ? options.qs.access_token = authToken.access_token : options.qs = {
				access_token: authToken.access_token
			};
			rp(options).then((result) => {
				resolve(result);
			});
		}
	});
};
