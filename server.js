/*jshint loopfunc: true */
"use strict";
const webpack = require("webpack");
const _ = require("lodash");
const moment = require("moment");
const sleep = require("sleep");
const path = require("path");
const express = require("express");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const AWS = require("aws-sdk");
const async = require("async");
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({
	changeOrigin: true
});
/*
Importing our lib modules for testdroid
*/
const deviceFinder = require("./lib/device-finder");
const testRuns = require("./lib/getTestRuns");
const testRunFiles = require("./lib/getTestRunFiles");
/*
Express set up
*/
// const configOpt = process.argv[2];
// let config;
// if (configOpt === "prod") {
// 	config = require("./prod.config");
// } else {
// 	config = require("./dev.config");
// }

const app = express();

const isProduction = process.env.NODE_ENV === "production";
const port = isProduction ? process.env.PORT : 7000;
const publicPath = path.resolve(__dirname, "public");

// We point to our static assets
app.use(express.static(publicPath));

// We only want to run the workflow when not in production
if (!isProduction) {

  // We require the bundler inside the if block because
  // it is only needed in a development environment. Later
  // you will see why this is a good idea
  var bundle = require("./server/bundle.js");
  bundle();

  // Any requests to localhost:3000/build is proxied
  // to webpack-dev-server
  app.all("/build/*", function (req, res) {
    proxy.web(req, res, {
        target: "http://localhost:7000"
    });
  });

}

app.get("/", (req, res) => {
	res.sendFile(`${__dirname}/index.html`);
});

function createJsonList(devices) {
	const deviceList = [];
	_.forEach(devices, (device) => {
		deviceList.push({ deviceName: device.displayName, deviceOS: device.osType, deviceVersion: device.softwareVersion.releaseVersion });
	});
	return deviceList;
}

app.get("/apiDeviceList", (req, res) => {
	const osType = req.query.osType;
	deviceFinder.getDevices(osType)
	.then((deviceList) => {
		const deviceList1 = createJsonList(deviceList);
		res.setHeader("Content-Type", "application/json");
		res.json(deviceList1);
	});
});

app.get("/apiReportFile", (req, res) => {
	const os = req.query.os;
	const date = req.query.date;
	AWS.config.update({ accessKeyId: "", secretAccessKey: "" });
	const s3 = new AWS.S3();

	if (os === "Android") {
		const params1 = { Bucket: "ap-builds", Key: `${os}/${date}-android-report.json`, Expires: 365 * 1000 };
		s3.getSignedUrl("getObject", params1, (err, url) => {
			res.send(url);
		});
	} else {
		const params2 = { Bucket: "ap-builds", Key: `${os}/${date}-ios-report.json`, Expires: 365 * 1000 };
		s3.getSignedUrl("getObject", params2, (err, url) => {
			res.send(url);
		});
	}
});

