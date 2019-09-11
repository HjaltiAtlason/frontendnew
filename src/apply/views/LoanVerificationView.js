import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import LoanFundingStatus from './helpers/LoanFundingStatus';
import VerifyEmailForm from './helpers/VerifyEmailForm';
import VerifyBankAccountForm from './helpers/VerifyBankAccountForm';
import MicroContainer from '../../login/components/MicroContainer';
import { manVerifySubmit, storeSaveBankInfo } from '../actions/borrowerActions';
import UploadWrapper from './helpers/UploadWrapper';
import { manVerifyEmail } from '../../login/actions/userActions';
import { getFundingStatus } from '../reducers/funding';
import { getIsEmailVerified } from '../../login/reducers/user';


// Shouldn't use selectView directly but rather dispatch a CHANGE_VIEW
const LoanVerificationView = ({ dispatch, fundingStatus, isEmailVerified }) => {
  const handleClick = (values) => {    
    dispatch(manVerifySubmit(values))
  } 

  const handleSubmit = (values) => {    
    dispatch(manVerifyEmail(values))    
  } 
  const handleBankForm = (values) => {        
    dispatch(storeSaveBankInfo(values))    
  } 

  return (
    <div id="testingVerificationMain-div">
      <LoanFundingStatus value={fundingStatus} />
      <h4>Næstu skref</h4>
      <div>
        {isEmailVerified ? 
        ( <div>
          <MicroContainer header="Staðfesta bankareikning">
            <VerifyBankAccountForm onSubmit={handleBankForm} />
          </MicroContainer>
          <MicroContainer header="Senda umbeðin skjöl">
            <UploadWrapper />
          </MicroContainer>
        </div>
        ) : (                                     
          <MicroContainer header="Staðfesta email">
            <VerifyEmailForm dispatch={dispatch} onSubmit={handleSubmit} />
          </MicroContainer>
        )}
      </div>
      
      <Button id="LoanVerificationView-btn" type="submit" bsSize="large" variant="primary" onClick={handleClick}>
        Staðfesta upplýsingar
      </Button>
      
    </div>
  );
};

LoanVerificationView.propTypes = 
{ 
  dispatch: PropTypes.func,
  fundingStatus: PropTypes.string,
  isEmailVerified: PropTypes.bool
};

const mapStateToProps = (state) => ({
  fundingStatus: getFundingStatus(state),
  isEmailVerified: getIsEmailVerified(state)
});

export default connect(mapStateToProps)(LoanVerificationView);

