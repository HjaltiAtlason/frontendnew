import { } from 'jest';
import { put, call, take, race } from 'redux-saga/effects';
import * as sagas from '../sagas';
import { aT, success, createAction } from '../../../globals/constants';
import { stepToViewKeys, viewKeyToActions, applicantViewKeys } from '../../../apply/constants';
import * as api from '../../../globals/api';

/* This file is extremely outdated. However it serves as a blueprint for
 * further testing once the refactoring quites down. Then these tests will
 * revolve around the manager flow and unit testing the leafs like api_saga.
 */


// ============ Constants ======================================


const someUser = {
  kennitala: '123',
  step: 'notApplied',
  token: 'some token',
  isBorrower: true
};

const loginData = {
  isBorrower: true,
  kennitala: '123'  
};

const StepEvent = 'notApplied';

// ============ Login Borrower =================================

const login = sagas.loginDevManager(loginData);

test('mockLogin api call', () => {
  expect(
        login.next()
    ).toEqual(
        { done: false, value: call(api.mockLogin, loginData) }
    );
});


test('dispatch user info', () => {
  expect(
        login.next(someUser)
    ).toEqual(
    {
      done: false,
      value: put({
        type: success(aT.login.api.DEV_LOGIN_REQUEST),
        payload: someUser,
        viewKey: stepToViewKeys(StepEvent)
      })
    }
    );
});

test('load the page data', () => {
  expect(
        login.next(someUser)
    ).toEqual(
    {
      done: false,
      value: put({
        type: aT.login.man.LOAD_PAGE_DATA_MAN,
        payload: {'viewKey': stepToViewKeys(StepEvent), 'isBorrower': true}
      })
    }
    );
});


test('no more yield statements', () => {
  expect(
        login.next()
    ).toEqual(
        { done: true, value: undefined }
    );
});

// ============ View Data ======================================


const viewKey = applicantViewKeys.LOAN_TERMS;
const action = createAction(viewKeyToActions(viewKey));

const pageData = {
  payload: {'viewKey': viewKey, 'isBorrower': true}
};

const view = sagas.loadPageDataManager(pageData);


test('get step data via api call', () => {
  expect(
        view.next(pageData)
    ).toEqual(
    {
      done: false,
      value: put({
        type: action.self
      })
    }
    );
});

test('dispatch view data to reducers', () => {
  expect(
        view.next()
    ).toEqual(
    {
      done: false,
      value: race([
        take(action.success),
        take(action.fail)
      ])
    }
    );
});
/*
test('no more yield statements', () => {
    expect(
        view.next()
    ).toEqual(
        { done: true, value: undefined }
    );
});
*/

