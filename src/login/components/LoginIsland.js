import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { loginToIslandToMan } from '../actions/userActions';

const LoginIsland = ({ dispatch, isBorrower }) => {
  const goToLoginToIsland = () => {
    dispatch(loginToIslandToMan(isBorrower));
  };

  return (
    <div>
      {isBorrower ? (
        <Button
          className="borrower-btn"          
          variant="primary"
          tabIndex={0}
          onClick={() => goToLoginToIsland()}
        >
          <span>Lántaki</span>        
        </Button>
      ): (
        <Button
          className="investor-btn"       
          variant="primary"
          tabIndex={0}
          onClick={() => goToLoginToIsland()}
        >
          <span>Fjárfestir</span>        
        </Button>              
      )}
    </div>
  );
};

LoginIsland.propTypes = {
  dispatch: PropTypes.func,
  isBorrower: PropTypes.bool
};

export default LoginIsland;

