import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSentFiles } from '../../reducers/verification';
import MicroContainer from '../../../login/components/MicroContainer'

const ShowFiles = ({sentFiles}) => {
  return (
    <MicroContainer header="Sendar skrár">   
      <div>
        {sentFiles.map((ff,index) => (
          <h3 key={index}>{ff}</h3>
      ))}
      </div>   
    </MicroContainer>
  );
};

ShowFiles.propTypes = {
  sentFiles: PropTypes.array
}

const mapStateToProps = (state) => ({
  sentFiles: getSentFiles(state)
});

export default connect(mapStateToProps)(ShowFiles);