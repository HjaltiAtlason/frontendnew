/* import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import NoteFilter from '../helpers/NoteFilter';
import MicroContainer from '../../login/components/MicroContainer';
import { formatCurrency, formatShortDate } from '../../globals/utils';


const PaymentsView = ({ payments }) => {
  return (
    <div>
      <MicroContainer header="Filter">
        <NoteFilter />
      </MicroContainer>

      <MicroContainer header="Safnið þitt">
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Greiðslu nr.</th>
              <th>Bréf nr.</th>
              <th>Dags</th>
              <th>Lýsing</th>
              <th className="right">Upphæð</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={index}>
                <td>{payment.paymentId}</td>
                <td>{payment.noteId}</td>
                <td>{formatShortDate(payment.paymentDate)}</td>
                <td>{payment.paymentType}</td>
                <td className="right">
                  {formatCurrency(payment.amount, true)}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </MicroContainer>
    </div>
  );
};

PaymentsView.propTypes = {
  payments: PropTypes.array
};

const mapStateToProps = (state) => ({
  payments: getPayments(state)
});

export default connect(mapStateToProps)(PaymentsView);
*/