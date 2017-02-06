import { combineReducers } from "redux";
import buildsByOS from "./builds";
import selectedOS from "./osType";
import resultsByOS from "./testResults";
import detailFiles from "./detailFiles";
import studioByEnv from "./studioResults";

const rootReducer = combineReducers({
	buildsByOS,
	selectedOS,
	resultsByOS,
	detailFiles,
	studioByEnv
});

export default rootReducer;
