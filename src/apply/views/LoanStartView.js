import React from 'react';
import PropTypes from 'prop-types';
import { loanStartDataToMan } from '../actions/loanOfferActions';
import LoanStartViewForm from './helpers/LoanStartViewForm';
import MicroContainer from '../../login/components/MicroContainer';


// Calls the aT.apply.man.LOAN_START_FORM saga that adds from the LoanStartViewForm to the applyInfo store
const LoanStartView = ({ dispatch }) => {
  const handleChange = (values) => {    
    dispatch(loanStartDataToMan(values));
  };

  return (
    <div>
      <MicroContainer header="Persónuleg lán milli 100 þúsund til 4 milljónum">
        <div>          
          <LoanStartViewForm onSubmit={handleChange} />
        </div>
      </MicroContainer>
    </div>
  );
};

LoanStartView.propTypes = {
  dispatch: PropTypes.func
};


export default LoanStartView;