import React from 'react';
import createHistory from 'history/createBrowserHistory';
import moment from 'moment';
import {applicantViewKeys} from '../apply/constants'
import investorViewKeys from '../invest/constants'
import selectView from '../login/actions/viewActions';


export const formatShortDate = (dateString) => {
  return moment(dateString)
		.locale('is')
		.format('L');
};

export const formatPercent = (number, showSymbol = true) => {
  return `${number * 100}${showSymbol ? '%' : ''}`;
};

export const formatCurrency = (number, showSymbol = true) => {
  return `${number.toLocaleString('de-DE')}${showSymbol ? ' kr.' : ''}`;
};

export const viewType = (viewKey) => {
  switch (viewKey) {
    case applicantViewKeys.LOAN_AMOUNT:
      return 'profile-page';
    case applicantViewKeys.MY_INFO:
      return 'profile-page';
    case applicantViewKeys.LOAN_TERMS:
      return 'profile-page';
    case applicantViewKeys.IN_SIGNING:
      return 'profile-page';
    case applicantViewKeys.IN_VERIFICATION:
      return 'profile-page';
    case applicantViewKeys.IN_FUNDING:
      return 'profile-page';    
    case applicantViewKeys.APPLICANT_ACCOUNT:
      return 'profile-page';
    case investorViewKeys.PERSONAL_INFO:
      return 'profile-page';
    case investorViewKeys.ADD_FUNDS:
      return 'profile-page';
    case investorViewKeys.BUY_NOTES:
      return 'profile-page';
    case investorViewKeys.PORTFOLIO:
      return 'profile-page';
    case investorViewKeys.PAYMENTS:
      return 'profile-page';
    case investorViewKeys.INVESTOR_ACCOUNT:
      return 'profile-page';
    default:
      return 'profile-page';
  }
};

export const viewShortName = (viewKey) => {
  switch (viewKey) {
    case investorViewKeys.PERSONAL_INFO: {
      return 'upplysingar';
    }
    case investorViewKeys.ADD_FUNDS: {
      return 'millifaera';
    }
    case investorViewKeys.BUY_NOTES: {
      return 'jofnubref';
    }
    case investorViewKeys.PORTFOLIO: {
      return 'safnid';
    }
    case investorViewKeys.PAYMENTS: {
      return 'greidslur';
    }
    case investorViewKeys.INVESTOR_ACCOUNT: {
      return 'reikningur';
    }
    case applicantViewKeys.LOAN_AMOUNT: {
      return 'lan';
    }
    case applicantViewKeys.MY_INFO: {
      return 'minar-upplysingar';
    }
    case applicantViewKeys.LOAN_TERMS: {
      return 'skilmalar';
    }
    case applicantViewKeys.IN_VERIFICATION: {
      return 'naestu-skref';
    }
    case applicantViewKeys.IN_FUNDING: {
      return 'í-fjármögnun';
    }
    case applicantViewKeys.IN_SIGNING: {
      return 'skrifa-undir';
    }
    case applicantViewKeys.APPLICANT_ACCOUNT: {
      return 'yfirlit';
    }
    default: {
      return '';
    }
  }
};

export const viewKeyFromShortName = (shortName) => {
  switch (shortName) {
    case 'upplysingar': {
      return investorViewKeys.PERSONAL_INFO;
    }
    case 'millifaera': {
      return investorViewKeys.ADD_FUNDS;
    }
    case 'jofnubref': {
      return investorViewKeys.BUY_NOTES;
    }
    case 'safnid': {
      return investorViewKeys.PORTFOLIO;
    }
    case 'greidslur': {
      return investorViewKeys.PAYMENTS;
    }
    case 'reikningur': {
      return investorViewKeys.INVESTOR_ACCOUNT;
    }
    case 'lan': {
      return applicantViewKeys.LOAN_AMOUNT;
    }
    case 'minar-upplysingar': {
      return applicantViewKeys.MY_INFO;
    }
    case 'skilmalar': {
      return applicantViewKeys.LOAN_TERMS;
    }
    case 'í-fjármögnun': {
      return applicantViewKeys.IN_FUNDING;
    }
    case 'skrifa-undir': {
      return applicantViewKeys.IN_SIGNING;
    }
    case 'yfirlit': {
      return applicantViewKeys.APPLICANT_ACCOUNT;
    }
    default: {
      return '';
    }
  }
};

export const viewKeyFromQueryHistory = () => {
  const history = createHistory();
  if (history && history.location && history.location.search) {
    const splitString = history.location.search.split('=');
    if (splitString[0] === '?sida') {
      return viewKeyFromShortName(splitString[1]);
    }
  }
  return '';
};

export const currentStep = (viewKey) => {
  switch (viewKey) {
    case applicantViewKeys.LOAN_AMOUNT:
      return 1;
    case applicantViewKeys.MY_INFO:
      return 2;
    case applicantViewKeys.LOAN_TERMS:
      return 3;
    case applicantViewKeys.IN_SIGNING:
      return 4;
    case applicantViewKeys.IN_VERIFICATION:
      return 5;
    case applicantViewKeys.IN_FUNDING:
      return 6;   
    case applicantViewKeys.APPLICANT_ACCOUNT:
      return 7;
    case investorViewKeys.PERSONAL_INFO:
      return 1;
    case investorViewKeys.ADD_FUNDS:
      return 2;
    case investorViewKeys.BUY_NOTES:
      return 3;
    default:
      return 0;
  }
};

export const viewIndex = (viewKey) => {
  switch (viewKey) {
    case applicantViewKeys.LOAN_AMOUNT:
      return '0';
    case applicantViewKeys.MY_INFO:
      return '1';
    case applicantViewKeys.LOAN_TERMS:
      return '2';
    case applicantViewKeys.IN_VERIFICATION:
      return '3';
    case applicantViewKeys.IN_FUNDING:
      return '4';
    case applicantViewKeys.IN_SIGNING:
      return '5';
    case applicantViewKeys.APPLICANT_ACCOUNT:
      return '6';
    case investorViewKeys.PERSONAL_INFO:
      return '0';
    case investorViewKeys.ADD_FUNDS:
      return '1';
    case investorViewKeys.BUY_NOTES:
      return '2';
    case investorViewKeys.PORTFOLIO:
      return '3';
    case investorViewKeys.PAYMENTS:
      return '4';
    case investorViewKeys.INVESTOR_ACCOUNT:
      return '5';
    default:
      return '0';
  }
};

// Used for investorMenu, this renders the menu items.  Move to InvestorMenu?
export const renderNavItem = (
	viewKey,
	currentViewKey,
	imageName,
	name,
	dispatch
) => {
  return (
    <li className={viewKey === currentViewKey ? 'active' : ''}>
      <a
        style={{ cursor: 'pointer' }}
        tabIndex={viewIndex(viewKey)}
        onClick={() => {
          dispatch(selectView(viewKey));
          createHistory().push({
            search: `?sida=${viewShortName(viewKey)}`
          });
        }}
        role="tab"
        data-toggle="tab"
      >
        <i className="material-icons">{imageName}</i>
        {name}
      </a>
    </li>
  );
};


