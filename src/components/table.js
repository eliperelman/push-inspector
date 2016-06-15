import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Table extends Component {

  constructor(props) {
    super(props);
    this.generateHeaders = this.generateHeaders.bind(this);
    this.generateRows = this.generateRows.bind(this);
  }

  labelClassName(state) {
      let cl = "my-label";
      if (state == 'completed') {
        return cl + " label-completed";
      } else if (state == 'failed') {
        return cl + " label-failed";
      } else if (state == "exception") {
        return cl + " label-exception";
      } else if (state =="unscheduled") {
        return cl + " label-unscheduled";
      } else if (state =="pending") {
        return cl + " label-pending";
      } else if (state =="running") {
        return cl + " label-running";
      }
  }

  taskClicked(task) {
    const { taskId, taskGroupId } = task.status;
		hashHistory.push(taskGroupId + '/' + taskId);
		this.props.fetchTask(taskId);
		this.props.fetchStatus(taskId);
	}

  generateHeaders() {
      var cols = ["TaskId", "Name", "State", "Runs"];
      return cols.map((colData, i) => {
          return <th key={i}> {colData} </th>;
      });
  }

  generateRows() {
      var cols = ["TaskId", "Name", "State", "Runs"],
          data = this.props.tasks;

      if(data.length > 0) {
  			const status = this.props.activeTaskStatus;
  			let list = data;
  			if(!!status) {
  				list =  data.filter((l) => {
  					return l.status.state == status;
  				});
  			}

        return list.map((task, i) => {
            let state = this.labelClassName(task.status.state);

            return (
                <tr onClick={this.taskClicked.bind(this, task)} key={i}>
                  <td>{task.status.taskId}</td>
                  <td>{task.task.metadata.name}</td>
                  <td className={state}>{task.status.state}</td>
                  <td>{task.status.runs.length}</td>
                </tr>
            );
        });
  		}
  }

  renderList() {
        var headerComponents = this.generateHeaders();
        var rowComponents = this.generateRows();
        return (
            <table id="tasks-list" className="table task-list-table">
                <thead><tr>{headerComponents}</tr></thead>
                <tbody>{rowComponents}</tbody>
            </table>
        );
  }

  render() {

    return (
      <div className="table-wrapper">
        {this.renderList()}
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

export default connect(mapStateToProps, actions )(Table)
