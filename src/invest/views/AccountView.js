import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MicroContainer from '../../login/components/MicroContainer';
import { formatCurrency, formatPercent } from '../../globals/utils';

const AccountView = ({ account }) => {
  return (
    <div>
      <MicroContainer header="Reikningur samantekt">
        <div>
          <h3>
            Vegnir meðal vextir:{' '}
            {formatPercent(account.averageInterestRate, true)}
          </h3>
          <br />
          <h4>
            Staða reiknings: {formatCurrency(account.totalAccountValueAmt)}
          </h4>
          <p>
            Áætluð töp vegna vaskila:{' '}
            {formatCurrency(account.estimatedFutureLossAmt)}
          </p>
          <p>
            Staða reiknings áætluð:{' '}
            {formatCurrency(account.totalAccountEstimateAmt)}
          </p>
          <br />
          <h4>
            Mótteknar greiðslur heild:{' '}
            {formatCurrency(account.totalReceivedAmt)}
          </h4>
          <p>
            Höfuðstóls greiðslur {formatCurrency(account.principalReceivedAmt)}
          </p>
          <p>Vaxtagreiðslur {formatCurrency(account.interestReceivedAmt)}</p>
          <p>
            Tekjur af seinum greiðslum{' '}
            {formatCurrency(account.lateFeesReceivedAmt)}
          </p>
          <p>
            Endurheimtur af afskrifuðum lánum{' '}
            {formatCurrency(account.netRecoveriesRecivedAmt)}
          </p>
        </div>
      </MicroContainer>

      <MicroContainer header="Safnið samantekt">
        <div>
          <h4>Jöfnubréf mín alls: {account.numTotalNotes} </h4>
          <p>Endurgreidd: {account.numNotesFullyPaid} </p>
          <p>Óútgefin/loforð: {account.numNotesCommited} </p>
          <p>Í skilum: {account.numNotesCurrent} </p>
          <p>Í smá vanskilum 1-15 daga sein: {account.numNotesInGrace} </p>
          <p>Í vanskilum (16-30) daga sein: {account.numNotesInSub30} </p>
          <p>Í vanskilum (31-120) daga sein: {account.numNotesInSub120} </p>
          <p>Í greiðslumeðferð (121-150): {account.numNotesInDefault} </p>
          <p>Afskrifuð: {account.numNotesWrittenOff} </p>
        </div>
      </MicroContainer>
    </div>
  );
};

AccountView.propTypes = {
  account: PropTypes.object
};

const mapStateToProps = (state) => ({
  account: state.invest.account
});

export default connect(mapStateToProps)(AccountView);
