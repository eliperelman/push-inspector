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
						<td><b>State</b></td>
						<td>{status.state}</td>
					</tr>
					<tr>
						<td><b>Actions</b></td>
						<td>
							<bs.ButtonToolbar>
								<Modal
				          label="Schedule Task"
				          content="Text in a modal"
				          glyph="play"
				          actionOnClick={() => console.log('action clicked')} />
								<Modal
				          label="Retrigger"
				          content="Text in a modal"
				          glyph="repeat"
				          actionOnClick={() => console.log('action clicked')} />
								<Modal
				          label="Cancel Task"
				          content="Text in a modal"
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
