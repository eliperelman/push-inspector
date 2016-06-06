import {
	ACTIVE_TASK
} from '../actions/types';

const INITIAL_STATE = null;
export default function(state = INITIAL_STATE, action) {

	switch(action.type) {
		case ACTIVE_TASK:
			return action.payload;
	}
	return state;
}
