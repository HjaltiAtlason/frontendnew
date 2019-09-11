import { aT } from '../../globals/constants';

// Fetch single note with id noteId
export function saveInvestor(values) {
  return (dispatch) => {
    dispatch({
      type: aT.invest.man.PERSONAL_INFO_MAN,
      payload: values
    });
  };
}

// Changes filters and global settings of the investor
export function accountSettings(values) {
  return (dispatch) => {
    dispatch({
      type: aT.invest.api.ACCOUNT_SETTINGS_POST,
      payload: values
    });
  };
}

// Check if investor has added more funds!
export function checkFundingStatus(values) {
  return (dispatch) => {
    dispatch({
      type: aT.invest.api.ACCOUNT_WALLET_REQUEST,
      payload: values
    });
  };
}