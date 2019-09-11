import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import CommonTextInput from '../../../login/components/CommonTextInput';

const validate = (values) => {
  const errors = {}
  if (!values.portfolioAmount) {
    errors.portfolioAmount = 'Required';
  }
  return errors
}

let StartPortfolioForm = ({dispatch, handleSubmit}) => {
  return (
    <Form id="StartPortfolio-form" horizontal onSubmit={handleSubmit}>
      <Field           
        name="portfolioAmount"
        component={CommonTextInput}
        label="Sláðu inn hvað þú vilt fjárfesta fyrir mikið"
        placeholder="Upphæð"    
        value="0"
      />   
      <Button type="submit" bsSize="sm" block variant="primary">
            Staðfesta
      </Button> 
        
    </Form>
  );
};

StartPortfolioForm.propTypes = 
{ 
  dispatch: PropTypes.func,
  handleSubmit: PropTypes.func
};


const createReduxForm = reduxForm({
  form: 'startPortfolioForm', // a unique identifier for this form
  validate
  // warn
});
// evaluate it for ContactForm component
StartPortfolioForm = createReduxForm(StartPortfolioForm);

export default StartPortfolioForm;