import React from 'react';
import { Component } from 'react';

export default class Task extends Component {
  render() {
    return (
      <tr>
          <td>{this.props.task.status.taskId}</td>
          <td>{this.props.task.task.metadata.name}</td>
          <td>{this.props.task.status.state}</td>
          <td>{this.props.task.status.runs.length}</td>
      </tr>
    );
  }
}
