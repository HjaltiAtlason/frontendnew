import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoanFundingStatus from './helpers/LoanFundingStatus';
import MicroContainer from '../../login/components/MicroContainer';
import { getFundingStatus } from '../reducers/funding';

// Shouldn't use selectView directly but rather dispatch a CHANGE_VIEW
const LoanInFundingView = ({ dispatch, fundingStatus }) => {
  return (
    <div>
      <LoanFundingStatus value={fundingStatus.fundingPercentage} />
      <MicroContainer header="Staðaláns">
        <div id="testingInFunding-div">
          <LoanFundingStatus value={80} />
          <h3> Lánið er staðfest af lánasérfræðingi okkar</h3>
          <h3> Það eru {fundingStatus.daysLeft} dagar eftir í fjármögnun </h3>
        </div>
      </MicroContainer>      
    </div>
  );
};

LoanInFundingView.propTypes = 
{ 
  dispatch: PropTypes.func,
  fundingStatus: PropTypes.object
};


const mapStateToProps = (state) => ({
  fundingStatus: getFundingStatus(state)
});

export default connect(mapStateToProps)(LoanInFundingView);
