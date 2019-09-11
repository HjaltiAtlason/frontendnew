import React from 'react';
import PersonalInfoView from './views/PersonalInfoView';
import BuyNotesView from './views/BuyNotesView';
import AddFundsView from './views/AddFundsView';
import PortfolioView from './views/PortfolioView';
import PaymentsView from './views/PaymentsView';
import AccountView from './views/AccountView';
import investorViewKeys from './constants';
import { sections } from '../globals/constants';
import {loanPurposes} from '../apply/constants'

export const renderView = (viewKey, dispatch, onboarding) => {
  switch (viewKey) {
    case investorViewKeys.PERSONAL_INFO: {
      return <PersonalInfoView dispatch={dispatch} onboarding={onboarding} />;
    }
    case investorViewKeys.ADD_FUNDS: {
      return (
        <AddFundsView
          viewKey={investorViewKeys.ADD_FUNDS}
          dispatch={dispatch}
          onboarding={onboarding}
        />
      );
    }
    case investorViewKeys.BUY_NOTES: {
      return (
        <BuyNotesView
          viewKey={investorViewKeys.BUY_NOTES}
          dispatch={dispatch}
          onboarding={onboarding}
        />
      );
    }
    case investorViewKeys.PORTFOLIO: {
      return (
        <PortfolioView
          viewKey={investorViewKeys.PORTFOLIO}
          dispatch={dispatch}
        />
      );
    }
    case investorViewKeys.PAYMENTS: {
      return (
        <PaymentsView viewKey={investorViewKeys.PAYMENTS} dispatch={dispatch} />
      );
    }
    case investorViewKeys.INVESTOR_ACCOUNT: {
      return (
        <AccountView
          viewKey={investorViewKeys.INVESTOR_ACCOUNT}
          dispatch={dispatch}
        />
      );
    }
    default: {
      return <div />;
    }
  }
};

export const viewTitle = (viewKey) => {
  switch (viewKey) {
    case investorViewKeys.PERSONAL_INFO: {
      return 'Persónulegar upplýsingar';
    }
    case investorViewKeys.ADD_FUNDS: {
      return 'Millifæra';
    }
    case investorViewKeys.BUY_NOTES: {
      return 'Kaupa Jöfnubréf';
    }
    case investorViewKeys.PORTFOLIO: {
      return 'Jöfnubréfin mín';
    }
    case investorViewKeys.PAYMENTS: {
      return 'Greiðsluyfirlit';
    }
    case investorViewKeys.INVESTOR_ACCOUNT: {
      return 'Minn reikningur';
    }
    default: {
      return '';
    }
  }
};

export const nextStep = (section, user, notes) => {
  if (section === sections.INVEST) {
    if (
      !user.isEmailVerified
		) {
      return investorViewKeys.PERSONAL_INFO;
    }

    if (!user.fundsAddedAmt) {
      return investorViewKeys.ADD_FUNDS;
    }

    if (!notes || notes.length === 0) {
      return investorViewKeys.BUY_NOTES;
    }
  }
  return null;
};

export const loanPurposeDescription = (key) => {
  return loanPurposes.find((lp) => {
    return lp.key === key;
  }).description;
};


export const investOnboardingSteps = [
  {
    section: sections.INVEST,
    viewKey: investorViewKeys.PERSONAL_INFO,
    description: 'Upplýsingar'
  },
  {
    section: sections.INVEST,
    viewKey: investorViewKeys.ADD_FUNDS,
    description: 'Millifæra'
  },
  {
    section: sections.INVEST,
    viewKey: investorViewKeys.BUY_NOTES,
    description: 'Jöfnubréf'
  }
];
