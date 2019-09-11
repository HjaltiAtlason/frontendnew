import { race, take, call, put, all, takeLatest, select, delay } from 'redux-saga/effects';
import { createBrowserHistory } from 'history'
import { aT, createAction } from '../../globals/constants';
import * as applyConstants from '../../apply/constants';
import * as api from '../../globals/api';
import * as investConstants from '../../invest/constants';
import { getLoginGuid, getIsEmailVerified } from '../reducers/user';
import * as logUtil from '../components/LoginUtil';


const history = createBrowserHistory()

export const getViewKey = (isBorrower, step) => {
  if (isBorrower){
    return applyConstants.stepToViewKeys(step);
  }  
  return investConstants.stepToViewKeys(step);
}

const getAction = (isBorrower, viewKey) => {
  if (isBorrower){
    return applyConstants.viewKeyToActions(viewKey);
  }  
  return investConstants.viewKeyToActions(viewKey);
}

// data = payload: { viewKey, isBorrower }  
// Change this, viewKeyToActions should point to saga which handles success fail etch
export function* loadPageDataManager(data) {
  // yield put({type: aT.login.store.CHANGE_VIEW_STORE, viewKey: view.payload.viewKey})
  console.log('Sagas loadPageDataManager, viewKey %s', data.payload.viewKey)
  const viewKey = data.payload.viewKey;
  const action = createAction(getAction(data.payload.isBorrower, viewKey))
  console.log('Sagas loadPageDataManager, action %s', action.self)
  yield put({ type: action.self });
  const result = yield race([
    take(action.success),
    take(action.fail)
  ]);

  const successRegex = /\/SUCCESS/g;
  const failRegex = /\/FAIL/g;

  if (successRegex.exec(result[0].type)) {
    if (viewKey !== 'LOAN_AMOUNT') {
      yield put({ type: aT.login.store.CHANGE_VIEW_STORE, viewKey });
    }
  } else if (failRegex.exec(result[0].type)) {
    yield put({ type: aT.login.VIEW_DATA_FAIL, message: result.message });
  } else {
    yield put({ type: aT.login.GENERIC_ERROR, message: 'The issue is in viewDataManager' });
  }
}

// Manages login to Island.is
// action = payload: isBorrower
export function* loginStartManager(action) {
  console.log('Sagas loginStartManager, is borrower: %s', action.payload)
  const isBorrower = action.payload;
  logUtil.initializeLoginSession();
  const actionLogin = createAction(aT.login.api.LOGIN_GUID_REQUEST); 
  yield put({ type: actionLogin.self });
  yield take(actionLogin.success);
  const loginguid = yield select(getLoginGuid);
  console.log('Sagas loginStartManager new loginguid gotten!, loginguid: %s', loginguid)
  logUtil.setLoggingIn(loginguid);
  logUtil.setIsBorrower(isBorrower);
  console.log('Sagas loginStartManager before LOGIN_AUTHENTICATE_REQUEST!')
  const actionAuth = createAction(aT.login.api.LOGIN_AUTHENTICATE_REQUEST); 
  yield put({ type: actionAuth.self, payload: loginguid });
  const actionAuthData = yield take(actionAuth.success);


  window.location = actionAuthData.payload.baseUrl;  // The url of island.is
}

function getCompleteAction(data) {
  const actionType = data.payload.isBorrower ? aT.login.api.LOGIN_COMPLETION_B_REQUEST :
    aT.login.api.LOGIN_COMPLETION_I_REQUEST;
  return actionType
}

// DevLoginManager    data = payload: { isBorrower, kt }
export function* betterloginDevManager(data) {    
  const actionLogin = createAction(aT.login.api.LOGIN_GUID_REQUEST); 
  yield put({ type: actionLogin.self });
  yield take(actionLogin.success);
  const loginguid = yield select(getLoginGuid);
  const actionStartLogin = createAction(aT.login.api.DEV_LOGIN_AUTHENTICATE_POST)
  const dataIn = {'loginGuid': loginguid, 'nafn':'Jón Jónsson', 'kennitala': data.payload.kt }
  console.log('Sagas betterloginDevManager before authenticate loginguid %s, kennitala %s',loginguid, data.payload.kt)  
  yield put({ type: actionStartLogin.self, payload: dataIn });
  yield take(actionStartLogin.success);
  const actionType = getCompleteAction(data)
  const action = createAction(actionType); 
  console.log('Sagas betterloginDevManager, before login completed kennitala %s',loginguid, data.payload.kt)  
  yield put({ type: action.self, payload: loginguid });
  const user = yield take(action.success);  
  console.log('Sagas betterloginDevManager found user %s',user.payload.username)
  logUtil.setLoginCompletedSuccess();
  history.push((user.payload.isBorrower ? '/Lantaki' : '/Fjarfestir'));
  console.log('Sagas betterloginDevManager isBorrower %s, step %s',user.payload.username, user.payload.step)
  const viewKey = getViewKey(user.payload.isBorrower, user.payload.step);
  
  
  console.log('Sagas betterloginDevManager viewkey %s', viewKey)
  yield put({ type: aT.login.man.LOAD_PAGE_DATA_MAN, payload: {'viewKey': viewKey, 'isBorrower': user.isBorrower}});
}

