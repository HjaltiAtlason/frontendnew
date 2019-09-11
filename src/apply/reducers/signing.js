import { aT, success } from '../../globals/constants';

const initialState = {
  isLoanSigned: false,
  urlFromDokobit: ''
};



export default (state = initialState, action) => {
  switch (action.type) {
    case aT.apply.api.IN_SIGNING_VIEW_DATA_REQUEST: {
      console.log('reducer IN_SIGNING_VIEW_DATA_REQUEST sent') 
      return state;     
    }
    case success(aT.apply.api.IN_SIGNING_VIEW_DATA_REQUEST): {
      console.log('reducer IN_SIGNING_VIEW_DATA_REQUEST receved payload: %s testing', action.payload)
      return {
        ...state,
        urlFromDokobit: action.payload.iframe_url
      };
    }    
    case aT.apply.api.IS_LOAN_SIGNED_REQUEST: {
      console.log('reducer IS_LOAN_SIGNED_REQUEST sent') 
      return state;     
    }
    case success(aT.apply.api.IS_LOAN_SIGNED_REQUEST): {
      console.log('reducer IS_LOAN_SIGNED_REQUEST receved payload:', action.payload)
      return {
        ...state,
        isLoanSigned: action.payload.is_loan_signed
      };
    }    
    default:
      return state;
  }
};

export const getIsLoanSigned = (state) => {  
  return state.apply.signing.isLoanSigned;
};
export const getUrlFromDokobit = (state) => {  
  return state.apply.signing.urlFromDokobit;
};
