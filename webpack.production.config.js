"use strict";
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const buildPath = path.resolve(__dirname, "public", "build");
const node_modules = path.resolve(__dirname, "node_modules");

module.exports = {
	devtool: "cheap-module-source-map",
	entry: [
		"./src/client.js"
	],
	output: {
		path: buildPath,
		filename: "bundle.js"
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			inject: "body"
		})
	],
	module: {
		loaders: [
			{
				test: /\.js$/, loaders: ["babel"], include: path.join(__dirname, "src"), exclude: node_modules
			},
			{
				test: /\.scss$/,
				loaders: ["style", "css", "sass"]
			},
			{
				test: /\.css$/,
				loaders: ["style", "css"]
			},
			{
				test: /\.(png|ico)$/,
				loader: "file?name=[name].[ext]",
				include: path.join(__dirname, "src")
			},
			{
				test: /\.json$/, loader: "json-loader"
			}
		]
	}
};
