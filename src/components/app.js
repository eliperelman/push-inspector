import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Search from '../containers/search';
import ProgressBar from './progressBar';
import Loading from '../shared/loading';

class App extends Component {

  render() {
    const { tasks, children, setActiveTaskStatus } = this.props;
    return (
      <div>
        <Search />
        <ProgressBar
          tasks={tasks}
          setActiveTaskStatus={setActiveTaskStatus}/>
        <div className={!!tasks.length ? "hideDisplay" : ""}>
          <Loading />
        </div>
        <div className={!!!tasks.length ? "hideDisplay" : ""}>
          {children}
        </div>
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
