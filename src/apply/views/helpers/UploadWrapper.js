import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { getdocsToGetText } from '../../reducers/verification';
import {fileView} from '../../utils'
import { applicantViewKeys } from '../../constants';
import UploadFile from './UploadFile';
import { getUser } from '../../../login/reducers/user';

const UploadWrapper = ({ getDocText, user, dispatch}) => {
  return (
    <div>      
      <h3> {getDocText} </h3>
      <UploadFile dispatch={dispatch} firstName={user.firstName} />
    </div>
  );
};

UploadWrapper.propTypes = {
  getDocText: PropTypes.string,
  user: PropTypes.object,
  dispatch: PropTypes.func
};

const mapStateToProps = (state) => ({
  getDocText: getdocsToGetText(state),
  user: getUser(state)
});

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadWrapper);
