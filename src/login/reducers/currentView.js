import { aT } from '../../globals/constants';
import { applicantViewKeys } from '../../apply/constants';


const initialState = {
  viewKey: applicantViewKeys.LOAN_AMOUNT
};

export default (state = initialState, action) => {
  switch (action.type) {
    case aT.login.store.CHANGE_VIEW_STORE: {
      return Object.assign({}, state, {
        viewKey: action.viewKey
      });
    }
    default:
      return state;
  }
};

/*
export const getInLogin = (state) => {
  return state.login.currentView.inLogin
 // return state.login.user.token
}
*/



