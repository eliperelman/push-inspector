import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import * as bs from 'react-bootstrap';
import taskcluster from 'taskcluster-client';

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

	componentWillMount() {
		const { taskId } = this.props.params;
		this.props.fetchStatus(taskId);
		this.props.fetchTask(taskId);
	}

	render() {
		console.log('rendering taskDetail: ');
		if(!!!this.props.task || !!!this.props.status) {
			return <div>Loading...</div>;
		}

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
							<bs.ButtonToolbar>
								<bs.Button bsSize="small"><bs.Glyphicon glyph="play"/>&nbsp;Schedule Task</bs.Button>
								<bs.Button bsSize="small"><bs.Glyphicon glyph="repeat"/>&nbsp;Retrigger Task</bs.Button>
								<bs.Button bsSize="small"><bs.Glyphicon glyph="stop"/>&nbsp;Cancel Task</bs.Button>
								<bs.Button bsSize="small"><bs.Glyphicon glyph="trash"/>&nbsp;Purger Worker Cache</bs.Button>
							</bs.ButtonToolbar>
						</td>
					</tr>
					<tr>
						<td><b>Scope</b></td>
						<td>{this.showScope(task, status)}</td>
					</tr>
					<tr>
						<td className="baseline-align"><b>Task Definition Payload</b></td>
						<td><pre><code>{JSON.stringify(task.payload, null, 2)}</code></pre></td>
					</tr>
					<tr>
						<td><b>Debug</b></td>
						<td>
							<bs.ButtonToolbar>
						    <bs.Button bsSize="small"><bs.Glyphicon glyph="edit"/>&nbsp;Edit and Create</bs.Button>
								<bs.Button bsSize="small"><bs.Glyphicon glyph="console"/>&nbsp;One-Click Loaner</bs.Button>
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
		activeTask: state.activeTask,
		task: state.task,
		status: state.status
	}
}

export default connect(mapStateToProps, actions )(TaskDetail)
