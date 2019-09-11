import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import { formatCurrency, formatPercent, formatShortDate } from '../../globals/utils';
import NoteFilter from '../helpers/NoteFilter';

const PortfolioView = ({ notes }) => {
  return (
    <div>
      <h3>Filter</h3>
      <NoteFilter />

      <h3>Safnið þitt</h3>
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>Dags keypt</th>
            <th className="right">Vextir</th>
            <th className="right">Lánshæfi</th>
            <th>Staða láns</th>
            <th className="right">Höfuðstóll eftir</th>
            <th className="right">Fjöldi greiðsla eftir</th>
            <th className="right">Þóknunargjöld</th>
            <th className="right">Seinar greiðslur</th>
            <th className="right">Innheimtu kostnaður</th>
            <th className="right">Áætlaður höfuðstóll</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note, index) => (
            <tr key={index}>
              <td>{formatShortDate(note.noteDate)}</td>
              <td className="right">
                {formatPercent(note.interestRate, true)}
              </td>
              <td className="right">{note.creditScore}</td>
              <td>{note.loanStatus}</td>
              <td className="right">
                {formatCurrency(note.remainingPrincipalAmt, true)}
              </td>
              <td className="right">{note.paymentsLeft}</td>
              <td className="right">
                {formatCurrency(note.serviceFeesAmt, true)}
              </td>
              <td className="right">
                {formatCurrency(note.lateFeesAmt, true)}
              </td>
              <td className="right">
                {formatCurrency(note.collectionFeesAmt, true)}
              </td>
              <td className="right">
                {formatCurrency(note.adjustedPrincipalAmt, true)}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

PortfolioView.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = (state) => ({
  notes: state.invest.notes
});

export default connect(mapStateToProps)(PortfolioView);
