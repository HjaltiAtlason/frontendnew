import { aT, success, fail } from '../../globals/constants';

const initialState = {
  loanOfferId: null,
  offerPaymentsArray: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case aT.apply.api.OFFER_PAYMENTS_REQUEST: {
      console.log('reducer OFFER_PAYMENTS_REQUEST sent')
      return {
        ...state,
        loanOfferId: action.payload.loanOfferId
      };
    }
    case success(aT.apply.api.OFFER_PAYMENTS_REQUEST): {
      console.log('reducer OFFER_PAYMENTS_REQUEST success')
      return {
        ...state,
        offerPaymentsArray: action.payload.payments,
        loanOfferId: action.payload.loanOfferId
      };
    }
    case fail(aT.apply.api.OFFER_PAYMENTS_REQUEST): {
      return {
        ...state,
        requestedId: null // would be best to have the previous ID
      };
    }
    default:
      return state;
  }
};

// Selectors
export const getOfferPayments = (state) => {
  return state.apply.offerPayments.offerPaymentsArray;
};

