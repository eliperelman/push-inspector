import { combineReducers } from 'redux';
import tasksReducer from './tasks';
import activeTaskReducer from './activeTask';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  activeTask: activeTaskReducer
});

export default rootReducer;
