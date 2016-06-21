import React from 'react';
import { Component } from 'react';
import Listings from '../containers/listings';
import TaskDetail from '../containers/taskDetail';
import Search from '../containers/search';

export default class App extends Component {
  render() {
    return (
      <div>
        <Search />
        {this.props.children}
      </div>
    );
  }
}
