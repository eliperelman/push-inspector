import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import * as bs from 'react-bootstrap';
import taskcluster from 'taskcluster-client';
import Modal from '../shared/modal';
class TaskDetail extends Component {

	constructor(props) {
		super(props);
		this.showScope = this.showScope.bind(this);
	}

	showScope(task, status) {
		const scopes = task.scopes;
		return scopes.map((scope, i) => {
			return (
				<ul key={i}>{scope}</ul>
			);
		});
	}

	componentWillMount() {
		const { taskId } = this.props.params;
		this.props.fetchStatus(taskId);
		this.props.fetchTask(taskId);
	}



	render() {
		if(!!!this.props.task || !!!this.props.status) {
			return <div>Loading...</div>;
		}

		const scheduleText = (
			<div>
				<p>
					Are you sure you wish to schedule the task?
					This will <b>overwrite any scheduling process</b> taking place,
					if this task is part of a continous integration process scheduling
					this task may cause your code to land with broken tests.
				</p>
			</div>
		);

		const retriggerText = (
			<div>
				<p>
					This will duplicate the task and create it under a different
					<code>taskId</code>.<br/><br/>
					The new task will be altered as to:
					<ul>
						<li>Set <code>task.payload.features.interactive = true</code>,</li>
						<li>Strip <code>task.payload.caches</code> to avoid poisoning,</li>
						<li>Ensures <code>task.payload.maxRunTime</code> is minimum 60 minutes,</li>
						<li>Strip <code>task.routes</code> to avoid side-effects, and</li>
						<li>Set the environment variable<code>TASKCLUSTER_INTERACTIVE=true</code>.</li>
					</ul>
					Note: this may not work with all tasks.
				</p>
			</div>
		);


		const cancelText = (
			<div>
				<p>
					Are you sure you wish to cancel this task?
					Notice that another process or developer may still be able to
					schedule a rerun. But all existing runs will be aborted and any
					scheduling process will not be able to schedule the task.
				</p>
			</div>
		);



		const { task, status } = this.props;

		return (
			<table>
				<tbody>
					<tr>
						<td><b>Name</b></td>
						<td>{task.metadata.name}</td>
					</tr>
					<tr>
						<td><b>Description</b></td>
						<td>{task.metadata.description}</td>
					</tr>
					<tr>
						<td><b>Owner</b></td>
						<td>{task.metadata.owner}</td>
					</tr>
					<tr>
						<td><b>TaskId</b></td>
						<td>
							<a target="_blank" href={'https://queue.taskcluster.net/v1/task/' + status.taskId}>{status.taskId}
								&nbsp;<i className='fa fa-external-link'></i>
							</a>
						</td>
					</tr>
					<tr>
						<td><b>State</b></td>
						<td>{status.state}</td>
					</tr>
					<tr>
						<td><b>Actions</b></td>
						<td>
							<bs.ButtonToolbar>
								<Modal
				          label="Schedule Task"
				          content={scheduleText}
				          glyph="play"
				          actionOnClick={() => console.log('action clicked')} />
								<Modal
				          label="Retrigger"
				          content={retriggerText}
				          glyph="repeat"
				          actionOnClick={() => console.log('action clicked')} />
								<Modal
				          label="Cancel Task"
				          content={cancelText}
				          glyph="stop"
				          actionOnClick={() => console.log('action clicked')} />
								<Modal
				          label="Purger Worker Cache"
				          content="Text in a modal"
				          glyph="trash"
				          actionOnClick={() => console.log('action clicked')} />
							</bs.ButtonToolbar>
						</td>
					</tr>
					<tr>
						<td><b>Debug</b></td>
						<td>
							<bs.ButtonToolbar>
								<Modal
				          label="Edit and Create"
				          content="Text in a modal"
				          glyph="edit"
				          actionOnClick={() => console.log('action clicked')} />
								<Modal
				          label="One-Click Loaner"
				          content="Text in a modal"
				          glyph="console"
				          actionOnClick={() => console.log('action clicked')} />
							</bs.ButtonToolbar>
						</td>
					</tr>

				</tbody>
      </table>
		);

	}
}

function mapStateToProps(state) {
	return {
		task: state.task,
		status: state.status
	}
}

export default connect(mapStateToProps, actions )(TaskDetail)
