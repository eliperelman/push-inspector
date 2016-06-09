import { combineReducers } from 'redux';

import tasksReducer from './tasks';
import taskReducer from './task';
import statusReducer from './status';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  task: taskReducer,
  status: statusReducer
});

export default rootReducer;
