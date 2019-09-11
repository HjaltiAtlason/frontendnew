import React from 'react';
import { shallow } from 'enzyme';
import LoanDenied from '../LoanDenied';

const wrapper = shallow(
  <LoanDenied
    {...{
      reasons: ['because some reasons']
    }}
  />
);

describe('LoanDenied', () => {
  it('should render message', () => {
    const message = wrapper.find('h1').text();
    expect(message).toEqual(
			'Því miður gátum við ekki orðið við beiðni þinni um lán'
		);
  });

  it('should render reasons', () => {
    const someReasons = wrapper.find('p').text();
    expect(someReasons).toEqual('because some reasons');
  });
  it('renders without exploding', () => {
    expect(wrapper.length).toBe(1);
  });
});


/*const DocumentStatus = require('../DocumentStatus');

test('Displays the status of required document', () => {
  expect(DocumentStatus({name:'Kalli', uploaded:true})).toBe('Kalli: Upload Complete');
  
});
*/