import { combineReducers } from 'redux';
import global from './reducer_global';
import report from './reducer_report';
import runner from './reducer_runner';
import summary from './reducer_summary';
import sites from './reducer_sites';
import settings from './reducer_settings';

const rootReducer = combineReducers({
  global,
  report,
  runner,
  summary,
  sites,
  settings
});

export default rootReducer;
