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
					<Tab>Try</Tab>
        </TabList>

        <TabPanel>
          <TaskDetail params={params} />
        </TabPanel>
        <TabPanel>
          <h2>Hello from Run</h2>
        </TabPanel>
				<TabPanel>
          <h4>Try</h4>
					Developers would come to this view to use the API that ahal is working on
        </TabPanel>
      </Tabs>
    )
  }
}


export default connect(null, actions )(TabsView);
