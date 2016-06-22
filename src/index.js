"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import routes from './routes';
import reducers from './reducers';
import 'babel-polyfill';


const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);



ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={hashHistory} routes={routes} />
  </Provider>
  , document.querySelector('.init'));
