import React from 'react';
// import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap/Button';
// import { userActions } from '../actions/userActions';
// import { applicantViewKeys } from '../../globals/constants';


const JafnaMemberSchedule = () => {
  return (
    <div>
      <h2>Rafræn kosning til stjónar verður milli x maí til x maí á ári hverju</h2>
      <h4>Arðgreiðslu saga félagsins</h4>
      <h4>Núverandi hlutur þinn á arðgreiðslu ársins</h4>
      <h4>Aðalfundur félagsins verður haldinn xx júní</h4>

      <form
        onSubmit={() => {
        // dispatch(userActions(applicantViewKeys.IN_FUNDING));
        }}
      >
        <Button type="submit" bsSize="large" variant="primary">
                    Býð mig fram til stjórnar
        </Button>
      </form>
    </div>
  );
};

JafnaMemberSchedule.propTypes = {
  // reasons: PropTypes.array
};

export default JafnaMemberSchedule;
