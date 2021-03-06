import React, { Component } from 'react';
import { Link } from 'react-router';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Task from '../components/task';
import ProgressBar from '../components/progressBar';
import Table from './table';
import { VictoryPie, VictoryAnimation } from 'victory';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import taskcluster from 'taskcluster-client';


class Listings extends Component {

	constructor(props) {
		super(props);
		this.listener = null;
	}

	// Close Listener connection
	removeBindings() {
		this.listener.close();
	}


	//	Remove the list of tasks that were loaded previously
  componentWillUnmount(nextProps) {
			this.props.removeTasks();
			this.removeBindings();

  }


	setupListener() {
		const queue = new taskcluster.Queue(),
					queueEvents = new taskcluster.QueueEvents(),
					{ params } = this.props;
		this.listener = new taskcluster.WebListener();
		this.listener.bind(queueEvents.taskPending({
		  taskGroupId: params.taskGroupId
		}));

		this.listener.bind(queueEvents.taskCompleted({
		  taskGroupId: params.taskGroupId
		}));

		this.listener.on("message", (message) => {
			console.log('MESSAGE: ', message.payload.status);
			this.props.fetchTasks(params.taskGroupId);
			//  message.payload.status is the only property that is consistent across all exchanges
		  //  message.payload.task never changes because its the task definition
		  //  updateReduxStore();
		});

		this.listener.on("error", function(err) {
			console.log('ERROR: ', err);
			//  Perhaps display an error banner on top of the dashboard. This happens when a user puts him laptop to sleep
		  //  A smart way is to restart listening from scratch.
		  //  If you reconnect, make sure there is a limit. if more than 5 times in the 5 min interval, then stop reconnecting.
		});

		this.listener.resume();
	}

	componentWillMount() {
		const { taskGroupId } = this.props.params;
		this.props.fetchTasks(taskGroupId);
		this.setupListener();
	}

	render() {
		const tasks = this.props.tasks;
		return (
			<div>
				<div className="col-xs-5 removeLeftPadding removeRightPadding">
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
	}
}

export default connect(mapStateToProps, actions )(Listings)
