"use strict";
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const node_modules = path.resolve(__dirname, "node_modules");

module.exports = {
	devtool: "eval",
	entry: [
		"webpack-hot-middleware/client",
		"webpack/hot/dev-server",
		"./src/client.js"
	],
	output: {
		path: path.join(__dirname, "dist"),
		filename: "bundle.js",
		publicPath: "/"
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			inject: "body"
		})
	],
	eslint: {
		configFile: ".eslintrc"
	},
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
