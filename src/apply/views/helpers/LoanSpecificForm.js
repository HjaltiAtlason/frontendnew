import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import LoanDisclosure from './LoanDisclosure';
import { selectYesNo } from '../../../globals/constants';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button'
import CommonTextInput from '../../../login/components/CommonTextInput';
import CommonSelectInput from '../../../login/components/CommonSelectInput';
import { getApplyInfo } from '../../reducers/applyInfo';


const validate = (values) => {
  const errors = {};
  if (!values.isHomeOwner || values.isHomeOwner === 'Veldu...') {
    errors.isHomeOwner = 'Required';
  }
  if (!values.salary) {
    errors.salary = 'Required';
  } else if (isNaN(Number(values.salary))) {
    errors.salary = 'Must be a number';
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


let LoanSpecificForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <Form id="LoanSpecific-form" onSubmit={handleSubmit} horizontal>

      <Field
        name="salary"
        component={CommonTextInput}
        label="Laun"
        placeholder="Sláðu inn mánaðarlaun"
      />
      <Field
        name="isHomeOwner"
        component={CommonSelectInput}
        label="Í eigin húsnæði"
        placeholder="true"
        valuelist={selectYesNo}
      />

      <Form.Group>
        <Col sm={2} />
        <Col sm={10}>
          <LoanDisclosure />
        </Col>
      </Form.Group>
      <Button type="submit" disabled={pristine || submitting} bsSize="large" variant="primary">
         Sækja um lán
      </Button>
      <Button type="button" disabled={pristine || submitting} onClick={reset} bsSize="large" variant="primary">
         Hreinsa val
      </Button>
    </Form >

  );
};


LoanSpecificForm.propTypes = {
  handleSubmit: PropTypes.func
};


// TODO: This form should be called ApplicantInfoForm
// TODO: There should be a lot of init values.
const mapStateToProps = (state) => ({
  initialValues: {
    salary: getApplyInfo(state).salary
  }
});

// create new, "configured" function

const createReduxForm = reduxForm({
  form: 'borrowerLoanSpecific', // a unique identifier for this form
  validate,
  warn
});
// evaluate it for ContactForm component
LoanSpecificForm = createReduxForm(LoanSpecificForm);

export default connect(mapStateToProps)(LoanSpecificForm);

