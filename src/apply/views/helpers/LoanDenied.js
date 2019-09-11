import React from 'react';
import PropTypes from 'prop-types';

const LoanDenied = ({ reasons }) => {
  return (
    <div>
      <h1>Því miður gátum við ekki orðið við beiðni þinni um lán</h1>
      <p>{reasons}</p>
    </div>
  );
};

LoanDenied.propTypes = {
  reasons: PropTypes.array
};

export default LoanDenied;
