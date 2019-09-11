import { combineReducers } from 'redux';

import applyInfo from './applyInfo';
import offerPayments from './offerPayments';
import loanOffer from './loanOffer';
import verification from './verification';
import signing from './signing';
import funding from './funding';


export default combineReducers({
  loanOffer,
  offerPayments,
  applyInfo,
  verification,
  signing,
  funding
});
