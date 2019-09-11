import React from 'react';
import PropTypes from 'prop-types';
import Slider from '../../../login/components/SliderComponent';
import { accountSettings } from '../../actions/investorActions';


const RiskAppetite = ({dispatch}) => {
  const onChange = (value) => {
    dispatch(accountSettings(value))
  }
  return (
    <div>
      <h2>Show dragbar</h2>
      <Slider value='30' onChange={onChange} />
    </div>
  );
};

RiskAppetite.propTypes = {
  dispatch: PropTypes.func
};
  
export default RiskAppetite;