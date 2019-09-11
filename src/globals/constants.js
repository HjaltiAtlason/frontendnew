import { get } from 'https';


export const userTokens = {
  kalli: { token: '6913b34a1645a06c64a85c6fcae7b861ac6cfba0', id: 1 },
  erling: { token: '11244f454847e124d5fdac463703006449065f34', id: 2 },
  joi: { token: 'c4d86aa09bf6d982c270f725d13d298e75a62c4f', id: 3 }
};


export const isDev = () => {  
  const ISDEV = (sessionStorage.getItem('ISDEV') === 'true');
  if (ISDEV) { return true; }
  const ISDEV2 = (localStorage.getItem('ISDEV') === 'true');
  if (ISDEV2) { return true; }
  return false
};

export const onHeroku = `${JSON.stringify(process.env.ON_HEROKU)  }_LÁNTAKI`





export const apiDomain = () => {
  return isDev() ? 'http://127.0.0.1:8000' : 'https://jafnapi.herokuapp.com';
}

export const getApi = (path) => {
  return apiDomain() + path;
};


export const success = (actionType) => {
  return `${actionType}/SUCCESS`;
};
export const fail = (actionType) => {
  return `${actionType}/FAIL`;
};
export const createAction = (actionType) => {
  return {
    self: actionType,
    success: success(actionType),
    fail: fail(actionType)
  };
};

// TODO: Refactor actions now that the nav keyword has been invented!
// This also affects sagas since we will have manager sagas and navigation sagas.

