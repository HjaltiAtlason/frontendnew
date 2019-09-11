import React from 'react';
import PropTypes from 'prop-types';
import { ProgressBar } from 'react-bootstrap';

const LoanFundingStatus = ({ value }) => {
  return (
    <div>
      <h4> Staða fjármögnunar </h4>
      <ProgressBar now={value} label={`${value}%`} />      
    </div>
  );
};

LoanFundingStatus.propTypes = {
  value: PropTypes.number
};

export default LoanFundingStatus;
