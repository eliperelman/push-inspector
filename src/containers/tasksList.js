import React, { Component } from 'react';
import { Link } from 'react-router';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Task from '../components/task';
import PieChart from '../components/pieChart';
import Table from './table';
import { VictoryPie, VictoryAnimation } from 'victory';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import taskcluster from 'taskcluster-client';


class TasksList extends Component {

	constructor(props) {
		super(props);
	}

	setupListener() {
		const queue = new taskcluster.Queue();
		let queueEvents = new taskcluster.QueueEvents();
		let listener = new taskcluster.WebListener();
		var id = this.props.params.taskGroupId;

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
		// Listen and consume events:
		resumePromise.then(function(data) {
	  	// Now listening
			console.log('data: ', data);
		});
	}

	componentWillMount() {
		const { taskGroupId } = this.props.params;
		this.props.fetchTasks(taskGroupId);
		this.setupListener();
	}

	pieSliceOnClick(elem) {
		const text = elem.text;
		switch (text) {
			case "C":
				this.props.setActiveTaskStatus("completed");
				break;
			case "F":
				this.props.setActiveTaskStatus("failed");
				break;
			case "E":
				this.props.setActiveTaskStatus("exception");
				break;
			case "U":
				this.props.setActiveTaskStatus("unscheduled");
				break;
			case "P":
				this.props.setActiveTaskStatus("pending");
				break;
			case "R":
				this.props.setActiveTaskStatus("running");
				break;
		}

	}

	render() {
		const tasks = this.props.tasks;
		return (
			<div>
				<div className="col-xs-5">
					<PieChart
						tasks={this.props.tasks}
						onSliceClick={this.pieSliceOnClick.bind(this)} />
					<Table />
				</div>
				<div className="col-xs-7">
					{this.props.children}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		tasks: state.tasks,
		activeTaskStatus: state.activeTaskStatus
	}
}

export default connect(mapStateToProps, actions )(TasksList)
