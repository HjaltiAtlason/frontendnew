import React from 'react';
import LoanStartView from './views/LoanStartView';
import PersonalInfoView from './views/PersonalInfoView';
import LoanGrantedView from './views/LoanGrantedView';
import LoanVerificationView from './views/LoanVerificationView';
import LoanInFundingView from './views/LoanInFundingView';
import LoanSigningView from './views/LoanSigningView';
import { applicantViewKeys } from './constants';
import UploadFile from './views/helpers/UploadFile'

export const renderView = (viewKey, dispatch) => {
  switch (viewKey) {
    case applicantViewKeys.LOAN_AMOUNT: {     
      return <LoanStartView dispatch={dispatch} />;
    }
    case applicantViewKeys.MY_INFO: {      
      return <PersonalInfoView dispatch={dispatch} />;      
    }
    case applicantViewKeys.LOAN_TERMS: {
      return <LoanGrantedView dispatch={dispatch} />;
    }
    case applicantViewKeys.IN_SIGNING: {
      return <LoanSigningView dispatch={dispatch} />;
    }
    case applicantViewKeys.IN_VERIFICATION: {
      return <LoanVerificationView dispatch={dispatch} />;
    }    
    case applicantViewKeys.IN_FUNDING: {
      return <LoanInFundingView dispatch={dispatch} />;
    }    
    default: {
      return <div />;
    }
  }
};

export const viewTitle = (viewKey) => {
  switch (viewKey) {
    case applicantViewKeys.LOAN_AMOUNT: {
      return 'Hvernig lán viltu';
    }
    case applicantViewKeys.MY_INFO: {
      return 'Þínar upplýsingar';
    }
    case applicantViewKeys.LOAN_TERMS: {
      return 'Lánaskilmálar';
    }
    case applicantViewKeys.IN_SIGNING: {
      return 'Undirskrift láns';
    }
    case applicantViewKeys.IN_VERIFICATION: {
      return 'Staðfesting láns';
    }
    case applicantViewKeys.IN_FUNDING: {
      return 'Láns fjármögnun';
    }
    case applicantViewKeys.APPLICANT_ACCOUNT: {
      return 'Þitt yfirlit';
    }
    default: {
      return '';
    }
  }
};

export const applySteps = [
	{ description: 'Lánsupphæð' },
	{ description: 'Þínar upplýsingar' },
  { description: 'Lánaskilmálar' },
  { description: 'Rafræn undirskrift' },
	{ description: 'Staðfesting láns' },
	{ description: 'Fjármögnun' }
	
];


export const fileTitle = (viewKey) => {
  switch (viewKey) {
    case applicantViewKeys.VERIFY_LOAN: {
      return 'Staðfesta lán';
    }
    default: {
      return <div />;
    }
  }
};
