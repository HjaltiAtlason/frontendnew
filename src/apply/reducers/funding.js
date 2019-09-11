import { aT, success } from '../../globals/constants';

const initialState = {
  fundingPercentage: '',  
  daysLeft: ''
};



export default (state = initialState, action) => {
  switch (action.type) {
    case aT.apply.api.IN_FUNDING_VIEW_DATA_REQUEST: {
      console.log('reducer IN_FUNDING_VIEW_DATA_REQUEST sent') 
      return state;     
    }
    case success(aT.apply.api.IN_FUNDING_VIEW_DATA_REQUEST): {
      console.log('reducer IN_FUNDING_VIEW_DATA_REQUEST receved payload:', action.payload)
      return {
        ...state,
        fundingPercentage: action.payload.fundingPercentage,
        daysLeft: action.payload.daysLeft
      };
    }            
    default:
      return state;
  }
};


export const getFundingStatus = (state) => {  
  return state.apply.funding;
};
