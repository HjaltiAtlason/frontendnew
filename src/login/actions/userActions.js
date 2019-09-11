import { aT } from '../../globals/constants';

export function saveCommonUserToApi(formValue) {
  return {
    type: aT.login.api.USER_INFO_PUT,       
    payload: formValue    
  };
}

export function loginToIslandToMan(isBorrower) {
  return {
    type: aT.login.man.LOGIN_MAN,
    payload: isBorrower              
  }
};
 
export function loginCompletedToMan(data) {
  return {
    type: aT.login.man.LOGIN_COMPLETE_MAN,
    payload: data    
  }
}

export function devLoginToMan(data) {
  return {
    type: aT.login.man.DEV_LOGIN_MAN,
    payload: data          
  };
}

export function becomeJafnaMember() {
  return {type: aT.login.BECOME_JAFNA_MEMBER};
}

export function manVerifyEmail(data) {
  console.log('inside manVerifyEmail', data)
  return {type: aT.login.man.VERIFY_EMAIL_MAN, payload: data};
}

export function getEmailCallback(data) {
  console.log('inside getEmailCallback payload:', data)
  return {type: aT.login.api.test.CALL_EMAIL_CALLBACK_REQUEST, payload: data};
}





/*
// TODO: REPLACE with GENERIC SAGAs

// Gerir ekkert og actionid er ekki til!
export function publishData(user) {
  return (dispatch) => {
    dispatch({type: aT.PUBLISH_USER_DATA});
  };
}

// Gerir ekkert og actionid er ekki til!
export function prepareData(data) {
  return {type: aT.PREPARE_USER_DATA, payload: data};
}

// Gerir ekkert.

*/
