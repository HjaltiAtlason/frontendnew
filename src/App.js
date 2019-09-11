import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { NavItem, Grid, Row, Col} from 'react-bootstrap';
import { viewType } from './globals/utils';
import ReceiveFromIsland from './login/components/ReceiveFromIsland';
import { getUser, getIsLoggedIn } from './login/reducers/user';
import LoginIsland from './login/components/LoginIsland';
import MicroContainer from './login/components/MicroContainer';
import LoginDev from './login/components/LoginDev';


const App = ({
  children,
  company,
  currentView,
  dispatch,
  user,
  isLoggedIn
}) => (
  <div className={`jafna ${viewType(currentView.viewKey)}`}>
    <nav className="navbar navbar-transparent navbar-fixed-top navbar-color-on-scroll">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle"
            data-toggle="collapse"
            data-target="#navigation-example"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <a href="/">
            <div className="logo-container">
              <div className="logo">
                <img alt="Logo" src="bootstrap/img/logo.jpg" />
              </div>              
            </div>
            <div className="brand">Jafna ehf</div>
          </a>
        </div>
        <div className="collapse navbar-collapse" id="navigation-example">
          <ul className="nav navbar-nav navbar-right">
            <LinkContainer to="/Lantaki">
              <NavItem eventKey={1}>Lántaki</NavItem>
            </LinkContainer>
            <LinkContainer to="/Fjarfestir">
              <NavItem eventKey={2}>Fjárfestir</NavItem>
            </LinkContainer>
            <LinkContainer to="/Fyrirtaekid">
              <NavItem eventKey={3}>Fyrirtækið</NavItem>
            </LinkContainer>
            <li>
              {user.token ? (<p> Velkomin(n) {user.firstName} </p>) : null}
            </li>
          </ul>
        </div>

      </div>

    </nav>

    <div className="wrapper">
      {user.email ? (
        <div className="header header-filter city-background" />
      ) : null}
      {!isLoggedIn ? (
        <Grid>
          <Row className="show-grid">
            <Col xs={12} md={6}>
              <MicroContainer header="Innskráning Island.is (nota https://www.jafna.is/)">                      
                <LoginIsland dispatch={dispatch} isBorrower />          
              </MicroContainer>
            </Col>
            <Col xs={12} md={6}>
              <MicroContainer header="Innskráning Island.is (nota https://www.jafna.is/)">          
                <LoginIsland dispatch={dispatch} isBorrower={false} />        
              </MicroContainer>
            </Col>
          </Row>
        </Grid>
      ) : null}
      {children}
      <footer className="footer">
        <div className="container">
          <nav className="pull-left">
            <ul>
              <li>
                <a> Um okkur </a>
              </li>
              <li>
                <a> Spurt og svarað</a>
              </li>
              <li>
                <a>Blogg</a>
              </li>
            </ul>
          </nav>

          <div className="copyright pull-right">
            {company.address} Sími {company.phone} &copy; {company.name}.
          </div>
        </div>
        <LoginDev dispatch={dispatch} />
        <ReceiveFromIsland dispatch={dispatch} />
      </footer>
    </div>
  </div>
);

App.propTypes = {
  currentView: PropTypes.object,
  children: PropTypes.element,
  company: PropTypes.object,
  dispatch: PropTypes.func,
  user: PropTypes.object,
  isLoggedIn: PropTypes.bool
};

const mapStateToProps = (state) => ({
  company: state.login.company,
  currentView: state.login.currentView,
  user: getUser(state),
  isLoggedIn: getIsLoggedIn(state),
  // loan: getLoan(state),
  account: state.apply.account,
  // payments: getPayments(state),
  notes: state.invest.notes
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
