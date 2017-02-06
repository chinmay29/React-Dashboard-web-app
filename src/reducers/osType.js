import {
  SELECT_OS
} from "../actions/buildActions";

export default function selectedOS(state= "", action) {
	switch (action.type) {
		case SELECT_OS:
			return action.os;
		default:
			return state;
	}
}
