import {
	FETCH_TASKS,
	FETCH_TASK,
	FETCH_STATUS,
	ACTIVE_TASK_STATUS
} from './types';

import taskcluster from 'taskcluster-client';
import axios from 'axios';

//	Get task group list
export function fetchTasks(id = "ARUrTTyjQRiXEeo1uySLnA") {
	const queue = new taskcluster.Queue();
	const request = queue.listTaskGroup(id);

	return (dispatch) => {
		request.then(({tasks}) => {
			dispatch({
				type: FETCH_TASKS,
				payload: tasks
			})
		});
	}
}
//	Get task definition
export function fetchTask(id = "AB0MITrrT2WoIfKvmruvyw") {
	const queue = new taskcluster.Queue();
	const request = queue.task(id);
	return (dispatch) => {
		request.then((task) => {
			dispatch({
				type: FETCH_TASK,
				payload: task
			})
		});
	}
}
//	Get task status
export function fetchStatus(id = "AB0MITrrT2WoIfKvmruvyw") {
	const queue = new taskcluster.Queue();
	const request = queue.status(id);
	return (dispatch) => {
		request.then(({status}) => {
			dispatch({
				type: FETCH_STATUS,
				payload: status
			})
		});
	}
}

// Set Status to the 6 possible states (Completed, Pending, Running, etc.)
export function setActiveTaskStatus(status) {
	return {
		type: ACTIVE_TASK_STATUS,
		payload: status
	}
}
