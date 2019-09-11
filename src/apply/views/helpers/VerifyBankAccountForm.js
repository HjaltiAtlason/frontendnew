import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import {
  Form,
  Control,
  Col,
  Group,
  /*  Checkbox,
  ControlLabel, */
  Button
} from 'react-bootstrap';
import CommonTextInput from '../../../login/components/CommonTextInput';


const validate = (values) => {
  const errors = {}
  if (!values.banki) {
    errors.banki = 'Required';
  }
  if (!values.gerd) {
    errors.gerd = 'Required';
  }
  if (!values.bankanumer) {
    errors.bankanumer = 'Required';
  }
  return errors
}


let VerifyBankAccountForm = ({handleSubmit}) => {
  return (
    <Form id="BankInfo-form" horizontal onSubmit={handleSubmit}>           
      <Field component={CommonTextInput} name="banki" placeholder="Banki" type="text" label="Banki" value="111" />      
      <Field component={CommonTextInput} name="gerd"  placeholder="Gerð" type="text" label="Gerð" value="25" />      
      <Field component={CommonTextInput} name="bankanumer"  placeholder="Bankanúmer" type="text" label="Bankanúmer" value="6972" />      
            
      <Button type="submit" bsSize="sm" block variant="primary">
            Áfram
      </Button> 
    </Form>
  );
};

VerifyBankAccountForm.propTypes = 
{
  onSubmit: PropTypes.func
}

VerifyBankAccountForm = reduxForm({form: 'bankAccountForm', validate})(VerifyBankAccountForm)

export default VerifyBankAccountForm;

 /*  
<Form id="BankInfo-form" horizontal onSubmit={handleSubmit}>      
      <div sm={4}>
        <Button type="submit" bsSize="sm" block variant="primary">
            Staðfesta bankanr.
        </Button>
      </div>
      <div sm={2}>
        <Field component={CommonTextInput} name="banki" placeholder="Banki" type="text" />
      </div>
      <div sm={2}>
        <Field component={CommonTextInput} name="gerd"  placeholder="Gerð" type="text" />
      </div>
      <div sm={4}>
        <Field component={CommonTextInput} name="bankanumer"  placeholder="Bankanúmer" type="text" />
      </div>      
    </Form> */