app.get("/apiDailyBuilds", (req, res) => {
	const os = req.query.os;
	AWS.config.update({ accessKeyId: "", secretAccessKey: "" });
	const s3 = new AWS.S3();
	const buildJson = [];
	// let jsonContentIOS
	// let jsonContentAndroid;
	// //fetch android version
	// s3.getObject(
	// 	{ Bucket: "ap-builds", Key: "Android/"+today+"-AndroidVersion.json" },
	// 	function (error, data) {
	// 		if (error != null) {
	// 			console.log("error");
	// 		} else {
	// 			jsonContentAndroid = JSON.parse(data.Body);
	// 			return jsonContentAndroid;
	// 		}
	// 	}
	// )
	// //fetch ios version
	// s3.getObject(
	// 	{ Bucket: "ap-builds", Key: "IOS/"+today+"-IOSVersion.json" },
	// 	function (error, data) {
	// 		if (error != null) {
	// 			console.log("error");
	// 		} else {
	// 			jsonContentIOS = JSON.parse(data.Body);
	// 			return jsonContentIOS;
	// 		}
	// 	}
	// )

	//retrieve version name from json file.
	// const androidVersion = jsonContentAndroid.Android;
	// const iosVersion = jsonContentIOS.IOS;
	//
	//
	// version = iosVersion.split(" = ");
	// const version2 = version[1].split(";")
	// iosVersionToday = version2[0];
	//
	// version1 = androidVersion.split(" ");
	// androidVersionToday = version1[1];

	//constiables for loop
	let i = 1;
	const days = [];
	let today = moment().format("YYYY-MM-DD");
	today = moment(today, "YYYY-MM-DD").subtract(1, "days");
	today = today.format("YYYY-MM-DD");
	const firstDateBuild = moment().format("2016-03-21");
	//
	while (today > firstDateBuild) {
		days.push(today);
		today = moment(today, "YYYY-MM-DD").subtract(1, "days");
		today = today.format("YYYY-MM-DD");
	}
	if (os === "Android") {
		async.each(days, (day, cb) => {
			const params1 = { Bucket: "ap-builds", Key: `${os}/${day}-app-press-now.apk`, Expires: 365 * 1000 };
			s3.getSignedUrl("getObject", params1, (err, url) => {
				if (err) {
					return cb(err);
				}
				if (!err) {
					buildJson.push({ id: i, Date: day, AppVersion: "1.14.1", buildUrl: url });
					i = i + 1;
					cb();
				}
			});
		}, (err) => {
			console.log(err);
			res.json(buildJson);
		});
	} else {
		async.each(days, (day, cb) => {
			const params1 = { Bucket: "ap-builds", Key: `${os}/${day}-app-press-now.ipa`, Expires: 365 * 1000 };
			s3.getSignedUrl("getObject", params1, (err, url) => {
				if (err) {
					return cb(err);
				}
				if (!err) {
					buildJson.push({ id: i, Date: day, AppVersion: "1.14.1", buildUrl: url });
					i = i + 1;
					cb();
				}
			});
		}, (err) => {
			console.log(err);
			res.json(buildJson);
		});
	}
});

app.get("/apiStudioResults", (req, res) => {
	const env = req.query.env;
	console.log(env);
	AWS.config.update({ accessKeyId: "", secretAccessKey: "" });
	const s3 = new AWS.S3();
	const stagingResult = [];
	const productionResult = [];
	const days = [];
	let today = moment().format("YYYY-MM-DD");
	today = moment(today, "YYYY-MM-DD").subtract(1, "days");
	today = today.format("YYYY-MM-DD");
	let startOfWeek = moment(today, "YYYY-MM-DD").subtract(7, "days");
	startOfWeek = startOfWeek.format("YYYY-MM-DD");

	while (today > startOfWeek) {
		days.push(today);
		today = moment(today, "YYYY-MM-DD").subtract(1, "days");
		today = today.format("YYYY-MM-DD");
	}
	console.log(days);
	if (env === "staging") {
		async.each(days, (day, cb) => {
			const params = { Bucket: "ap-builds", Key: `studio/${day}-staging-chrome-windows.json` };
			s3.getObject(params, (err, data) => {
				if (err) {
					return cb(err);
				}
				if (!err) {
					const fileContents = data.Body.toString();
					const json = JSON.parse(fileContents);
					stagingResult.push({ date: json.testsuites.testsuite.timestamp, tests: json.testsuites.tests, testArray: json.testsuites.testsuite.testcase, errors: json.testsuites.errors });
					cb();
				}
			});
		}, (err) => {
			console.log(err);
			res.json(stagingResult);
		});
	} else {
		async.each(days, (day, cb) => {
			const params = { Bucket: "ap-builds", Key: `studio/${day}-prod-chrome-windows.json` };
			s3.getObject(params, (err, data) => {
				if (err) {
					return cb(err);
				}
				if (!err) {
					const fileContents = data.Body.toString();
					const json = JSON.parse(fileContents);
					productionResult.push({ date: json.testsuites.testsuite.timestamp, tests: json.testsuites.tests, testArray: json.testsuites.testsuite.testcase, errors: json.testsuites.errors });
					cb();
				}
			});
		}, (err) => {
			console.log(err);
			res.json(productionResult);
		});
	}
});

