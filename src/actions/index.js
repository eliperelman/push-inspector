import {
	FETCH_TASKS,
	FETCH_TASK,
	FETCH_STATUS,
	UPDATE_STATUS,
	ACTIVE_TASK_STATUS
} from './types';

import taskcluster from 'taskcluster-client';
import axios from 'axios';

//	Get task group list
export function fetchTasks(id = "ARUrTTyjQRiXEeo1uySLnA") {
	const queue = new taskcluster.Queue();
	//const iterator = getTasks();
	return (dispatch) => {
		//let data = iterator.next();
		const request = queue.listTaskGroup(id);
		request.then(({tasks, continuationToken}) => {
			console.log('continuationToken: ', continuationToken);
			dispatch({
				type: FETCH_TASKS,
				payload: tasks
			})
		});
	}


	function* getTasks(){
		let result = queue.listTaskGroup(id).then((response) => {
			return response;
		});
		if(result._65 != null) {
			yield result._65.tasks;
		}
	  // const result = yield queue.listTaskGroup(id, { continuationToken: token }).then(({tasks, continuationToken}) => {
		// 	return {tasks, continuationToken};
		// });
	}

	// function* foo(){
	//   var index = 0;
	//   while (index <= 2)
	//     yield index++;
	// }
	// var iterator = foo();
	// console.log(iterator.next()); // { value: 0, done: false }
	// console.log(iterator.next()); // { value: 1, done: false }
	// console.log(iterator.next()); // { value: 2, done: false }
	// console.log(iterator.next()); // { value: undefined, done: true }
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
