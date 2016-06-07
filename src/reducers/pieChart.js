import {
	FETCH_PIE_CHART
} from '../actions/types';

export default function(state = null, action) {
	switch(action.type) {
		case COMPLETED_TASKS:
			return action.payload;
	}
	return state;
}
