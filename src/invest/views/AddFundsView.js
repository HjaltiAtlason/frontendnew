import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, ButtonToolbar } from 'react-bootstrap';
// import { aT } from '../../globals/constants';
// import {investorViewKeys} from '../constants'
import { formatCurrency } from '../../globals/utils';
import selectView from '../../login/actions/viewActions';
import RiskAppetite from './helpers/RiskAppetite';
import StartPortfolioForm from './helpers/StartPortfolioForm';
import { getRiskAppetite } from '../reducers/accountSettings';

const AddFundsView = ({ dispatch, viewKey, onboarding, user, riskAppetite }) => {
  const next = () => {
    dispatch(selectView(viewKey));
  };

  const renderFundsInfo = (funds) => {
    return (
      <div className="alert alert-info">
        <div className="container">
          <div className="alert-icon">
            <i className="material-icons">info_outline</i>
          </div>
          <b>Athugið:</b> Það eru nú þegar {formatCurrency(funds)} inn á
          Jöfnureikningnum þínum.
        </div>
      </div>
    );
  };

  return (
    <div>
      {onboarding ? 
        <div>
          <RiskAppetite value={riskAppetite} dispatch={dispatch} />
          <StartPortfolioForm />
        </div> : null}
      {user.fundsAddedAmt && user.fundsAddedAmt > 0
        ? renderFundsInfo(user.fundsAddedAmt)
        : null}
      {user.fundsAddedAmt && user.fundsAddedAmt > 0 ? (
        <h4>Til að millifæra meira á Jöfnureikninginn þinn.</h4>
      ) : (
        <h4>Millifæra á Jöfnureikninginn þinn.</h4>
      )}
      <ul>
        <li>
          Millifæra á reiking Jöfnu minnst {formatCurrency(25000, true)} kt:
          800608-xxxx bn: 111-26-xxxxx.
        </li>
        <li>
          Staðfesting millifærslu fer í síðasta lagi fram í lok vinnudags, eða í
          byrjun næsta vinnudags ef um millifærslu utan skrifstofutíma er að
          ræða.
        </li>
      </ul>
      <h4>Nánari upplýsingar</h4>
      <ul>
        <li>
          XXX er undir FME, sér um utanumhald reikninga og hefur Jafna ehf ekki
          aðgagn að bankareikningum, allar millifærlur eru staðfestar út frá
          þeim skuldabréfum sem verða til á lánatorgi Jöfnu.
        </li>
        <li>
          Eftir að millifærsla hefur verið staðfest þá mun inneign sjást á
          reikningsyfirliti (linkur) fjárfestis, og þá er hægt að fara að
          fjárfesta.
        </li>
        <li>
          Æskilegt er að fjárfestir millifæri inn á fjárfestareikning Jöfnu af
          þeim bankareikningi sem gefin var upp sem reikningur fjárfestis, til
          frekar staðfestingar.
        </li>
        <li>
          Fjárfestir getur á hverjum tíma millifært (linkur) lausu fé (ólofuðu
          fé) af fjárfestareikningi til sín. Millifærslur er framkvæmdar í lok
          vinnudags eða í upphafi vinnudags.
        </li>
      </ul>

      {onboarding ? (
        <ButtonToolbar>
          <Button onClick={next} bsSize="large" variant="primary">
            Áfram
          </Button>
        </ButtonToolbar>
      ) : null}
    </div>
  );
};

AddFundsView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  viewKey: PropTypes.string.isRequired,
  onboarding: PropTypes.bool.isRequired,
  user: PropTypes.object,
  riskAppetite: PropTypes.number
};
const mapStateToProps = (state) => ({
  user: state.login.user,
  riskAppetite: getRiskAppetite(state)
});

export default connect(mapStateToProps)(AddFundsView);
