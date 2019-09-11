import { aT, success } from '../../globals/constants';
import { loanPurposes } from '../../apply/constants';

const initialState = {
  riskAppetite: 50,  // number from 0 100 with 100 highest,
  filterDaysLeft: -10,
  filterMinFunded: -10,
  filterCreditRating: -1,
  filterPurpose: loanPurposes[1],
  startAmount: -1
};

export default (state = initialState, action) => {
  switch (action.type) {
    case aT.invest.api.ACCOUNT_SETTINGS_POST: {
      console.log('reducer ACCOUNT_SETTINGS_POST sent') 
      return state;        
    }
    case success(aT.invest.api.ACCOUNT_SETTINGS_POST): {
      console.log('reducer ACCOUNT_SETTINGS_POST success, payload', action.payload) 
      return {
        ...state,
        riskAppetite: action.payload.riskAppetite,
        filterDaysLeft: action.payload.filterDaysLeft,
        filterCreditRating: action.payload.filterCreditRating,
        filterPurpose: action.payload.filterPurpose,
        filterMinFunded: action.payload.filterMinFunded,
        startAmount: action.payload.startAmount
      };
    }    
    default:
      return state;
  }
};

// Selectors
export const getRiskAppetite = (state) => {
  return state.invest.accountSettings.riskAppetite;
};
