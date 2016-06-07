import { combineReducers } from 'redux';
import tasksReducer from './tasks';
import activeTaskReducer from './activeTask';
import activeTaskStatusReducer from './activeTaskStatus';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  activeTask: activeTaskReducer,
  activeTaskStatus: activeTaskStatusReducer
});

export default rootReducer;
