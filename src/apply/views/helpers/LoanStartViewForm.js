import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import {
  Button,
  Form
} from 'react-bootstrap';
import { loanPurposes } from '../../constants';
import CommonTextInput from '../../../login/components/CommonTextInput';
import CommonSelectInput from '../../../login/components/CommonSelectInput';
import { getApplyInfo } from '../../reducers/applyInfo';


const validate = (values) => {
  const errors = {};
  if (!values.purpose) {
    errors.purpose = 'Required';
  }
  if (values.purpose === 'Veldu...') {
    errors.purpose = 'Required';
  }
  if (!values.principalRequested) {
    errors.principalRequested = 'Required';
  } else if (isNaN(Number(values.principalRequested))) {
    errors.principalRequested = 'Must be a number';
  } else if ((Number(values.principalRequested) < 200) || (Number(values.principalRequested) > 4000)) {
    errors.principalRequested = 'Upphæð verður að vera á milli 200 og 4000';
  }
  if (!values.durationRequested) {
    errors.durationRequested = 'Required';
  } else if (isNaN(Number(values.durationRequested))) {
    errors.durationRequested = 'Must be a number';
  } else if ((Number(values.durationRequested) < 12) || (Number(values.durationRequested) > 36)) {
    errors.durationRequested = 'Tímalengd láns verður að vera á milli 12 og 36';
  }
  if (!values.purpose) {
    errors.purpose = 'Required';
  }

  return errors;
};

const warn = (values) => {
  const warnings = {};
  if (values.principalRequested < 200) {
    warnings.principalRequested = 'Of lág upphæð';
  }
  return warnings;
};


let LoanStartViewForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <Form id="LoanStartForm-form" onSubmit={handleSubmit} horizontal>
      <Field
        name="purpose"
        component={CommonSelectInput}
        label=" Veldu tilgang láns"
        valuelist={loanPurposes}   
        placeholder="Veldu mig..."     
      />
      <Field
        name="principalRequested"
        component={CommonTextInput}
        label="Lánsupphæð"
        placeholder="200 til 4.000 þúsund isk"
        value="200 til 4.000 þúsund isk"
        type="text"
      />
      <Field
        name="durationRequested"
        component={CommonTextInput}
        label="Lánstími"
        placeholder="Milli 12 og 36 mánuðir"
        type="text"
      />
      <Button type="submit" disabled={pristine || submitting} bsSize="large" variant="primary">
        Athuga lánsvextina
      </Button>
      <Button type="button" disabled={pristine || submitting} onClick={reset} bsSize="large" variant="primary">
          Clear Values
      </Button>
    </Form >
  );
};

/*
<button type="button" disabled={pristine || submitting} onClick={reset}>
Clear Values
</button>
*/

LoanStartViewForm.propTypes = {
  handleSubmit: PropTypes.func  
};


const mapStateToProps = (state) => ({
  applyInfo: getApplyInfo(state),
  initialValues: {
    principalRequested: getApplyInfo(state).principalRequested,
    durationRequested: getApplyInfo(state).durationRequested
  }
});

// create new, "configured" function
const createReduxForm = reduxForm({
  form: 'syncValidation', // a unique identifier for this form
  validate,
  warn
});
// evaluate it for ContactForm component
LoanStartViewForm = createReduxForm(LoanStartViewForm);

export default connect(mapStateToProps)(LoanStartViewForm);
