import { aT } from '../../globals/constants';

export function getPayment(paymentId) {
  return (dispatch) => {
    dispatch({
      type: aT.apply.api.PAYMENT_REQUEST,
      payload: paymentId
    });
  };
}

export function getPayments() {
  return (dispatch) => {
    dispatch({
      type: aT.apply.api.PAYMENTS_REQUEST
    });
  };
}
