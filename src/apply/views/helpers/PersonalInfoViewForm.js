import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import LoanDisclosure from './LoanDisclosure';
import {
  Button,
  Form,
  Col,
  Group
} from 'react-bootstrap';
import CommonTextInput from '../../../login/components/CommonTextInput';

const validate = (values) => {
  const errors = {};
  if (!values.postCode) {
    errors.postCode = 'Required';
  } else if (isNaN(Number(values.postCode))) {
    errors.postCode = 'Must be a number';
  } else if ((Number(values.postCode) < 99) || (Number(values.postCode) > 1000)) {
    errors.postCode = 'Ekki rétt póstnúmer';
  }
  if (!values.gsm) {
    errors.gsm = 'Required';
  } else if (isNaN(Number(values.gsm))) {
    errors.gsm = 'Must be a number';
  }
  if (!values.firstName) {
    errors.firstName = 'Required';
  }
  if (!values.LastName) {
    errors.LastName = 'Required';
  }
  if (!values.homeAddress) {
    errors.homeAddress = 'Required';
  }  
  if (!values.city) {
    errors.city = 'Required';
  }
  return errors;
};

const warn = (values) => {
  const warnings = {};
  if (values.postCode < 100) {
    warnings.principalRequested = 'Vinsamlegast laga póstnúmer';
  }
  return warnings;
};


let PersonalInfoViewForm = (props) => {
  const { handleSubmit, pristine, submitting } = props;
  return (
    <Form id="PersonalInfo-form" onSubmit={handleSubmit} horizontal>
      <Field
        name="firstName"
        component={CommonTextInput}
        label="Fornafn"
        placeholder=""
      />
      <Field
        name="lastName"
        component={CommonTextInput}
        label="Eftirnafn"
        placeholder=""
      />
      <Field
        name="homeAddress"
        component={CommonTextInput}
        label="Heimilisfang"
        placeholder=""
      />
      <Field
        name="city"
        component={CommonTextInput}
        label="Staður"
        placeholder=""
      />
      <Field
        name="postCode"
        component={CommonTextInput}
        label="Póstnúmer"
        placeholder="101"
      />
      <Field
        name="gsm"
        component={CommonTextInput}
        label="Sími"
        placeholder=""
      />      
      <Button type="submit"  disabled={pristine || submitting} bsSize="large" variant="primary">
         Áfram
      </Button>
    </Form >

  );
};


PersonalInfoViewForm.propTypes = {
  handleSubmit: PropTypes.func
};

const mapStateToProps = (state) => ({
  initialValues: {
    firstName: state.login.user.firstName,
    lastName: state.login.user.lastName,
    homeAddress: state.login.user.homeAddress,
    postCode: state.login.user.postCode,
    city: state.login.user.city,
    email: state.login.user.email,
    gsm: state.login.user.gsm
  }

});

// create new, "configured" function

const createReduxForm = reduxForm({
  form: 'borrowerPersonal', // a unique identifier for this form
  validate,
  warn,
  enableReinitialize: true
});
// evaluate it for ContactForm component
PersonalInfoViewForm = createReduxForm(PersonalInfoViewForm);

export default connect(mapStateToProps)(PersonalInfoViewForm);

