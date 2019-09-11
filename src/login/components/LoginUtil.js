
// We don't need "loggedIn" if store has token then that is a given

export const cLog = {
  LOGIN_GUID: 'LOGIN_GUID',
  LOGGING_IN: 'LOGGING_IN',
  CREATED: 'CREATED',
  FAILED_ATTEMPT: 'FAILED_ATTEMPT',
  LAST_CHANGE: 'LAST_CHANGE',
  IS_BORROWER: 'IS_BORROWER'
};

const _needToInitilze = () => {
  return (sessionStorage.getItem(cLog.CREATED) === null);
};
const _getDateTime = () => {
  const d = new Date();
  const n = d.toLocaleTimeString();
  return n;
};

const _resetSession = () => {
  sessionStorage.setItem(cLog.LOGIN_GUID, '');
  sessionStorage.setItem(cLog.LOGGING_IN, 'false');
  sessionStorage.setItem(cLog.LAST_CHANGE, _getDateTime());
  sessionStorage.setItem(cLog.IS_BORROWER, '');
  sessionStorage.setItem(cLog.FAILED_ATTEMPT, '');
};

export const initializeLoginSession = () => {
  _resetSession();
  sessionStorage.setItem(cLog.CREATED, _getDateTime());
};

export const tryLoginCompleted = () => {
  if (_needToInitilze()) {
    initializeLoginSession();
  }
  return (sessionStorage.getItem(cLog.LOGGING_IN) === 'true');
};

export const setLoggingIn = (loginguid) => {
  if (_needToInitilze()) {
    initializeLoginSession();
  }
  sessionStorage.setItem(cLog.LOGGING_IN, 'true');
  sessionStorage.setItem(cLog.LOGIN_GUID, loginguid);
  sessionStorage.setItem(cLog.LAST_CHANGE, _getDateTime());
};

export const setIsBorrower = (isBorrower) => {
  sessionStorage.setItem(cLog.IS_BORROWER, isBorrower);
};

export const setLoginCompletedSuccess = () => {
  _resetSession();
  sessionStorage.setItem(cLog.FAILED_ATTEMPT, 'false');
};

export const setLoginCompletedFail = () => {
  _resetSession();
  sessionStorage.setItem(cLog.FAILED_ATTEMPT, 'true');
};

