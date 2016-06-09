import React from 'react';
import { Route, IndexRoute } from 'react-router';
import TasksList from './containers/tasksList';
import TaskDetail from './containers/taskDetail';

import App from './components/app';

export default (
  <Route path="/" component={App}>
    <Route path=":taskGroupId" component={TasksList}>
      <Route path=":taskId" component={TaskDetail}></Route>
    </Route>

  </Route>
);
