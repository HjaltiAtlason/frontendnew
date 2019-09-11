import React from 'react';
import PropTypes from 'prop-types';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'

const OfferChart = ({data, dataKey, xLabel, yLabel}) => {
  return (
    <LineChart
      width={1000}
      height={300}
      data={data}
      margin={{top: 5, right: 30, left: 20, bottom: 5}}
    >
      <XAxis dataKey={dataKey} label={xLabel} margin={{top: 10}} />
      <YAxis label={yLabel} />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />      
      <Line type="monotone" dataKey="amountInterest" unit='isk' name='Afborgun vaxta' stroke="#82ca9d" />       
      <Line type="monotone" dataKey="amountPrincipal" unit='isk' name='Afborgun höfuðstóls' stroke="#00229d" />               
    </LineChart>
  );
};

OfferChart.propTypes = {
  data: PropTypes.array,
  dataKey: PropTypes.string,
  xLabel: PropTypes.array,
  yLabel: PropTypes.array
};

export default OfferChart;