export const aT = {
  apply: {
    // Manager is the king of a page, many navs could be used to navigate it.
    man: {
      LOAN_START_FORM_MAN: 'LOAN_START_FORM',
      APPLY_FOR_LOAN_MAN: 'APPLY_FOR_LOAN_MAN',
      LOAN_OFFER_DETAILS_MAN: 'LOAN_OFFER_DETAILS_MAN',
      ACCEPT_LOAN_OFFER_MAN: 'ACCEPT_LOAN_OFFER_MAN',
      SUBMIT_VERIFY_DATA_MAN: 'SUBMIT_VERIFY_DATA_MAN',
      TAKE_LOAN_STOP_FUNDING_MAN: 'TAKE_LOAN_STOP_FUNDING_MAN',
      SIGN_LOAN_MAN: 'SIGN_LOAN_MAN',
      SIGN_LOAN_CHECKER_MAN: 'SIGN_LOAN_CHECKER_MAN'      
    },
    api: {
      // The application progress
      APPLY_FOR_LOAN_STEP_10_POST: 'APPLY_FOR_LOAN_STEP_10_POST',                               // moves to loan offers
      ACCEPT_OFFER_STEP_20_POST: 'ACCEPT_OFFER_STEP_20_POST',      
      SIGN_LOAN_STEP_25_POST: 'SIGN_LOAN_STEP_25_POST',                             // moves to account view                   
      VERIFY_DATA_STEP_30_POST: 'VERIFY_DATA_STEP_30_POST',                           // moves to funding view                  
      OFFER_PAYMENTS_REQUEST: 'OFFER_PAYMENTS_REQUEST',
      // Note discrepancy between name and text one fits with implementation
      // other to fits with intuition. These are GET requests.
      REJECT_OFFER_POST: 'REJECT_OFFER_REQUEST',
      DOCUMENT_STATUS_REQUEST: 'DOCUMENT_STATUS_REQUEST',

      IN_LOAN_OFFER_DATA_REQUEST: 'IN_LOAN_OFFER_DATA_REQUEST',
      IN_VERIFICATION_DATA_REQUEST:'IN_VERIFICATION_DATA_REQUEST',
      IN_FUNDING_VIEW_DATA_REQUEST:'IN_FUNDING_VIEW_DATA_REQUEST',      
      IN_SIGNING_VIEW_DATA_REQUEST:'IN_SIGNING_VIEW_DATA_REQUEST',
      IS_LOAN_SIGNED_REQUEST:'IS_LOAN_SIGNED_REQUEST'      
    },
    // Navigation within the page is done by these smaller actions.
    nav: {
      SELECT_LOAN_NAV: 'SELECT_LOAN_NAV'
    },
    store: {      
      LOAN_PARAMETERS_A_STORE: 'LOAN_PARAMETERS_A_STORE',  // stores data from loan_start_form
      LOAN_PARAMETERS_B_STORE: 'LOAN_PARAMETERS_B_STORE',   // stores data from user_info_form
      SENT_FILE_NAME_STORE:'SENT_FILE_NAME_STORE',
      BANK_INFO_STORE:'BANK_INFO_STORE',
      LOAN_OFFER_SELECT_STORE: 'LOAN_OFFER_SELECT_STORE'
    }
  },
  invest: {
    man: {
      PERSONAL_INFO_MAN: 'PERSONAL_INFO_MAN',
      ADD_FUNDS_FORM_MAN: 'ADD_FUNDS_FORM_MAN'
    },
    api: {
      PAYMENTS_REQUEST: 'PAYMENTS_REQUEST',
      PAYMENT_REQUEST: 'PAYMENT_REQUEST',
      ACCOUNT_SETTINGS_POST: 'ACCOUNT_SETTINGS_POST',
      LOANS_IN_FUNDING_REQUEST: 'LOANS_IN_FUNDING_REQUEST',
      BUY_NOTES_POST: 'BUY_NOTES_POST',
      ACTIONS_REQUEST: 'ACTIONS_REQUEST',
      ACCOUNT_WALLET_REQUEST: 'ACCOUNT_WALLET_REQUEST',
      ACCOUNT_PORTFOLIO_REQUEST: 'ACCOUNT_PORTFOLIO_REQUEST',
      ACCOUNT_PROFIT_REQUEST: 'ACCOUNT_PROFIT_REQUEST'
      
    }
  },
  login: {
    man: {
      LOGIN_MAN: 'LOGIN_MAN',
      DEV_LOGIN_MAN: 'DEV_LOGIN_MAN',
      PERSONAL_INFO_VIEW_MAN: 'PERSONAL_INFO_VIEW_MAN',
      LOAD_PAGE_DATA_MAN: 'LOAD_PAGE_DATA_MAN',
      LOGIN_COMPLETE_MAN: 'LOGIN_COMPLETE_MAN',
      VERIFY_EMAIL_MAN:'VERIFY_EMAIL_MAN'
    },
    api: {
      USER_INFO_PUT: 'USER_INFO_PUT',
      USER_REQUEST: 'USER_REQUEST',
      LOGIN_GUID_REQUEST: 'LOGIN_GUID_REQUEST',
      LOGIN_AUTHENTICATE_REQUEST: 'LOGIN_AUTHENTICATE_REQUEST',
      LOGIN_COMPLETION_B_REQUEST: 'LOGIN_COMPLETION_B_REQUEST',
      LOGIN_COMPLETION_I_REQUEST: 'LOGIN_COMPLETION_I_REQUEST',
      DEV_LOGIN_AUTHENTICATE_POST: 'DEV_LOGIN_AUTHENTICATE_POST',
      VERIFY_EMAIL_POST: 'VERIFY_EMAIL_POST',
      IS_EMAIL_VERIFIED_REQUEST: 'IS_EMAIL_VERIFIED_REQUEST',
      test: {
        CALL_EMAIL_CALLBACK_REQUEST: 'CALL_EMAIL_CALLBACK_REQUEST'
      }

    },
    store: {      
      CHANGE_VIEW_STORE: 'CHANGE_VIEW_STORE'
    },

    // if this has a namespace it is called 'util' or 'misc'    
    BECOME_JAFNA_MEMBER: 'BECOME_JAFNA_MEMBER',

    LOGIN_FAILED: 'LOGIN_FAILED',
    VIEW_DATA_FAIL: 'VIEW_DATA_FAIL',
    GENERIC_ERROR: 'GENERIC_ERROR' // This is maybe an antipattern!


  },
  mock: { // Maybe this should be a subspace of the above like man
    UPLOAD_LOANS_REQUEST: 'UPLOAD_LOANS_REQUEST',
    RESTART_LOGIN: 'RESTART_LOGIN',
    LOAD_MOCK_ACCOUNT_DATA: 'LOAD_MOCK_ACCOUNT_DATA',
    LOAD_MOCK_DOCUMENTS_DATA: 'LOAD_MOCK_DOCUMENTS_DATA',
    LOAD_MOCK_INVESTOR_PORTFOLIO_DATA: 'LOAD_MOCK_INVESTOR_PORTFOLIO_DATA',
    LOAD_MOCK_LOAN_DATA: 'LOAD_MOCK_LOAN_DATA',
    LOAD_MOCK_NOTES_DATA: 'LOAD_MOCK_NOTES_DATA',
    LOAD_MOCK_PAYMENTS_DATA: 'LOAD_MOCK_PAYMENTS_DATA',
    LOAD_MOCK_USER_DATA: 'LOAD_MOCK_USER_DATA',
    UNLOAD_MOCK_ACCOUNT_DATA: 'UNLOAD_MOCK_ACCOUNT_DATA',
    UNLOAD_MOCK_DOCUMENTS_DATA: 'UNLOAD_MOCK_DOCUMENTS_DATA',
    UNLOAD_MOCK_INVESTOR_PORTFOLIO_DATA: 'UNLOAD_MOCK_INVESTOR_PORTFOLIO_DATA',
    UNLOAD_MOCK_LOAN_DATA: 'UNLOAD_MOCK_LOAN_DATA',
    UNLOAD_MOCK_NOTES_DATA: 'UNLOAD_MOCK_NOTES_DATA',
    UNLOAD_MOCK_PAYMENTS_DATA: 'UNLOAD_MOCK_PAYMENTS_DATA',
    UNLOAD_MOCK_USER_DATA: 'UNLOAD_MOCK_USER_DATA'
  }
};

