import { take, call, put, all, select } from 'redux-saga/effects';
import applySaga from '../apply/actions/sagas';
import investSaga from '../invest/actions/sagas';
import sharedSaga from '../login/actions/sagas';
import { getToken } from '../login/reducers/user';
import { success, fail, actionToApi } from './constants';
import * as api from './api';


const requestMatcher = (action) => {
  const regex = /_REQUEST$/g;
  if (regex.exec(action) && action !== 'BORROWER_REQUEST') {
    return true;
  }
  return false;
};
const submitMatcher = (action) => {
  const regex = /_POST$/g;
  if (regex.exec(action)) {
    return true;
  }
  return false;
};

const setMatcher = (action) => {
  const regex = /_PUT$/g;
  if (regex.exec(action)) {
    return true;
  }
  return false;
};

// Checks if GET is a ?bla=   or /id/ only add / if /id/
const _addIfNotQuery = (url) => {
  const regex = /=$/g;
  if (regex.exec(url)) {
    return '';
  }
  return '/';
};


// Check if action is _REQUEST _POST or _PUT
const takeMatcher = (action) => {
  if (requestMatcher(action) || submitMatcher(action) || setMatcher(action)) {
    return true;
  }
  return false;
};

const methodMatcher = (action) => {
  if (requestMatcher(action)) {
    return 'GET';
  } else if (submitMatcher(action)) {
    return 'POST';
  } else if (setMatcher(action)) {
    return 'PUT';
  }
  return 'ILLEGAL';
};

export const extendAction = (actionType) => {
  const action = {
    self: actionType,
    success: success(actionType),
    fail: fail(actionType)
  };
  action.url = actionToApi(action.self); // Finds the api call that is linked to the action
  action.method = methodMatcher(action.self);
  return action;
};

/* apiSaga listens to action calls that include _REQUEST _POST or _PUT. If found
 it uses actionToApi to that links the action to the actual API method on the bakend 
 Then Uses the api.submit to call the bakend */
export function* apiSaga() {  
  while (true) {
    
    // for GET this can be ID or nothing, for PUT/POST this is the data.
    const input = yield take((action) => takeMatcher(action.type));
    const action = extendAction(input.type);    
    const token = yield select(getToken);
    let url = action.url;
    let data = null;

    if (input.payload && action.method === 'GET') {
      url = action.url + input.payload + _addIfNotQuery(url);
    } else {
      data = input.payload;
    }

    try {
      console.log('globals sagas apiSaga')
      console.dir(url)
      const response = yield call(api.submit, url, token, action.method, data);
      yield put({ type: action.success, payload: response });
    } catch (e) {
      yield put({ type: action.fail, message: e });
    }
  }
}

function* rootSaga() {
  yield all([
    apiSaga(),
    applySaga(),
    investSaga(),
    sharedSaga()
  ]);
}

export default rootSaga;
