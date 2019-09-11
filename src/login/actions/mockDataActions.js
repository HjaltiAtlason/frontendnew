import { aT } from '../../globals/constants';

export const loadMockData = () => {
  return [
    {
      type: aT.mock.LOAD_MOCK_ACCOUNT_DATA
    },
    {
      type: aT.mock.LOAD_MOCK_DOCUMENTS_DATA
    },
    {
      type: aT.mock.LOAD_MOCK_LOAN_DATA
    },
    {
      type: aT.mock.LOAD_MOCK_NOTES_DATA
    },
    {
      type: aT.mock.LOAD_MOCK_PAYMENTS_DATA
    },
    {
      type: aT.mock.LOAD_MOCK_USER_DATA
    },
    {
      type: aT.mock.LOAD_MOCK_APPLY_INFO
    }
  ];
};

export const unloadMockData = () => {
  return [
    {
      type: aT.mock.UNLOAD_MOCK_ACCOUNT_DATA
    },
    {
      type: aT.mock.UNLOAD_MOCK_DOCUMENTS_DATA
    },
    {
      type: aT.mock.UNLOAD_MOCK_LOAN_DATA
    },
    {
      type: aT.mock.UNLOAD_MOCK_NOTES_DATA
    },
    {
      type: aT.mock.UNLOAD_MOCK_PAYMENTS_DATA
    },
    {
      type: aT.mock.UNLOAD_MOCK_USER_DATA
    }
  ];
};

export const restartLogin = () => {
  return {
    type: aT.mock.RESTART_LOGIN
  }
}