export const sections = {
  INVEST: 'INVEST',
  APPLY: 'APPLY'
};

export const selectYesNo = [
  { key: 1, description: 'Veldu...' },
  { key: 2, description: 'Já' },
  { key: 3, description: 'Nei' }
];

export const apiRelativePath = {
  // from login
  loginGuid: '/user/utils/generate_uuid/',
  loginAuthenticate: '/user/login/authenticate/?loginguid=',
  loginCompletedB: '/user/login/complete/b/?loginguid=',
  loginCompletedI: '/user/login/complete/i/?loginguid=',  
  devLoginB: '/dev/login/ocomplete/b/?username=', // create new empty user username = 0072804400
  devLoginI: '/dev/login/complete/i/?username=', // create new empty user username = 0072804400  
  devLoginAuthenticate:'/dev/login/authenticate/',
  personalInfo: '/user/personal_info/', // POST, GET
  verifyEmail: '/user/email/verify_email/', // POST
  isEmailVerified: '/user/email/is_email_verified/', // GET




  // from apply
  // loans: '/db/loans/',     // GET
  upload: '/media/upload',
  applyForLoanStep: '/apply/step/apply_for_loan_10/', // POST 
  inLoanOfferData: '/apply/step/loan_signed_20/in_select_offer_data/', // GET  
  loanOfferDetails: '/apply/step/loan_signed_20/loan_offer_details_data/', // GET
  loanOfferAcceptStep: '/apply/step/loan_signed_20/offer_selected/', // POST
  inSigningData: '/apply/step/loan_signed_20/in_signing_data/', // GET
  isLoanSigned: '/apply/step/loan_signed_20/is_signed/', // GET
  inVerificationData: '/apply/step/verify_application_30/page_data/', // GET
  dataToVerifySubmittedStep: '/apply/step/verify_application_30/submit_data/',    // POST
  cancelLoan: '/apply/step/cancel_loan_application_400/',
  
  inFundingData: '/apply/step/in_funding_40/page_data/',  // GET

  // from investor
  payments: '/db/payments/',   // GET  
  loansInFunding: '/investor/loans_in_funding/', // GET
  buyNotes: '/investor/buy_notes/', // POST
  getActions: '/investor/get_actions/', // GET
  getAccountWallet: '/investor/account/wallet/', // GET
  getAccountPortfolio: '/investor/account/portfolio/', // GET
  getAccountProfit: '/investor/account/profit/', // GET
  accountSettings: '/investor/account/settings/',  // POST


  // from dev
  uploadLoans: '/dev/loans/populate_database/',  // GET
  callEmailCallback: '/user/email/email_callback/' // GET


};

