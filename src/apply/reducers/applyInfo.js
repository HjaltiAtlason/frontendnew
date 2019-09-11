import { aT, success } from '../../globals/constants';

// This reducer collect all the information need to apply for loan and timestamps it
// appart from common user info that is shared with investor
const initialState = {
  requestedAmount: 0,
  requestedDurationMonths: 0,
  purpose: '',
  totalPaymentsVsSalaryRatio: 0, // this should be calculated on backend?
  borrowerId: null,
  isHomeOwner: null,
  sameJobYears: 0,
  salary: 0,
  fieldOfWork: '',
  education: '',
  step: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case aT.mock.LOAD_MOCK_APPLY_INFO: {
      return {
        ...state,
        requestedAmount: 825,
        requestedDurationMonths: 24,
        isHomeOwner: true,
        sameJobYears: 4,
        salary: 500000,
        totalPaymentsVsSalaryRatio: 0,
        fieldOfWork: '',
        education: '',
        purpose: 'Utanlandsferð'
      };
    }    
    case aT.apply.store.LOAN_PARAMETERS_A: {
      return {
        ...state,
        requestedAmount: action.payload.principalRequested * 1000,
        requestedDurationMonths: action.payload.durationRequested,
        purpose: action.payload.purpose
      };
    }
    case aT.apply.store.LOAN_PARAMETERS_B: {
      return {
        ...state,
        isHomeOwner: action.payload.isHomeOwner,
        salary: action.payload.salary
      };
    }
    default: return state;
  }
};


export const getApplyInfo = (state) => {
  return state.apply.applyInfo;
};