// DevLoginManager    data = payload: { isBorrower, kt }
export function* loginDevManager(data) {  
  const action = createAction(aT.login.api.DEV_LOGIN_REQUEST);
  let viewKey= '';
  let user='';
  try {
    user = yield call(api.mockLogin, data);        
    viewKey =  getViewKey(user.isBorrower, user.step)    
    yield put({ type: action.success, payload: user, viewKey });
  } catch (e) {
    yield put({ type: action.fail, message: e });
  }
  
  console.log('Sagas loginDevManager step %s, viewkey %s', user.step, viewKey)
  yield put({ type: aT.login.man.LOAD_PAGE_DATA_MAN, payload: {'viewKey': viewKey, 'isBorrower': user.isBorrower}});
}

// Called after user has logged into Island.is
// data = {payload: isBorrower, loginguid}
export function* loginCompletedManager(data) {
  console.log('Sagas loginCompleteManager, isBorrower %s, loginfuid %s', data.payload.isBorrower, data.payload.step)
  const actionType = getCompleteAction(data)

  const action = createAction(actionType); 
  
  yield put({ type: action.self, payload: data.payload.loginguid });
  const user = yield take(action.success);
  logUtil.setLoginCompletedSuccess();
  history.push((data.payload.isBorrower ? '/Lantaki' : '/Fjarfestir'));
  
  const viewKey = getViewKey(data.payload.isBorrower, user.step);
  console.log('Sagas loginCompleteManager, viewkey %s', viewKey)
  yield put({ type: aT.login.man.LOAD_PAGE_DATA_MAN, payload: {'viewKey': viewKey, 'isBorrower': data.payload.isBorrower}});
}


export function* verifyEmailManager(data) {  
  
  console.log('Sagas verifyEmailManager start, payload %s', data.payload.userEmail)
  const eaction = createAction(aT.login.api.VERIFY_EMAIL_POST)
  console.log('Sagas verifyEmailManager before put, payload %s', data.payload.userEmail)
  
  yield put({ type: eaction.self, payload: {'new_email': data.payload.userEmail}});

  console.log('Sagas verifyEmailManager after put, payload %s', data.payload.userEmail)
  yield take(eaction.success)
  console.log('Sagas verifyEmailManager after take sucess start check if verified')


  let count = 0
  const maxCount = 20
  const checkEmailRequest = createAction(aT.login.api.IS_EMAIL_VERIFIED_REQUEST)
  do {
    yield put({type: checkEmailRequest.self});
    console.log('saga emailChecker after put count: %s', count)
    yield delay(1000)
    const isEmailVerified = yield select(getIsEmailVerified)
    console.log('saga SignLoanManager after getIsEmailVerified count: %s, isEmailVerified: %s', count, isEmailVerified)
    if (isEmailVerified)
      count = maxCount
    count += 1
  }
  while (count < maxCount)

}

export function* watchDevLogin() {
  // yield takeLatest(aT.login.man.DEV_LOGIN, loginDevManager);
  yield takeLatest(aT.login.man.DEV_LOGIN_MAN, betterloginDevManager);
}

export function* watchLogin() {
  yield takeLatest(aT.login.man.LOGIN_MAN, loginStartManager);
}

export function* watchLoginCompleted() {
  yield takeLatest(aT.login.man.LOGIN_COMPLETE_MAN, loginCompletedManager);
}


export function* watchViewInit() {
  yield takeLatest(aT.login.man.LOAD_PAGE_DATA_MAN, loadPageDataManager);
}

export function* watchVerifyEmail() {
  console.log('Sagas login watchVerifyEmail start')
  yield takeLatest(aT.login.man.VERIFY_EMAIL_MAN, verifyEmailManager)
  console.log('Sagas login watchVerifyEmail end')
}

function* rootSaga() {
  yield all([
    watchLogin(),
    watchLoginCompleted(),
    watchDevLogin(),
    watchViewInit(), // Only used to jump to view
    watchVerifyEmail()

  ]);
}

export default rootSaga;
