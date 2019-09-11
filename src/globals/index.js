import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import login from '../login/reducers/index';
import apply from '../apply/reducers/index';
import invest from '../invest/reducers/index';

export default combineReducers({
  login,
  apply,
  invest,
  form: formReducer
});
