import React from 'react';
import { Component } from 'react';
import TasksList from '../containers/tasksList';
import TaskDetail from '../containers/taskDetail';

export default class App extends Component {
  render() {
    return (
      <div>
        <TasksList />
        <TaskDetail />
      </div>
    );
  }
}
