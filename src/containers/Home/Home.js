import React, { Component } from "react";
import { Jumbotron, Button } from "react-bootstrap";

export default class Home extends Component {
	render() {
		require("./Home.scss");
		return (
			<Jumbotron>
				<h1>App Press Now</h1>
				<p>This is a web page to show daily builds for android and ios apps and functional test results which runs on testdroid cloud devices.</p>
				<p>
					<a href="https://manage.app-press.com/docs/Functional-test-description.html" target="_blank">
						<Button bsStyle="primary">Docs</Button>
					</a>
				</p>
			</Jumbotron>
		);
	}
}
