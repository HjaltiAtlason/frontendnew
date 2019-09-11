import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Button } from 'react-bootstrap';
import LoanOfferPaymentsTable from './helpers/LoanOfferPaymentsTable';
import LoanOffersView from './helpers/LoanOffersView';
import { acceptLoanOfferToMan } from '../actions/loanOfferActions';
import { getOffers, getSelectedOfferId, getCreditRating } from '../reducers/loanOffer';
import { getOfferPayments } from '../reducers/offerPayments';
import OfferChart from './helpers/OfferChart';
import MicroContainer from '../../login/components/MicroContainer';


const LoanGrantedView = ({
  loanOffers,
  selectedOfferId,
  offerPayments,
  dispatch,
  creditRating
}) => {
  const handleSubmit = () => {
    dispatch(acceptLoanOfferToMan(selectedOfferId));
  };

  return (
    <div>
      <h2>Þú uppfyllir skilyrði fyrir láni frá okkur!</h2>
      <LoanOffersView loanOffer={loanOffers} dispatch={dispatch} creditRating={creditRating} />{' '}
      {selectedOfferId ? (
        <MicroContainer header="Nánar um lán">
          <div>
            <OfferChart data={offerPayments} dataKey="paymentNumber" />
          </div>
          <div>
            <LoanOfferPaymentsTable offerPayments={offerPayments} />         
          </div>
          <Button
            id="AcceptOffer-btn"
            type="submit"
            bsSize="large"
            variant="primary"
            onClick={() => handleSubmit()}
          >
        Áfram
          </Button>
        </MicroContainer>
       ) : null}
       
    </div>
  );
};

LoanGrantedView.propTypes = {
  loanOffers: PropTypes.object,
  dispatch: PropTypes.func,
  selectedOfferId: PropTypes.number,
  offerPayments: PropTypes.array,
  creditRating: PropTypes.string
};

const mapStateToProps = (state) => ({
  loanOffers: getOffers(state),
  offerPayments: getOfferPayments(state),
  selectedOfferId: getSelectedOfferId(state),
  creditRating: getCreditRating(state)
});

export default connect(mapStateToProps)(LoanGrantedView);
