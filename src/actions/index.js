import {
	FETCH_TASKS,
	ACTIVE_TASK,
	ACTIVE_TASK_STATUS
} from './types';

import taskcluster from 'taskcluster-client';
import axios from 'axios';

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

export function setActiveTask(task) {
	return {
		type: ACTIVE_TASK,
		payload: task
	}
}
export function setActiveTaskStatus(status) {
	return {
		type: ACTIVE_TASK_STATUS,
		payload: status
	}
}
