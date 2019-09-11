import { combineReducers } from 'redux';

import currentView from './currentView';
import company from './company';
import user from './user';

export default combineReducers({
  currentView,
  company,
  user
});
