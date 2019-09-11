import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
// import { formatCurrency, formatPercent } from '../../utils';


const LoanOfferPaymentsTable = ({ offerPayments }) => {
  return (
    <div>
      { offerPayments.length > 0 ? (
        <div>
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>#</th>
                <th className="right">Höfuðstóll fyrir</th>
                <th className="right">Greiðslu dagur</th>
                <th className="right">Afborganir</th>
                <th className="right">Vaxtagreiðsla</th>
                <th className="right">Kostnaður</th>
                <th className="right">Greiðsla alls</th>
                <th className="right">Höfðustóll eftir</th>
              </tr>
            </thead>
            <tbody>
              {offerPayments.map((payment, index) => (
                <tr key={index}>
                  <td>{payment.paymentNumber}</td>
                  <td className="right">
                    {payment.principalBefore}
                  </td>
                  <td className="right">
                    {payment.paymentDate}
                  </td>
                  <td className="right">
                    {payment.amountPrincipal}
                  </td>
                  <td className="right">
                    {payment.amountInterest}
                  </td>
                  <td className="right">
                    {payment.transactionCost}
                  </td>
                  <td className="right">
                    {payment.amountAll}
                  </td>
                  <td className="right">
                    {payment.principalLeft}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        ) : null}
    </div>
  );
};

LoanOfferPaymentsTable.propTypes = {
  offerPayments: PropTypes.array
};

export default LoanOfferPaymentsTable;

