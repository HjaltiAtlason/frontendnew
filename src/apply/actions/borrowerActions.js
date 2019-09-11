import { aT } from '../../globals/constants';


export function saveApplyInfoToStore(applyInfo) {
  return {
    type: aT.apply.store.LOAN_PARAMETERS_B_STORE,
    payload: applyInfo    
  };
}

export function manApplyForLoan(applyInfo) {
  return {    
    type: aT.apply.man.APPLY_FOR_LOAN_MAN,
    payload: applyInfo    
  };
}

export function manVerifySubmit(verifyData){
  return {
    type: aT.apply.man.SUBMIT_VERIFY_DATA_MAN,
    payload: verifyData
  }
}

export function manTakeLoan(){
  return {
    type: aT.apply.man.TAKE_LOAN_STOP_FUNDING_MAN    
  }
}

export function manSignLoan(){
  return {
    type: aT.apply.man.SIGN_LOAN_MAN
  }
}

export function saveSentFileToStore(sentFile)
{
  return {
    type: aT.apply.store.SENT_FILE_NAME_STORE,
    payload: sentFile    
  };
}

export function storeSaveBankInfo(values)
{
  return {
    type: aT.apply.store.BANK_INFO_STORE,
    payload: values    
  };
}



