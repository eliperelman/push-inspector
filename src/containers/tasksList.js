import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Task from '../components/task';
import PieChart from '../components/pieChart';
import { VictoryPie, VictoryAnimation } from 'victory';


class TasksList extends Component {

	constructor(props) {
		super(props);

	}

	componentWillMount() {
		this.props.fetchTasks();
	}

	taskClicked(task) {
		this.props.setActiveTask(task);
	}

  renderTasks(tasks) {
		return tasks.map((task) => {
			if(!!!this.props.activeTaskStatus || task.status.state == this.props.activeTaskStatus){
				return (
	          <tbody onClick={this.taskClicked.bind(this, task)} key={task.status.taskId}>
	            <Task task={task} />
	          </tbody>
	      )
			}
    });
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
			<div className="col-xs-6">
				<PieChart
					tasks={this.props.tasks}
					onSliceClick={this.pieSliceOnClick.bind(this)} />
				<table id="tasks-list" className="table task-list-table">
          <thead>
          <tr>
              <th>TaskId</th>
              <th>Name</th>
              <th>State</th>
              <th>Runs</th>
          </tr>
          </thead>
          {this.renderTasks(tasks)}
        </table>
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
