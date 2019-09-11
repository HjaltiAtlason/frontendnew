import { takeLatest, put, all, take } from 'redux-saga/effects';
import { aT, createAction } from '../../globals/constants';
import investorViewKeys from '../constants';




export function* personalInfoManager(data) {     
  console.log('Investor saga personalInfoManager payload', data.payload)   
  const action = createAction(aT.login.api.USER_INFO_PUT)
  yield put({ type: action.self, payload: data.payload });
  yield take(action.success);
  
  // yield put({ type: aT.login.store.CHANGE_VIEW_STORE, viewKey: investorViewKeys.ADD_FUNDS });
}

export function* watchPersonalInfo() {
  yield takeLatest(aT.invest.man.PERSONAL_INFO_MAN, personalInfoManager);
}

function* rootSaga() {
  yield all([
    watchPersonalInfo()
  ])
}

export default rootSaga;