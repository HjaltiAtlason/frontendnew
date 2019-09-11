import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const CommonSelectInput = ({
  input: {
    value,
    onChange,
    name
    // type
  },
  meta: {
    touched,
    error,
    warning
  },
  label,
  // placeholder,
  valuelist
}) => {
  return (
    <Form>
      <Form.Group controlId="formHorizontal">
        <Col sm={4}>
          {label}
        </Col>
        <Col sm={6}>
          <Form.Control            
            as="select"
            placeholder={value}
            onChange={onChange}
            name={name}
          >
            {valuelist.map((reason) => (
              <option value={reason.description} key={reason.key}>
                {reason.description}
              </option>
            ))}
          </Form.Control>
        </Col>

        <br />
        <div>
          <p>
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
          </p>
        </div>
      </Form.Group>
    </Form>
  );
};

CommonSelectInput.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  label: PropTypes.string,
  valuelist: PropTypes.array
};

export default CommonSelectInput;
