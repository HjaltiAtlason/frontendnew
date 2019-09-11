import { aT } from '../../globals/constants';


// None of these functions are being used anywhere
// they are all superseded by sagas.

// Also the names of the functions are wrong considering
// which actions they are dispatching. See issue #74.


export function getLoanOfferPaymentsToMan(id) {
  return {
    type: aT.apply.man.LOAN_OFFER_DETAILS_MAN,
    payload: id    
  };
}

export function acceptLoanOfferToMan(loanOfferId) {
  return {
    type: aT.apply.man.ACCEPT_LOAN_OFFER_MAN,
    payload: loanOfferId    
  };
}

// Since this function starts a manager it is being used.
export function loanStartDataToMan(data) {
  return {
    type: aT.apply.man.LOAN_START_FORM_MAN,
    payload: data
  };
}
