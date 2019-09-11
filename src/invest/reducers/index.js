import { combineReducers } from 'redux';

import notes from './notes';
import account from './account';
import accountSettings from './accountSettings'

export default combineReducers({
  notes,  
  account,  
  accountSettings
});