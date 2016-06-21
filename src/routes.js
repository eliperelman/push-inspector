import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Listings from './containers/listings';
import TabsView from './containers/tabsView';

import App from './components/app';

export default (
  <Route path="/" component={App}>
    <Route path=":taskGroupId" component={Listings}>
      <Route path=":taskId" component={TabsView}></Route>
    </Route>
  </Route>
);
