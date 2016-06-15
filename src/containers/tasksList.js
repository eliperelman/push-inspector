import React, { Component } from 'react';
import { Link } from 'react-router';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Task from '../components/task';
import PieChart from '../components/pieChart';
import Table from '../components/table';
import { VictoryPie, VictoryAnimation } from 'victory';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


class TasksList extends Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		const { taskGroupId } = this.props.params;
		this.props.fetchTasks(taskGroupId);
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
