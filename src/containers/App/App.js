import React, { Component } from "react";
import Navbar from "react-bootstrap/lib/Navbar";
import Nav from "react-bootstrap/lib/Nav";
import NavItem from "react-bootstrap/lib/NavItem";
import config from "../../config";
import Helmet from "react-helmet";
import { IndexLink } from "react-router";
import { LinkContainer } from "react-router-bootstrap";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.render = this.render.bind(this);
	}
	render() {
		//need to change this. how to include scss files.
		require("./App.scss");
		return (
			<div>
				<Helmet {...config.app.head}/>
				<Navbar fixedTop={true}>
					<Navbar.Header>
						<Navbar.Brand>
							<IndexLink to="/" activeStyle={{ color: "#33e0ff" }}>
								<span style={{ color: "white" }}>app press</span>
							</IndexLink>
						</Navbar.Brand>
					</Navbar.Header>
				<Nav navbar={true}>
					<LinkContainer to="/android">
						<NavItem eventKey={1} href="#">ANDROID</NavItem>
					</LinkContainer>
					<LinkContainer to="/ios">
						<NavItem eventKey={2} href="#">IOS</NavItem>
					</LinkContainer>
					<LinkContainer to="/studio">
						<NavItem eventKey={2} href="#">STUDIO</NavItem>
					</LinkContainer>
				</Nav>
			</Navbar>
			<div id="appContent">
				{this.props.children}
			</div>
		</div>
		);
	}
}

App.propTypes = {
	children: React.PropTypes.node
};
