import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const CommonEmailInput = ({
  input: { value, onChange, name },
  meta: { touched, error, warning },
  label,
  placeholder

  // placeholder
}) => {
  return (
    <Form.Group controlId="formHorizontal">
      <Col sm={4}>
        {label}
      </Col>
      <Col sm={6}>
        <Form.Control
          type="email"
          placeholder={placeholder}
          onChange={onChange}
          name={name}
        />{'   '}
      </Col>
      <br />
      <div>
        <p> {touched && ((error && <span>{error}</span>) ||
         (warning && <span>{warning}</span>))}
        </p>
      </div>
    </Form.Group>
  );
};

CommonEmailInput.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  label: PropTypes.string,
  placeholder: PropTypes.string
};

export default CommonEmailInput;
