import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Progress from '../login/progress/Progress';
import InvestorMenu from './InvestorMenu';
import { renderView, viewTitle, investOnboardingSteps, nextStep } from './utils';
import {  
  currentStep
  // viewKeyFromQueryHistory
} from '../globals/utils';
import { sections } from '../globals/constants';
import investorViewKeys from './constants';


const InvestorScreen = ({ currentView, user, notes, dispatch }) => {
  let investorViewKey = '' // viewKeyFromQueryHistory();
  if (investorViewKey === '') {
    investorViewKey = currentView.viewKey || investorViewKeys.ADD_FUNDS;  // takes the first nonempty string
  }

  let onboarding = false;
  if (nextStep(sections.INVEST, user, notes)) {
    onboarding = true;
    investorViewKey = nextStep(sections.INVEST, user, notes);
  }

  return (
    <div className="main main-raised">
      <div className="container">
        <div className="section landing-section">
          <h2>Fjárfesta í láni</h2>
          {onboarding ? (
            <Progress
              currentStep={currentStep(investorViewKey)}
              steps={investOnboardingSteps}
            />
          ) : (
            <InvestorMenu viewKey={investorViewKey} dispatch={dispatch} />
          )}
          <h3>{viewTitle(investorViewKey)}</h3>
          {renderView(investorViewKey, dispatch, onboarding)}
        </div>
      </div>
    </div>
  );
};

InvestorScreen.propTypes = {
  currentView: PropTypes.object,
  user: PropTypes.object,
  notes: PropTypes.arrayOf(PropTypes.object),
  dispatch: PropTypes.func
};

const mapStateToProps = (state) => ({
  currentView: state.login.currentView,
  user: state.login.user,
  notes: state.invest.notes
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(InvestorScreen);
