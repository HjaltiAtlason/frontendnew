import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { loginCompletedToMan } from '../actions/userActions';
import * as logUtil from './LoginUtil';

class ReceiveFromIsland extends Component {
  constructor(props) {
    super(props);
    this.goTologinComplete = this.goTologinComplete.bind(this);
  }

  componentDidMount() {
    console.log('ReceiveFromIsland componentDitMount');
    if (logUtil.tryLoginCompleted()) {
      this.goTologinComplete();
    }
  }

  goTologinComplete = () => {    
    const data = { loginguid: sessionStorage.getItem(logUtil.cLog.LOGIN_GUID), isBorrower: sessionStorage.getItem(logUtil.cLog.IS_BORROWER) };
    this.props.dispatch(loginCompletedToMan(data));
  };


  render() {
    return (
      <div />
    );
  }
}

ReceiveFromIsland.propTypes = {
  dispatch: PropTypes.func
};

export default ReceiveFromIsland;

