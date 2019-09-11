import { aT, success } from '../../globals/constants';

const initialState = {
  averageInterestRate: 0,
  totalAccountValueAmt: 0,
  interestReceivedAmt: 0,
  principalReceivedAmt: 0,
  lateFeesReceivedAmt: 0,
  netRecoveriesRecivedAmt: 0,
  totalReceivedAmt: 0,
  freeCashAmt: 0,
  commitedCashAmt: 0,
  outstandingPrincipalAmt: 0,
  estimatedFutureLossAmt: 0,
  totalAccountEstimateAmt: 0,
  nettoFromBank: 0,
  numTotalLoans: 0,
  numLoansFullyPaid: 0,
  numLoansCommited: 0,
  numLoansCurrent: 0,
  numLoansInGrace: 0,
  numLoansInSub30: 0,
  numLoansInSub90: 0,
  numLoansInDefault: 0,
  numLoansWrittenOff: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case aT.mock.LOAD_MOCK_ACCOUNT_DATA: {
      return {
        averageInterestRate: 0.0875,
        totalAccountValueAmt: 1256000,
        interestReceivedAmt: 189021,
        principalReceivedAmt: 658500,
        lateFeesReceivedAmt: 3000,
        netRecoveriesRecivedAmt: 0,
        totalReceivedAmt: 850521,
        freeCashAmt: 325000,
        commitedCashAmt: 25000,
        outstandingPrincipalAmt: 931000,
        estimatedFutureLossAmt: -53000,
        totalAccountEstimateAmt: 1203000,
        numTotalLoans: 21,
        numLoansFullyPaid: 5,
        numLoansCommited: 1,
        numLoansCurrent: 12,
        numLoansInGrace: 1,
        numLoansInSub30: 0,
        numLoansInSub90: 0,
        numLoansInDefault: 1,
        numLoansWrittenOff: 1
      };
    }
    case success(aT.invest.api.ACCOUNT_WALLET_REQUEST): {
      console.log('reducer account ACCOUNT_WALLET_REQUEST success, payload', action.payload) 
      return {
        ...state,
        averageInterestRate: action.payload.averageInterestRate,
        totalAccountValueAmt: action.payload.totalAccountValueAmt,
        interestReceivedAmt: action.payload.interestReceivedAmt,
        principalReceivedAmt: action.payload.principalReceivedAmt,
        lateFeesReceivedAmt: action.payload.lateFeesReceivedAmt,
        netRecoveriesRecivedAmt: action.payload.netRecoveriesRecivedAmt,
        totalReceivedAmt: action.payload.totalReceivedAmt,
        freeCashAmt: action.payload.freeCashAmt,
        commitedCashAmt: action.payload.commitedCashAmt,
        outstandingPrincipalAmt: action.payload.outstandingPrincipalAmt,
        estimatedFutureLossAmt: action.payload.estimatedFutureLossAmt,
        totalAccountEstimateAmt: action.payload.totalAccountEstimateAmt,
        nettoFromBank: action.payload.nettoFromBank,
        numTotalLoans: action.payload.numTotalLoans,
        numLoansFullyPaid: action.payload.numLoansFullyPaid,
        numLoansCommited: action.payload.numLoansCommited,
        numLoansCurrent: action.payload.numLoansCurrent,
        numLoansInGrace: action.payload.numLoansInGrace,
        numLoansInSub30: action.payload.numLoansInSub30,
        numLoansInSub90: action.payload.numLoansInSub90,
        numLoansInDefault: action.payload.numLoansInDefault,
        numLoansWrittenOff: action.payload.numLoansWrittenOff
      }
    }

    case aT.mock.UNLOAD_MOCK_ACCOUNT_DATA: {
      return initialState;
    }
    default:
      return state;
  }
};

// Selectors
export const isFreeCash = (state) => {
  return state.invest.account.freeCashAmt > 0;
};
