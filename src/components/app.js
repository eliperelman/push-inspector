import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Search from '../containers/search';
import ProgressBar from './progressBar';

class App extends Component {

  render() {
    return (
      <div>
        <Search />
        <ProgressBar
          tasks={this.props.tasks}
          setActiveTaskStatus={this.props.setActiveTaskStatus}/>
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
	return {
		tasks: state.tasks,
	}
}

export default connect(mapStateToProps, actions )(App)
