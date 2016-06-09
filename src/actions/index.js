import {
	FETCH_TASKS,
	FETCH_TASK,
	FETCH_STATUS
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
	console.log('Fetching Task...');
	return (dispatch) => {
		request.then((task) => {
			console.log('Task: ', task);
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
	console.log('Fetching Status...');
	return (dispatch) => {
		request.then(({status}) => {
			console.log('Status: ', status);
			dispatch({
				type: FETCH_STATUS,
				payload: status
			})
		});
	}
}
