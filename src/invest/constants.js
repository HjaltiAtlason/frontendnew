import { aT } from '../globals/constants';

const investorViewKeys = {
  ADD_FUNDS: 'ADD_FUNDS',
  BUY_NOTES: 'BUY_NOTES',
  PORTFOLIO: 'PORTFOLIO',
  PAYMENTS: 'PAYMENT',
  INVESTOR_ACCOUNT: 'INVESTOR_ACCOUNT',
  PERSONAL_INFO: 'PERSONAL_INFO'
};

// ToDo if userinfo is filled out then start in add funds
export const stepToViewKeys = (event) => {
  switch (event) {
    case 'TransferedToBank': return investorViewKeys.BUY_NOTES;  // Investor has transfered funds
    case 'noInvestorSteps': return investorViewKeys.PERSONAL_INFO;
    default: return investorViewKeys.PERSONAL_INFO;
  }
};

export const viewKeyToActions = (event) => {
  switch (event) {
    case investorViewKeys.PERSONAL_INFO: return aT.login.api.USER_REQUEST;
    case investorViewKeys.BUY_NOTES: return aT.invest.api.VIEW_NOTES_FORM;   
    default: return 'viewKey unknown';
  }
};

export default investorViewKeys