import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AboutJafna = ({ company }) => {
  return (
    <div className="main main-raised">
      <div className="container">
        <div className="section landing-section">
          <h2>Um fyrirtækið</h2>
          <p>
            {company.name} <br />
            {company.address} <br />
            Stofnað {company.founded} <br />
          </p>
        </div>
      </div>
    </div>
  );
};

AboutJafna.propTypes = {
  company: PropTypes.object
};

const mapStateToProps = (state) => ({
  company: state.company
});

export default connect(mapStateToProps)(AboutJafna);
