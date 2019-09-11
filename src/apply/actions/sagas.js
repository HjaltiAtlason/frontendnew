import { take, put, all, takeLatest, select, delay  } from 'redux-saga/effects';
import { aT, createAction } from '../../globals/constants';
import { applicantViewKeys } from '../constants';
import { getUser } from '../../login/reducers/user'
import { getApplyInfo } from '../reducers/applyInfo'
import { getIsLoanSigned } from '../reducers/signing';
import { max } from 'moment';
import { getBankInfo } from '../reducers/verification';



// Managers - abstract the nitty gritty of backend communication

// Add loanInfo the the applyInfo store
// payload : {requestedAmount, requestedDurationMonths, purpose}
export function* LoanStartManager(action) {  
  yield put({ type: aT.apply.store.LOAN_PARAMETERS_A_STORE, payload: action.payload });  
  yield put({ type: aT.login.store.CHANGE_VIEW_STORE, viewKey: applicantViewKeys.MY_INFO });
}


// action = payload {applyInfo}
export function* applyForLoanManager(action) {
  // Save apply for loan to store  
  console.log('sagas applyForLoanManager start payload %s' , action.payload)
  const toStore = createAction(aT.apply.store.LOAN_PARAMETERS_B_STORE)
  yield put({type: toStore.self, payload: action.payload});
  

  console.log('sagas applyForLoanManager start LOAN_PARAMETERS_B success')
  // save user
  const user = yield select(getUser)
  const commonUser = createAction(aT.login.api.USER_INFO_PUT);
  yield put({ type: commonUser.self, payload: user });
  yield take(commonUser.success);
  console.log('sagas applyForLoanManager save user success')
  // call apply_for_loan
  const applyInfo = yield select(getApplyInfo)
  const loanParameters = createAction(aT.apply.api.APPLY_FOR_LOAN_STEP_10_POST);
  yield put({ type: loanParameters.self, payload: applyInfo });
  yield take(loanParameters.success);
  console.log('sagas applyForLoanManager loan parameter success')
  // get the loan_offers
  const loanOffer = createAction(aT.apply.api.IN_LOAN_OFFER_DATA_REQUEST);
  yield put({ type: loanOffer.self });
  yield take(loanOffer.success);
  console.log('sagas applyForLoanManager loanoffer success')
  yield put({ type: aT.login.store.CHANGE_VIEW_STORE, viewKey: applicantViewKeys.LOAN_TERMS });
}

export function* offerPaymentsManager(action) {
  const id = action.payload;  
  console.log('sagas offerPayments %s a id:' , id)
  const offerDetails = createAction(aT.apply.api.OFFER_PAYMENTS_REQUEST);
  yield put({ type: offerDetails.self, payload: id });
  console.log('sagas offerPayments success')
  yield take(offerDetails.success);
  
  yield put({ type: aT.apply.store.LOAN_OFFER_SELECT_STORE, payload: id });
}

export function* acceptOfferManager(action) {
  const loanOfferId = action.payload;
  console.log('sagas acceptOffer before a id: %s', loanOfferId)
  
  const acceptOffer = createAction(aT.apply.api.ACCEPT_OFFER_STEP_20_POST);
  const data = {'loanOfferId' : loanOfferId}  
  console.log('sagas acceptOffer before a data: %s', data)
  yield put({ type: acceptOffer.self, payload:data});
  console.log('sagas acceptOffer success: id: %s', loanOfferId)
  yield take(acceptOffer.success);
  
  console.log('before getting signing data')
  const myaction = createAction(aT.apply.api.IN_SIGNING_VIEW_DATA_REQUEST);  
  yield put({ type: myaction.self});
  yield take(myaction.success);
  console.log('after getting signing data')
  console.log('before changeview to signing view') 
  yield put({ type: aT.login.store.CHANGE_VIEW_STORE, viewKey: applicantViewKeys.IN_SIGNING });
  console.log('after changeview starting SIGN_LOAN_CHECKER') 
  yield put({type: aT.apply.man.SIGN_LOAN_CHECKER})
}

export function* SignLoanChecker() {
  // calling backend to check if signed
  let count = 0
  const maxCount = 5
  const checkSigningRequest = createAction(aT.apply.api.IS_LOAN_SIGNED_REQUEST)
  do {
    yield put({type: checkSigningRequest.self});
    console.log('saga SignLoanManager after put checkSigningRequest count: %s', count)
    yield delay(1000)
    const isLoanSigned = yield select(getIsLoanSigned)
    console.log('saga SignLoanManager after getIsLoanSigned count: %s, isSigned: %s', count, isLoanSigned)
    if (isLoanSigned)
      count = maxCount
    count += 1
  }
  while (count < maxCount)
}

export function* SignLoanManager() {  
  const veriRequest = createAction(aT.apply.api.IN_VERIFICATION_DATA_REQUEST);
  console.log('In signloanmanager before veriRequest') 
  yield put({ type: veriRequest.self });
  yield take(veriRequest.success);
  console.log('before changeview') 
  yield put({ type: aT.login.store.CHANGE_VIEW_STORE, viewKey: applicantViewKeys.IN_VERIFICATION });
  console.log('after changeview') 
}
  
export function* VerifySubmitManager(action) {  
  console.log('saga VerifySubmitManager start payload %s', action.payload)
  const data = yield select(getBankInfo)
  console.log('saga VerifySubmitManager data %s', data)
  const myaction = createAction(aT.apply.api.VERIFY_DATA_STEP_30_POST);
  yield put({ type: myaction.self, payload: data });  
  yield take(myaction.success);
  console.log('before VefificationSubmit sucesss')
  const fundingReq = createAction(aT.apply.api.IN_FUNDING_VIEW_DATA_REQUEST);
  console.log('In VerifySubmitManager calling IN_FUNDING_VIEW_DATA_REQUEST') 
  yield put({ type: fundingReq.self });
  yield take(fundingReq.success);
  console.log('In VerifySubmitManager calling IN_FUNDING_VIEW_DATA_REQUEST after success') 
  yield put({ type: aT.login.store.CHANGE_VIEW_STORE, viewKey: applicantViewKeys.IN_FUNDING });
}



export function* watchApplyForLoan() {
  yield takeLatest(aT.apply.man.APPLY_FOR_LOAN_MAN, applyForLoanManager);
}

export function* watchOfferPayments() {
  yield takeLatest(aT.apply.man.LOAN_OFFER_DETAILS_MAN, offerPaymentsManager);
}

export function* watchOfferAcceptance() {
  yield takeLatest(aT.apply.man.ACCEPT_LOAN_OFFER_MAN, acceptOfferManager);
}

export function* watchLoanStart() {
  yield takeLatest(aT.apply.man.LOAN_START_FORM_MAN, LoanStartManager);
}

export function* watchVerifySubmit() {
  yield takeLatest(aT.apply.man.SUBMIT_VERIFY_DATA_MAN, VerifySubmitManager);
}

export function* watchSignLoan() {
  yield takeLatest(aT.apply.man.SIGN_LOAN_MAN, SignLoanManager);
}

export function* watchSignLoanChecker() {
  yield takeLatest(aT.apply.man.SIGN_LOAN_CHECKER_MAN, SignLoanChecker);
}

// ROOT = Starts all watchers.

function* applySaga() {
  yield all([
    watchLoanStart(),
    watchApplyForLoan(),
    watchOfferAcceptance(), // Watchers start managers.
    watchOfferPayments(),
    watchVerifySubmit(),    
    watchSignLoan(),
    watchSignLoanChecker()
  ]);
}

export default applySaga;
