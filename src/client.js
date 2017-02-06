import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import getRoutes from "./routes";
import { Router, hashHistory } from "react-router";

//third-party
import "react-bootstrap";

import configureStore from "./store/configureStore";

const store = configureStore();

const component = <Router history={hashHistory}>{getRoutes(store)}</Router>;

render(
	<Provider store={store}>
		{component}
	</Provider>,
	document.getElementById("main")
);
