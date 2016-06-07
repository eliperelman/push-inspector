import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class TaskDetail extends Component {

	constructor(props) {
		super(props);
		this.showScope = this.showScope.bind(this);
	}

	showScope(task, status) {
		const scopes = task.scopes;
		const id = status.taskId;
		return scopes.map((scope) => {
			return (
				<ul key={id}>{scope}</ul>
			);
		});
	}

	render() {
		if(!!!this.props.activeTask) {
			return <div>Loading...</div>
		}
		const task = this.props.activeTask.task;
		const status = this.props.activeTask.status;

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
						<td><b>Source</b></td>
						<td>{task.metadata.source}</td>
					</tr>

					<tr>
						<td><b>State</b></td>
						<td>{status.state}</td>
					</tr>
					<tr>
						<td><b>Retries Left</b></td>
						<td>{status.retriesLeft}</td>
					</tr>
					<tr>
						<td><b>Action</b></td>
						<td>
							<button>Schedule Task</button>
							<button>Retrigger Task</button>
							<button>Cancel Task</button>
							<button>Purger Worker Cache</button>
						</td>
					</tr>
					<tr>
						<td><b>Scope</b></td>
						<td>{this.showScope(task, status)}</td>
					</tr>
				</tbody>
      </table>
		);

	}
}

function mapStateToProps(state) {
	return {
		activeTask: state.activeTask
	}
}

export default connect(mapStateToProps, actions )(TaskDetail)
