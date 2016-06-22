import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Search from '../containers/search';
import ProgressBar from './progressBar';
import Loading from '../shared/loading';
import Nav from '../shared/nav';

class App extends Component {

  render() {
    const { tasks, children, setActiveTaskStatus, params } = this.props;
    const { taskGroupId } = params;
    return (
      <div>
        <Nav />
        <div className="container">
          <b>taskGroupId</b>&nbsp;{taskGroupId}
          <Search />
          <ProgressBar
            taskGroupId = {taskGroupId}
            tasks={tasks}
            setActiveTaskStatus={setActiveTaskStatus}/>
          <div className={(!!tasks.length && !!taskGroupId) || (!!!tasks.length && !!!taskGroupId) ? "hideDisplay" : ""}>
            <Loading />
          </div>
          <div className={!!!tasks.length ? "hideDisplay" : ""}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
	return {
		tasks: state.tasks
	}
}

export default connect(mapStateToProps, actions )(App)
