import { aT, success } from '../../globals/constants';

// Similar changes as to loan reducer.
// Make the top level what is in myOffers (for individual offer)
// Then add a bool field for it that makes it selected.
// fields = ('id','principal','durationMonths','interestRate', 'AHK', 'monthlyPayments')


const initialState = {
  offerSelectedId: null,
  myOffers: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case success(aT.apply.api.IN_LOAN_OFFER_DATA_REQUEST): {        
      return {
        ...state,
        myOffers: action.payload.v_offers,
        creditRating: action.payload.creditRating
      };
    }
    case aT.apply.store.LOAN_OFFER_SELECT_STORE: {      
      return {
        ...state,
        offerSelectedId: action.payload
      };
    }
    case aT.apply.api.ACCEPT_OFFER_STEP_20_POST: {            
      console.log('reducer ACCEPT_OFFER_STEP_20_POST')
      return {
        ...state
      };
    }
    case success(aT.apply.api.ACCEPT_OFFER_STEP_20_POST): {            
      console.log('reducer ACCEPT_OFFER_STEP_20_POST success')
      return {
        ...state        
      };
    }
    default: {
      return state;
    }
  }
};

// Selectors
export const getSelectedOfferId = (state) => {
  return state.apply.loanOffer.offerSelectedId;
};
export const getOffers = (state) => {
  return state.apply.loanOffer;
};
export const getCreditRating = (state) => {
  return state.apply.loanOffer.creditRating
}
