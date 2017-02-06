"use strict";

const fs = require("fs");
const exec = require("child_process").exec;
const packageData = require("../package.json");

exec("git rev-parse --abbrev-ref HEAD", { cwd: "." }, (error, stdout, stderr) => {
	if (error) {
		console.log(error, stderr.trim());
		process.exit(1);
	}

	packageData.gitBranch = stdout.trim();

	fs.writeFileSync("package.json", JSON.stringify(packageData, null, 2));
});