app.get("/apiTestRunFiles", (req, res) => {
	const osType = req.query.osType;
	const runId = req.query.runId;
	const params = req.query.params;
	console.log(params);
	if (params === "performance") {
		testRunFiles.getTestRunPerformance(osType, runId)
		.then((performanceData) => {
			sleep.sleep(1);
			console.log(performanceData);
			res.setHeader("Content-Type", "application/json");
			res.json(performanceData);
		});
	} else if (params === "logs") {
		testRunFiles.getTestRunLogs(osType, runId)
		.then((logs) => {
			console.log(logs);
			res.setHeader("Content-Type", "application/json");
			res.json(logs);
		});
	} else if (params === "screenshots") {
		testRunFiles.getTestRunScreenshots(osType, runId)
		.then((screenshots) => {
			console.log(screenshots);
			res.setHeader("Content-Type", "application/json");
			res.json(screenshots);
		});
	}
});

//create json object with all run id.s
function createJsonTestRuns(runs) {
	const runIdArray = [];
	let today = moment().format("YYYY-MM-DD");
	today = (moment(today, "YYYY-MM-DD").subtract(1, "days")).format("YYYY-MM-DD");
	let startOfWeek = moment(today, "YYYY-MM-DD").subtract(7, "days");
	startOfWeek = startOfWeek.format("YYYY-MM-DD");
	//const days = [];
	// while (today > startOfWeek) {
	// 	days.push(today);
	// 	today = moment(today, "YYYY-MM-DD").subtract(1, "days");
	// 	today = today.format("YYYY-MM-DD");
	// }
	while (today > startOfWeek) {
		const test = loop(runs, today);
		if (test[0] !== undefined) {
			runIdArray.push(test[0]);
		}
		today = moment(today, "YYYY-MM-DD").subtract(1, "days");
		today = today.format("YYYY-MM-DD");
	}
	//console.log(runIdArray);
	return runIdArray;

}

function loop(runs, today) {
	const todayString = moment(today).toString();
	const runIdArray = [];
	//going through each test run data in last seven days
	_.forEach(runs, (run) => {
		const displayName = run.displayName;
		const res = displayName.substring(12, 27);
		if (todayString.includes(res) && run.testCaseCount > 20) {
			runIdArray.push({ Id: run.id, date: moment(today).format("L") });
		}
	});
	return runIdArray;
}

app.get("/apiTestRuns", (req, res) => {
	const osType = req.query.osType;
	const runInfoJson = [];
	//getting run id for last 7 days test runs with number of test greater than 35.
	testRuns.getTestRuns(osType).then((runs) => {
		sleep.sleep(2);
		//console.log(runs);
		const runIdArray = createJsonTestRuns(runs);
		let runLength = Object.keys(runIdArray).length;
		const keys = Object.keys(runIdArray);
		const onComplete = function onComplete() {
			res.setHeader("Content-Type", "application/json");
			res.json(runInfoJson);
			//  return runInfoJson
		};
		if (runLength === 0) {
			onComplete();
		} else {
			keys.forEach((key) => {
				const id = runIdArray[key].Id;
				testRuns.getRunInfo(osType, id)
				.then((result) => {
					if (result[0].deviceName === "Apple iPhone 6S plus") {
						//console.log("iphone 6s plus")
						result[0].deviceName = "Apple iPhone 6S Plus A1687 9.2";
					}
					if (result[0].deviceName === "Apple iPhone 6S 9.2.1") {
						//console.log("iphone 6s")
						result[0].deviceName = "Apple iPhone 6S A1688 9.2.1";
					}
					if (result[0].deviceName === "Samsung Google Nexus 10 GT-P8110") {
						result[0].deviceName = "Samsung Google Nexus 10 GT-P8110 5.1.1";
					}
					if (result[0].deviceName === "LG Google Nexus 5X 6.0.1" || result[0].deviceName === "LGE Nexus 5X") {
						result[0].deviceName = "LG Google Nexus 5X 6.0";
					}
					runInfoJson.push({ id, deviceStatus: result[0].currentState.status, date: runIdArray[key].date, deviceName: result[0].deviceName, TotalTestNo: result[0].testCaseAllNo, PassedTests: result[0].testCasePassedNo, failedTests: result[0].testCaseFailedNo });
					if (--runLength === 0) {
						onComplete();
					}
				});
			});
		}
	});
});

proxy.on("error", function(e) {
  console.log("Could not connect to proxy, please try again...");
});

app.listen(port, (error) => {
	if (error) {
		console.error(error);
	} else {
		console.info("===> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
	}
});
