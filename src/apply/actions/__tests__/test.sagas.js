import * as sagas from '../sagas';
import {  } from 'jest';
import { put, call, take, takeLatest, select } from 'redux-saga/effects'
import { mockLoginBorrower, stepData } from '../borrowerActions'
import { aT } from '../../../globals/constants'

/* This file is extremely outdated. However it serves as a blueprint for 
 * further testing once the refactoring quites down. Then these tests will
 * revolve around the manager flow and unit testing the leafs like api_saga.
 */


// ============ Constants ======================================

const fake_response = {}

const someUser = {
  kennitala: '123',
  step: 'Loan_Offer',
  token: 'some token'
}


// =============================================================

const request = sagas.watchOfferPayments()

test('Take the LOAN_OFFER_DETAILS signal', () => {
  expect(
        request.next()
    ).toEqual(
    {
      done: false,
      value: takeLatest(aT.apply.man.LOAN_OFFER_DETAILS, sagas.offerPaymentsManager)
    }
    );
});
