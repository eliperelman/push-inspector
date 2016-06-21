import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Listings from './containers/listings';
import TaskDetail from './containers/taskDetail';

import App from './components/app';

export default (
  <Route path="/" component={App}>
    <Route path=":taskGroupId" component={Listings}>
      <Route path=":taskId" component={TaskDetail}></Route>
    </Route>
  </Route>
);
