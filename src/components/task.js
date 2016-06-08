import React from 'react';
import { Component } from 'react';

export default class Task extends Component {

  labelClassName(state) {
      let cl = "my-label";
      if (state == 'completed') {
        console.log(cl + " label-completed");
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

  render() {
    if(!!this.props.task) {
      let state = this.labelClassName(this.props.task.status.state);
      console.log('state: ', state);
      return (
        <tr>
            <td>{this.props.task.status.taskId}</td>
            <td>{this.props.task.task.metadata.name}</td>
            <td className={state}>{this.props.task.status.state}</td>
            <td>{this.props.task.status.runs.length}</td>
        </tr>
      );
    }

  }
}
