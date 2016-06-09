import {
	FETCH_TASKS
} from '../actions/types';

export default function(state = [], action) {
	console.log('action: ', action);
	switch(action.type) {
		case FETCH_TASKS:
			return [...state, ...action.payload ];
	}
	return state;
}
