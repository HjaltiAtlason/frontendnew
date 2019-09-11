import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PersonalInfoViewForm from '../../apply/views/helpers/PersonalInfoViewForm'
import { getIsUserInfoStored } from '../../login/reducers/user';
import { saveCommonUserToApi, manVerifyEmail } from '../../login/actions/userActions';
import VerifyEmailForm from '../../apply/views/helpers/VerifyEmailForm';
import RiskAppetite from './helpers/RiskAppetite';



const PersonalInfoView = ({ dispatch, isUserDataStored }) => {
  
  const next = (values) => {    
    dispatch(saveCommonUserToApi(values));
  };
  const handleEmail = (values) => {    
    dispatch(manVerifyEmail(values))    
  } 
  
  return (
    <div>
      <RiskAppetite value={'70'} dispatch={dispatch} />
      {isUserDataStored ? null : <PersonalInfoViewForm onSubmit={next} />}
      {isUserDataStored ?
        <VerifyEmailForm onSubmit={handleEmail} />  
        : null}     

    </div>
  );
};

PersonalInfoView.propTypes = {
  dispatch: PropTypes.func.isRequired,  
  isUserDataStored: PropTypes.bool  
};

const mapStateToProps = (state) => ({  
  isUserDataStored: getIsUserInfoStored(state)  
});

export default connect(mapStateToProps)(PersonalInfoView);
