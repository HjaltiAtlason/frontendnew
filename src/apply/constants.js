import { aT } from '../globals/constants';

export const loanPurposes = [
	{ key: 1, description: 'Veldu...' },
	{ key: 2, description: 'Greiða upp lán' },
	{ key: 3, description: 'Bifreiðakaup' },
	{ key: 4, description: 'Lagfæra húsnæði' },
  { key: 5, description: 'Utanlandsferð' },
  { key: 6, description: 'Fyrirtækja tengt' },
  { key: 7, description: 'Kaupa dýran hlut' },
  { key: 8, description: 'Almenn neysla' },
  { key: 9, description: 'Stór viðburður' },
  { key: 10, description: 'Borga skatta' },
  { key: 11, description: 'Stutt lán - Brúarlán' }
];

export const vanskilaskra = [
	{ key: 1, description: 'Veldu...' },
	{ key: 2, description: 'Er á vanskilaskrá' },
	{ key: 3, description: 'Er ekki á vanskilaskrá' },
	{ key: 4, description: 'Á vanskilaskrá en traustur lántaki' }
];

export const applicantViewKeys = {
  LOAN_AMOUNT: 'LOAN_AMOUNT',
  MY_INFO: 'MY_INFO',
  LOAN_TERMS: 'LOAN_TERMS',
  IN_SIGNING: 'IN_SIGNING',
  IN_VERIFICATION: 'IN_VERIFICATION',
  IN_FUNDING: 'IN_FUNDING',  
  APPLICANT_ACCOUNT: 'APPLICANT_ACCOUNT'
};


export const stepToViewKeys = (event) => {
  switch (event) {
    case 'notApplied': return applicantViewKeys.LOAN_AMOUNT;
    case 'offerReady': return applicantViewKeys.LOAN_TERMS;    
    case 'loanSigned': return applicantViewKeys.IN_VERIFICATION;
    case 'todoFinished': return applicantViewKeys.IN_FUNDING; 
    case 'applicationVerified': return applicantViewKeys.IN_FUNDING;       
    case 'loanFunded': return applicantViewKeys.APPLICANT_ACCOUNT;    
    default: return 'Step unknown';
  }
};


export const viewKeyToActions = (event) => {
  switch (event) {
    case applicantViewKeys.LOAN_AMOUNT: return aT.login.api.USER_REQUEST;
    case applicantViewKeys.MY_INFO: return aT.login.api.USER_REQUEST;
    case applicantViewKeys.LOAN_TERMS: return aT.apply.api.IN_LOAN_OFFER_DATA_REQUEST;
    case applicantViewKeys.IN_SIGNING: return aT.apply.api.IN_SIGNING_VIEW_DATA_REQUEST;
    case applicantViewKeys.IN_VERIFICATION: return aT.apply.api.DOCUMENT_STATUS_REQUEST;
    case applicantViewKeys.IN_FUNDING: return aT.apply.api.IN_FUNDING_VIEW_DATA_REQUEST;
    case applicantViewKeys.APPLICANT_ACCOUNT: return aT.login.api.USER_REQUEST;
    default: return 'viewKey unknown';
  }
};

