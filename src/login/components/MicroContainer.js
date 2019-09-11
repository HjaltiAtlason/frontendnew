import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

const MicroContainer = ({ header, children }) => {
  const style = {
    cont: {
      margin: 5
    }
  };
  return (
    <Card style={style.cont} bsStyle="default">
      <Card.Body>
        <Card.Title>{header}</Card.Title>
          {children}
      </Card.Body>
    </Card>
  );
};

MicroContainer.propTypes = {
  header: PropTypes.string,
  children: PropTypes.element.isRequired
};

export default MicroContainer;
