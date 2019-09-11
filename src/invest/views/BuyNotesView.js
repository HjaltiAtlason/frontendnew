import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, ButtonToolbar, Table } from 'react-bootstrap';
import NoteFilter from '../helpers/NoteFilter';
import MicroContainer from '../../login/components/MicroContainer';
import NoteDetail from '../helpers/NoteDetail';
import {
  formatCurrency,
  formatPercent
} from '../../globals/utils';
import {loanPurposeDescription} from './../utils'

const BuyNotesView = ({ notes, user, dispatch, viewKey, onboarding }) => {
  const next = () => {
    // dispatch(onboardedUser(viewKey, sections.INVEST));
  };

  return (
    <div>
      <MicroContainer header="Reikningur">
        <p>Laust fé á reikningi: {user.fundsAddedAmt}</p>
      </MicroContainer>
      <MicroContainer header={'Filter'}>
        <NoteFilter />
      </MicroContainer>

      {notes.length > 0 ? (
        <div>
          <h3>Listi af bréfum í fjármögnun</h3>
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>Láns nr.</th>
                <th className="right">Vextir</th>
                <th className="right">Lánshæfi</th>
                <th className="right">Höfuðstóll</th>
                <th>Tilgangur</th>
                <th className="right">Fjármagnað %</th>
                <th>Tími eftir</th>
              </tr>
            </thead>
            <tbody>
              {notes.map((note, index) => (
                <tr key={index}>
                  <td>{note.loanId}</td>
                  <td className="right">
                    {formatPercent(note.interestRate, true)}
                  </td>
                  <td className="right">{note.creditScore}</td>
                  <td className="right">
                    {formatCurrency(note.loanPrincipalAmt, true)}
                  </td>
                  <td>{loanPurposeDescription(note.loanPurpose)}</td>
                  <td className="right">
                    {formatPercent(note.paymentRatio, true)}
                  </td>
                  <td>{note.daysLeft} dagar</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : null}
      <h3>Bréf nr:</h3>
      <NoteDetail />

      {onboarding ? (
        <ButtonToolbar>
          <Button onClick={next} bsSize="large" variant="primary">
            Áfram
          </Button>
        </ButtonToolbar>
      ) : null}
    </div>
  );
};

BuyNotesView.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object),
  dispatch: PropTypes.func.isRequired,
  viewKey: PropTypes.string.isRequired,
  onboarding: PropTypes.bool.isRequired,
  user: PropTypes.object
};
const mapStateToProps = (state) => ({
  notes: state.invest.notes,
  user: state.login.user
});

export default connect(mapStateToProps)(BuyNotesView);
