import { combineReducers } from 'redux';

// reducers
import global from './reducer_global';
import report from './reducer_report';
import runner from './reducer_runner';
import summary from './reducer_summary';
import sites from './reducer_sites';
import settings from './reducer_settings';
import progress from './reducer_progress';

const rootReducer = combineReducers({
  global,
  report,
  runner,
  summary,
  sites,
  settings,
  progress
});

export default rootReducer;