// request
export const actionToApi = (action) => {
  switch (action) {
    case aT.login.api.USER_REQUEST: return getApi(apiRelativePath.personalInfo);
    case aT.login.api.USER_INFO_PUT: return getApi(apiRelativePath.personalInfo);
    case aT.login.api.LOGIN_GUID_REQUEST: return getApi(apiRelativePath.loginGuid);
    case aT.login.api.LOGIN_AUTHENTICATE_REQUEST: return getApi(apiRelativePath.loginAuthenticate);
    case aT.login.api.LOGIN_COMPLETION_B_REQUEST: return getApi(apiRelativePath.loginCompletedB);
    case aT.login.api.LOGIN_COMPLETION_I_REQUEST: return getApi(apiRelativePath.loginCompletedI);
    case aT.login.api.DEV_LOGIN_AUTHENTICATE_POST: return getApi(apiRelativePath.devLoginAuthenticate);
    case aT.login.api.VERIFY_EMAIL_POST: return getApi(apiRelativePath.verifyEmail);
    case aT.login.api.IS_EMAIL_VERIFIED_REQUEST: return getApi(apiRelativePath.isEmailVerified);
    // login test email
    case aT.login.api.test.CALL_EMAIL_CALLBACK_REQUEST: return getApi(apiRelativePath.callEmailCallback)

    // From apply
    case aT.apply.api.APPLY_FOR_LOAN_STEP_10_POST: return getApi(apiRelativePath.applyForLoanStep);
    case aT.apply.api.ACCEPT_OFFER_STEP_20_POST: return getApi(apiRelativePath.loanOfferAcceptStep);
    case aT.apply.api.VERIFY_DATA_STEP_30_POST: return getApi(apiRelativePath.dataToVerifySubmittedStep)                           // moves to funding view
    

    case aT.apply.api.IN_VERIFICATION_DATA_REQUEST: return getApi(apiRelativePath.inVerificationData);
    // case aT.apply.api.LOAN_REQUEST: return getApi(apiRelativePath.loans);    
    case aT.apply.api.IN_LOAN_OFFER_DATA_REQUEST: return getApi(apiRelativePath.inLoanOfferData);
    case aT.apply.api.OFFER_PAYMENTS_REQUEST: return getApi(apiRelativePath.loanOfferDetails);
    case aT.apply.api.IN_FUNDING_VIEW_DATA_REQUEST: return getApi(apiRelativePath.inFundingData);
    case aT.apply.api.IN_SIGNING_VIEW_DATA_REQUEST: return getApi(apiRelativePath.inSigningData);
    case aT.apply.api.IS_LOAN_SIGNED_REQUEST: return getApi(apiRelativePath.isLoanSigned)
    
    // from investor
    case aT.invest.api.PAYMENT_REQUEST: return getApi(apiRelativePath.payments)
    case aT.mock.UPLOAD_LOANS_REQUEST: return getApi(apiRelativePath.uploadLoans)
    case aT.invest.api.ACCOUNT_SETTINGS_POST: return getApi(apiRelativePath.accountSettings)
    case aT.invest.api.BUY_NOTES_POST: return getApi(apiRelativePath.buyNotes)
    case aT.invest.api.LOANS_IN_FUNDING_REQUEST: return getApi(apiRelativePath.loansInFunding)
    case aT.invest.api.ACCOUNT_PROFIT_REQUEST: return getApi(apiRelativePath.getAccountProfit)
    case aT.invest.api.ACCOUNT_WALLET_REQUEST: return getApi(apiRelativePath.getAccountWallet)
    case aT.invest.api.ACCOUNT_PORTFOLIO_REQUEST: return getApi(apiRelativePath.getAccountPortfolio)
    case aT.invest.api.ACTIONS_REQUEST: return getApi(apiRelativePath.getActions)

    
    default: return '';
  }
};

