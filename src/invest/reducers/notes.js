import { aT } from '../../globals/constants';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case aT.mock.LOAD_MOCK_NOTES_DATA: {
      return [
        {
          loanId: 202001,
          interestRate: 0.08,
          creditScore: 'C1',
          loanPrincipalAmt: 1000000,
          notePrincipalAmt: 25000,
          otherLoans: 0,
          paymentRatio: 0.5,
          loanHistory: 0,
          loanPurpose: 1,
          daysLeft: 15,
          noteDate: '2018-10-10T00:00:00.000Z',
          loanStatus: 'í skilum',
          remainingPrincipalAmt: 20000,
          adjustedPrincipalAmt: 18500,
          paymentsLeft: '15(36)',
          serviceFeesAmt: 80,
          lateFeesAmt: 200,
          collectionFeesAmt: 0,
          noteInterestPaidAmt: 2500,
          notePrincipalPaidAmt: 5000
        },
        {
          loanId: 202006,
          interestRate: 0.12,
          creditScore: 'C1',
          loanPrincipalAmt: 1000000,
          notePrincipalAmt: 25000,
          otherLoans: 2,
          paymentRatio: 0.7,
          loanHistory: 0,
          loanPurpose: 2,
          daysLeft: 10,
          noteDate: '2018-10-10T00:00:00.000Z',
          loanStatus: '15 daga seint',
          remainingPrincipalAmt: 20000,
          adjustedPrincipalAmt: 18500,
          paymentsLeft: '15(36)',
          serviceFeesAmt: 80,
          lateFeesAmt: 50,
          collectionFeesAmt: 1000,
          noteInterestPaidAmt: 2500,
          notePrincipalPaidAmt: 5000
        }
      ];
    }
    case aT.mock.UNLOAD_MOCK_NOTES_DATA: {
      return initialState;
    }
    default:
      return state;
  }
};
