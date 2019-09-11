import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Iframe from 'react-iframe';
import { Button } from 'react-bootstrap/Button';
import { manSignLoan } from '../actions/borrowerActions';
import { getUrlFromDokobit, getIsLoanSigned } from '../reducers/signing';


// Shouldn't use selectView directly but rather dispatch a CHANGE_VIEW
const LoanSigningView = ({ dispatch, dokoUrl, isLoanSigned }) => {
  const handleChange = (values) => {
    dispatch(manSignLoan(values));
  };

  return (
    <div className="App" id="testingSigning-div">     
      <Iframe
        url={dokoUrl}
        width="600px"
        height="900px"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"
      />           
      <Button onClick={handleChange} id="SigningFinished-btn" disabled={!isLoanSigned}>
          Undirritun láns tóks með ágætum
      </Button>     
    </div>
  );
  
};

LoanSigningView.propTypes = {
  dispatch: PropTypes.func,
  dokoUrl: PropTypes.string,
  isLoanSigned: PropTypes.bool
};

const mapStateToProps = (state) => ({
  dokoUrl: getUrlFromDokobit(state),
  isLoanSigned: getIsLoanSigned(state)
});

export default connect(mapStateToProps)(LoanSigningView);

