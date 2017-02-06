"use strict";

/************************************************************************
 *
 * Dependencies / Libraries
 *
 ************************************************************************/
//https://www.npmjs.com/package/chalk
const chalk = require("chalk");
const moment = require("moment");
exports = module.exports = {};

let logTimeStampsEnabled = true;

/************************************************************************
 *
 * Functions
 *
 ************************************************************************/

function prependTimestamp(msg) {
	return logTimeStampsEnabled ? `[ ${moment().toString()} ]: ${msg}` : msg;
}

/************************************************************************
 *
 * Module Exports
 *
 ************************************************************************/

//TODO - setup log levels again
//TODO - maybe return Log as an object w/ a constructor in order to cleanly set log levels
exports.enableTimestamps = function timeStamp(trueOrFalse) {
	logTimeStampsEnabled = !!trueOrFalse;
};
exports.debug = function debug(msg) {
	console.log(prependTimestamp(msg));
};
exports.info = function info(msg) {
	console.log(prependTimestamp(msg));
};
exports.important = function imp(msg) {
	console.log(chalk.bold.green(prependTimestamp(msg)));
};
exports.warn = function warn(msg) {
	console.warn(chalk.bold.bgYellow(prependTimestamp(msg)));
};
exports.error = function error(msg) {
	console.error(chalk.red.bold(`stderr: ${prependTimestamp(msg)}`));
};

