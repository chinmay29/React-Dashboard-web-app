import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
//import createLogger from "redux-logger";
import rootReducer from "../reducers/index";
export default function configureStore(initialState) {
	const store = createStore(
		rootReducer,
		initialState,
		applyMiddleware(thunkMiddleware)
	);
	if (module.hot) {
		module.hot.accept("../reducers", () => {
			const nextRootReducer = require("../reducers").default;
			store.replaceReducer(nextRootReducer);
		});
	}
	//for dev purpose.
	// //console.log(process.env.NODE_ENV);
	// if (process.env.NODE_ENV !== "production") {
	// 	store = createStore(
	// 		rootReducer,
	// 		initialState,
	// 		applyMiddleware(thunkMiddleware, createLogger())
	// 	);
	// 	if (module.hot) {
	// 		module.hot.accept("../reducers", () => {
	// 			const nextRootReducer = require("../reducers").default;
	// 			store.replaceReducer(nextRootReducer);
	// 		});
	// 	}
	// } else {

	//}
	return store;
}
