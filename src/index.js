import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import InvestorScreen from './invest/InvestorScreen';
import ApplicantScreen from './apply/ApplicantScreen';
import AboutJafna from './AboutJafna';
import document from './globals/document';
import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import * as serviceWorker from './serviceWorker';

const config = {
  apiKey: 'AIzaSyB1TsfIfEbKHEtCNaU6BMjC4R6ykyJb01w',
  authDomain: 'jafnafiles.firebaseapp.com',
  databaseURL: 'https://jafnafiles.firebaseio.com',
  projectId: 'jafnafiles',
  storageBucket: 'jafnafiles.appspot.com',
  messagingSenderId: '702170483690'
};
firebase.initializeApp(config);

render(  
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="/Lantaki" component={ApplicantScreen} />
        <Route path="/Fjarfestir" component={InvestorScreen} />
        <Route path="/Fyrirtaekid" component={AboutJafna} />
        <Route path="*" component={ApplicantScreen} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

