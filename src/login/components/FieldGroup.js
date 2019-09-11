import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';

const FieldGroup = ({
  id,
  type,
  placeholder,
  defaultValue,
  name,
  onChange,
  label,
  inputRef,
  help
}) => {
  return (
    <Form.Group>
      <Form.ControlLabel>{label}</Form.ControlLabel>
      <Form.Control
        id={id}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
        name={name}
        label={label}
        inputRef={inputRef}
      />
      {help && <Form.HelpBlock>{help}</Form.HelpBlock>}
    </Form.Group>
  );
};

FieldGroup.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  name: PropTypes.string,
  inputRef: PropTypes.func,
  onChange: PropTypes.func,

  help: PropTypes.string
};

export default FieldGroup;
