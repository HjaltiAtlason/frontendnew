import React from 'react';
import PropTypes from 'prop-types';
import MicroContainer from '../../../login/components/MicroContainer';
import { Button } from 'react-bootstrap/Button';
import { getLoanOfferPaymentsToMan } from '../../actions/loanOfferActions';

const style = { width: '33%', display: 'inline-block' };

const LoanOffersView = ({ dispatch, loanOffer, creditRating }) => {
  const handleOnClick = (id) => {
    dispatch(getLoanOfferPaymentsToMan(id));
  };

  return (
    <MicroContainer id="LoanOffer-container" header={'Lánsupplýsingar'}>
      <div id="testingLoanOffer-div">
        <h3>Lánshæfiseinkunn: {creditRating}</h3>
        {loanOffer.myOffers.map((offer, index) => (
          <div style={style} key={index}>
          Vextir: {offer.offerRate}
            <br />
          Árleg hlutfallstala kostnaðar: {offer.earBorrower}
            <br />          
          Lánsupphæð: {offer.principal}
            <br />          
          Nota tölvupóst: {offer.useEmail ? 'já':'nei'}
            <br />
          Er jafngreiðslulán: {offer.isPMT ? 'já':'nei'}
            <Button id="offerDetail-btn" value={offer.id} onClick={() => handleOnClick(offer.id)}>Nánar</Button>
          </div>
          ))}
      </div>
    </MicroContainer>
  );
};

LoanOffersView.propTypes = {
  dispatch: PropTypes.func,
  loanOffer: PropTypes.object,
  creditRating: PropTypes.string
};

export default LoanOffersView;
