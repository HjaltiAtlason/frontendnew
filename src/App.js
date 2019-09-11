import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Row'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
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
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" id="navigation-example">
      <Navbar.Brand href="#home">
        <img alt="Logo" src="bootstrap/img/logotop.jpg" width="100" height="100" className="d-inline-block align-top" />
      </Navbar.Brand>       
        <Nav className="mr-auto">
          <Nav.Link href="/Lantaki">Lántaki</Nav.Link>
          <Nav.Link href="/Fjarfestir">Fjárfestir</Nav.Link>
          <Nav.Link href="/Fyrirtaekid">Fyrirtækið</Nav.Link>            
        </Nav>          
    </Navbar>

    <div className="wrapper">
      {user.email ? (
        <div className="header header-filter city-background" />
      ) : null}
      {!isLoggedIn ? (
        <Container>
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
        </Container>
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
