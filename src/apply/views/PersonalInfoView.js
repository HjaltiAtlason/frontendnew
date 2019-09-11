import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap/Button';
import { saveCommonUserToApi } from '../../login/actions/userActions';
import { saveApplyInfoToStore, manApplyForLoan } from '../actions/borrowerActions';
import PersonalInfoViewForm from './helpers/PersonalInfoViewForm';
import LoanSpecificForm from './helpers/LoanSpecificForm';
import { getApplyInfo } from '../reducers/applyInfo';
import { getIsUserInfoStored } from '../../login/reducers/user';


// This call updates the store using the aT.apply.LOAN_APPLY_FORM action
// this does not save the info to the backend
const PersonalInfoView = ({ dispatch, isUserDataStored }) => {
  const handleSpecificChange = (values) => {
    if (values.isHomeOwner === 'Já') {
      values.isHomeOwner = true;  // eslint-disable-line
    } else {
      values.isHomeOwner = false; // eslint-disable-line
    }
    dispatch(manApplyForLoan(values));
  };

  // This updates the store using aT.login.api.USER_INFO_PUT
  const handleCommonChange = (values) => {
    dispatch(saveCommonUserToApi(values));
  };

  // This calls saga-applyForLoanManager using the aT.apply.man.APPLY_FOR_LOAN_MANAGER action
  // the applyForLoanManager, saves the applyInfo the the backend

  return (
    <div>
      {isUserDataStored ? null : <PersonalInfoViewForm onSubmit={handleCommonChange} />}
      {isUserDataStored ?  <LoanSpecificForm onSubmit={handleSpecificChange} /> : null}      
    </div>
  );
};

PersonalInfoView.propTypes = {
  dispatch: PropTypes.func,  
  isUserDataStored: PropTypes.bool
};

const mapStateToProps = (state) => ({  
  isUserDataStored: getIsUserInfoStored(state)
});

export default connect(mapStateToProps)(PersonalInfoView);
