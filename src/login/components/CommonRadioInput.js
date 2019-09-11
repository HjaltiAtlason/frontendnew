import React from 'react';
import PropTypes from 'prop-types';
import InputGroup from 'react-bootstrap/InputGroup';

const CommonRadioInput = ({
  input: { onChange, name }, // value
  meta: { touched, error, warning },
  label
  // placeholder
}) => {
  return (
    <div>
      <InputGroup.Checkbox
        type="checkbox"
        onChange={onChange}
        key={label}
        name={name}
        label={label}
        handleCheckboxChange={this.toggleCheckbox}
      />
      <br />
      <div>
        <p> {touched && ((error && <span>{error}</span>) ||
        (warning && <span>{warning}</span>))}
        </p>
      </div>
    </div>
  );
};

CommonRadioInput.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  label: PropTypes.string
};

export default CommonRadioInput;
