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

//	Setup a webListener to listen for new/removed jobs
export function setupListener(id = "AB0MITrrT2WoIfKvmruvyw") {

	const queue = new taskcluster.Queue();
	let queueEvents = new taskcluster.QueueEvents();
	let listener = new taskcluster.WebListener();
	console.log('listening, ', listener);
	listener.bind(queueEvents.taskPending({
	  taskGroupId: id
	}));

	listener.bind(queueEvents.taskCompleted({
	  taskGroupId: id
	}));

	listener.on("message", function(message) {
		console.log('MESSAGE: ', message);
		//  message.payload.status is the only property that is consistent across all exchanges
	  //  message.payload.task never changes because its the task definition
	  //  updateReduxStore();
	});

	listener.on("error", function(err) {
		console.log('ERROR: ', err);
		//  Perhaps display an error banner on top of the dashboard. This happens when a user puts him laptop to sleep
	  //  A smart way is to restart listening from scratch.
	  //  If you reconnect, make sure there is a limit. if more than 5 times in the 5 min interval, then stop reconnecting.
	});
	var resumePromise = listener.resume();
	return (dispatch) => {
		// Listen and consume events:
		resumePromise.then(function() {
	  	// Now listening
			dispatch({
				type: 'TO_CHANGE',
				payload: null
			})
		});

	}

}
