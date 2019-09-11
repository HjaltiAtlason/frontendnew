import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history'

import { devLoginToMan, getEmailCallback } from '../actions/userActions';
import { restartLogin } from '../actions/mockDataActions';
import { apiDomain } from '../../globals/constants';
import * as logUtil from './LoginUtil';
import { getPopulateLoans } from '../../invest/actions/noteActions';


const history = createBrowserHistory()

class LoginDev extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);    
    this.loginAsDev = this.loginAsDev.bind(this);
    this.loginAsNewDev = this.loginAsNewDev.bind(this);
    this.setIsProd = this.setIsProd.bind(this);
    this.uploadLoans = this.uploadLoans.bind(this);
    this.callbackEmail = this.callbackEmail.bind(this);

    this.state = {
      showLocal: false,
      testUser: '113',
      isProduction: false,
      isDev: true,
      backend: 'bla'
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem('testUser') === null) {
      sessionStorage.setItem('testUser', this.state.testUser);
    } else {
      this.setState({
        testUser: sessionStorage.getItem('testUser')
      });
    }
    const loc = window.location.href;
    this.setState({
      isProduction: loc.indexOf('jafna') !== -1
    });
    console.log('LoginDev componentDitMount after loggingIn should have');
    if (localStorage.getItem('ISDEV') === null) {
      localStorage.setItem('ISDEV', 'false');
    }
    this.setState({ isDev: localStorage.getItem('ISDEV') === 'true' });
    this.setState({ backend: apiDomain()});

  }

  
  setIsDev() {
    localStorage.setItem('ISDEV', 'true');
    sessionStorage.setItem('ISDEV', 'true');    
    this.setState({ backend: apiDomain()});
  }
  setIsProd(){
    localStorage.setItem('ISDEV', 'false');
    sessionStorage.setItem('ISDEV', 'false');
    this.setState({ backend: apiDomain()});
  }

  

  handleChange(event) {
    this.setState({ testUser: event.target.value });
    sessionStorage.setItem('testUser', event.target.value);
  }

  loginAsDev(isBorrower) {
    const payload = {
      isBorrower,
      kt: this.state.testUser
    };
    this
        .props
        .dispatch(devLoginToMan(payload));
        history.push((isBorrower ? '/Lantaki' : '/Fjarfestir'));
  }

  loginAsNewDev(isBorrower) {
    const uuidv4 = require('uuid/v4');
    const payload = {
      isBorrower,
      kt: uuidv4().toString().substring(0,8)     
    };    
    this
        .props
        .dispatch(devLoginToMan(payload));
        history.push((isBorrower ? '/Lantaki' : '/Fjarfestir'));
  }

  showsessionStorage() {
    this.state.showLocal
        ? this.setState({ showLocal: false })
        : this.setState({ showLocal: true });
  }

  restartLogin = () => {
    logUtil.setLoginCompletedFail();
    this.props.dispatch(restartLogin());
  }

  uploadLoans() {
    this.props.dispatch(getPopulateLoans())
  }

  callbackEmail() {
    this.props.dispatch(getEmailCallback(this.props.user.emailGuid))
  }

  render() {
    return (
      <div>
        {this.state.isProduction
            ? (null)
            : (
              <div>
                <div>
                  <div>
                    <Button
                      bsSize="small"
                      variant="primary"
                      tabIndex={0}
                      onClick={() => {
                        this.loginAsDev(true);
                      }}
                    >
                                Skrá inn lántaka: {this.state.testUser}
                    </Button>
                    <Button
                      id="devNewBorrower-btn"
                      bsSize="small"
                      variant="primary"
                      tabIndex={0}
                      onClick={() => {
                        this.loginAsNewDev(true);
                      }}
                    >
                                Skrá inn nýjan lántaka
                    </Button>
                  </div>
                  <div>
                    <Button
                      bsSize="small"
                      variant="primary"
                      tabIndex={0}
                      onClick={() => {
                        this.loginAsDev(false);
                      }}
                    >
                                Skrá inn fjárfesti: {this.state.testUser}
                    </Button>
                    <Button
                      id="devNewInvestor-btn"
                      bsSize="small"
                      variant="primary"
                      tabIndex={0}
                      onClick={() => {
                        this.loginAsNewDev(false);
                      }}
                    >
                                Skrá inn nýjan fjárfesti
                    </Button>
                  </div>
                </div>
                
                Backend in use: {apiDomain()}
                <Button id="setIsDev-button" bsSize="xsmall" onClick={() => { this.setIsDev(); }}>
                              Use development backend
                </Button>
                <Button id="setIsProd-button" bsSize="xsmall" onClick={() => { this.setIsProd(); }}>
                              Use production backend
                </Button>

                
                <div>
                Upload loans if needed for investor testing
                  <Button id="uploadLoans-button" bsSize="xsmall"  variant="primary" onClick={() => { this.uploadLoans(); }}>
                              Upload loans
                  </Button>
                  <Button id="callbackEmail-button" bsSize="xsmall"  variant="primary" onClick={() => { this.uploadLoans(); }}>
                              Callback email
                  </Button>
                  <Button
                    bsSize="small"
                    variant="primary"
                    tabIndex={0}
                    onClick={() => {
                      this.showsessionStorage();
                    }}
                  >
                                Toggle testing island
                  </Button>
                </div>

                {this.state.showLocal
                  ? (
                    <div>                                      
                      <Button
                        bsSize="small"
                        variant="primary"
                        tabIndex={0}
                        onClick={() => {
                          this.restartLogin();
                        }}
                      >
                                            Restart login
                      </Button>
                      <form onSubmit={this.handleSubmit}>
                        <label>
                                                Change user to log in with username/kennitala):
                          <input type="text" value={this.state.testUser} onChange={this.handleChange} />
                        </label>
                        <input type="submit" value="vista" />
                      </form>
                      <p>FirstName:
                        <b>
                          {this.props.user.firstName}
                        </b>
                      </p>
                      <p>userName:
                        <b>
                          {this.props.user.userName}
                        </b>
                      </p>
                      <p>token:
                        <b>
                          {this.props.user.token}
                        </b>
                      </p>
                      <p>In step:
                        <b>
                          {this.props.user.step}
                        </b>
                      </p>
                      <p>loginguid: {sessionStorage.getItem('loginguid')} </p>
                      <p>loggingIn: {sessionStorage.getItem('loggingIn')} </p>

                    </div>
                  )
                  : null
                }
              </div>)}
      </div>
    );
  }
}



const mapStateToProps = (state) => ({ 
  user: state.login.user 
});

export default connect(mapStateToProps)(LoginDev);
