import React from 'react';
import PropTypes from 'prop-types';
import investorViewKeys from './constants';
import { renderNavItem } from '../globals/utils';

const InvestorMenu = ({ viewKey, dispatch }) => {
  return (
    <div>
      <ul className="nav nav-pills" role="tablist">
        {renderNavItem(
          investorViewKeys.ADD_FUNDS,
          viewKey,
          'add',
          'Millifæra',
          dispatch
        )}
        {renderNavItem(
          investorViewKeys.BUY_NOTES,
          viewKey,
          'library_add',
          'Fjárfesta',
          dispatch
        )}
        {renderNavItem(
          investorViewKeys.PORTFOLIO,
          viewKey,
          'account_balance_wallet',
          'Safnið',
          dispatch
        )}
        {renderNavItem(
          investorViewKeys.PAYMENTS,
          viewKey,
          'list',
          'Greiðsluyfirlit',
          dispatch
        )}
        {renderNavItem(
          investorViewKeys.INVESTOR_ACCOUNT,
          viewKey,
          'account_balance',
          'Ávöxtun',
          dispatch
        )}
        {renderNavItem(
          investorViewKeys.PERSONAL_INFO,
          viewKey,
          'account_box',
          'Mínar upplýsingar',
          dispatch
        )}
      </ul>
    </div>
  );
};

InvestorMenu.propTypes = {
  viewKey: PropTypes.string,
  dispatch: PropTypes.func
};

export default InvestorMenu;
