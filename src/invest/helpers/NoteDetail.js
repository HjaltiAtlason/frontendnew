import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import MicroContainer from '../../login/components/MicroContainer';
import { formatCurrency, formatPercent, formatShortDate } from '../../globals/utils';

const NoteDetail = ({ loan }) => {
  return (
    <div>
      <MicroContainer title="Loan nr xxxx">
        <div>
          <p>
            Lánsumsókn samþykkt: {formatShortDate(loan.applicationApproveDate)}
          </p>
          <p>Lánsumsókn staðfest: {loan.isVerified}</p>
          <p>
            Mánaðarlegar greiðslur:{' '}
            {formatCurrency(loan.monthlyPaymentsAmt, true)}
          </p>
        </div>
      </MicroContainer>
      <MicroContainer title="Lántaki">
        <div>
          <p>Húseigandi: {loan.applicant.homeowner}</p>
          <p>Tímalengd í núverandi vinnu: {loan.applicant.sameJobYears}</p>
          <p>Mánaðarlaun: {loan.applicant.monthlySalary}</p>
          <p>
            Afborganir sem hlutfall af launum:{' '}
            {formatPercent(loan.applicant.totalPaymentsVsSalaryRatio, true)}
          </p>
          <p>Starfsvið: {loan.applicant.fieldOfWork}</p>
          <p>Menntun: {loan.applicant.education}</p>
          {loan.applicant.otherLoans.length > 0 ? (
            <div>
              <p>Önnur lán:</p>
              <Table striped bordered condensed hover>
                <thead>
                  <tr>
                    <th>Lokagreiðsla láns</th>
                    <th className="right">Höfuðstóll eftir</th>
                    <th className="right">Mánaðargreiðslur</th>
                  </tr>
                </thead>
                <tbody>
                  {loan.applicant.otherLoans.map((otherLoan, index) => (
                    <tr key={index}>
                      <td>{formatShortDate(otherLoan.maturityDate)}</td>
                      <td className="right">
                        {formatCurrency(otherLoan.remainingPrincipalAmt, true)}
                      </td>
                      <td className="right">
                        {formatCurrency(otherLoan.monthlyPaymentsAmt, true)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : null}
        </div>
      </MicroContainer>
      <button className="btn btn-primary">Kaupa bréf</button>
    </div>
  );
};

NoteDetail.propTypes = {
  loan: PropTypes.object
};

const mapStateToProps = (state) => ({
  loan: state.loan
});

export default connect(mapStateToProps)(NoteDetail);
