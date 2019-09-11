import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Progress from '../login/progress/Progress';
import { viewTitle, renderView, applySteps } from './utils';
import {currentStep } from '../globals/utils';
import { applicantViewKeys } from './constants';

const ApplicantScreen = ({ currentView, user, dispatch }) => {
  let applicantViewKey = ''// viewKeyFromQueryHistory();

  if (applicantViewKey === '') {
    applicantViewKey = currentView.viewKey || applicantViewKeys.LOAN_AMOUNT;
  }

  return (
    <div className="main main-raised">
      <div className="container">
        <div className="section landing-section">
          <h2>Sækja um lán</h2>
          <Progress
            currentStep={currentStep(applicantViewKey)}
            steps={applySteps}
          />
          <h3>{viewTitle(applicantViewKey)}</h3>
          {renderView(applicantViewKey, dispatch)}
        </div>
      </div>
    </div>
  );
};

ApplicantScreen.propTypes = {
  currentView: PropTypes.object,
  user: PropTypes.object,
  dispatch: PropTypes.func
};

const mapStateToProps = (state) => ({
  currentView: state.login.currentView,
  user: state.login.user
  // loan: state.loan
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantScreen);
