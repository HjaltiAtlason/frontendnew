import React from 'react';
import PropTypes from 'prop-types';
import { Form, Control, Col, Group, Button } from 'react-bootstrap';
import { manVerifyEmail } from '../../../login/actions/userActions';
import { Field, reduxForm } from 'redux-form';
import CommonEmailInput from '../../../login/components/CommonEmailInput';
import CommonTextInput from '../../../login/components/CommonTextInput';

const validate = (values) => {
  const errors = {}
  if (!values.userEmail) {
    errors.userEmail = 'Required';
  }
  return errors
}

let VerifyEmailForm = ({dispatch, handleSubmit}) => {
  // const handleSubmit = (values) => {
  // debugger
  // dispatch(manVerifyEmail(values))
  // }
  return (
    <Form id="VerificationEmail-form" horizontal onSubmit={handleSubmit}>
      <Field           
        name="userEmail"
        component={CommonEmailInput}
        label="Sláðu inn email"
        placeholder="Email"    
        value="gaur@minniborg.is"
      />   
      <Button type="submit" bsSize="sm" block variant="primary">
            Staðfesta email
      </Button> 
        
    </Form>
  );
};

VerifyEmailForm.propTypes = 
{ 
  dispatch: PropTypes.func,
  handleSubmit: PropTypes.func
};


const createReduxForm = reduxForm({
  form: 'emailValidation', // a unique identifier for this form
  validate
  // warn
});
// evaluate it for ContactForm component
VerifyEmailForm = createReduxForm(VerifyEmailForm);

export default VerifyEmailForm;
