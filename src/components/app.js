import React from 'react';
import { Component } from 'react';
import TasksList from '../containers/tasksList';
import TaskDetail from '../containers/taskDetail';
import Search from '../containers/search';

export default class App extends Component {
  render() {
    return (
      <div>
        <Search />
        <TasksList />
        <TaskDetail />
      </div>
    );
  }
}
