import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import * as bs from 'react-bootstrap';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TaskDetail from './TaskDetail';

class TabsView extends Component {

	handleSelect(index, last) {

	}
	render() {
		const { params } = this.props;
		return (


      <Tabs
        onSelect={this.handleSelect}
        selectedIndex={0}
      >
        <TabList>
          <Tab>Task</Tab>
          <Tab>Run</Tab>
        </TabList>

        <TabPanel>
          <TaskDetail params={params} />
        </TabPanel>
        <TabPanel>
          <h2>Hello from Run</h2>
        </TabPanel>
      </Tabs>
    )
  }
}


export default connect(null, actions )(TabsView);
