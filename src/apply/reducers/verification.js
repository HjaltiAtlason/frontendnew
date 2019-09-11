import { aT, success } from '../../globals/constants';

const initialState = {
  docsToGetText: null,
  sentFiles: [],
  banki:'',
  gerd:'',
  bankanumer:''
};



export default (state = initialState, action) => {
  switch (action.type) {
    case aT.apply.api.IN_VERIFICATION_DATA_REQUEST: {
      console.log('reducer OFFER_PAYMENTS_REQUEST sent') 
      return state;     
    }
    case success(aT.apply.api.IN_VERIFICATION_DATA_REQUEST): {
      console.log('reducer OFFER_PAYMENTS_REQUEST receved payload:', action.payload)
      return {
        ...state,
        docsToGetText: action.payload.docsToGetText
      };
    }
    case aT.mock.UNLOAD_MOCK_DOCUMENTS_DATA: {
      return initialState;
    }
    case aT.apply.store.SENT_FILE_NAME: {
      console.log('redure SENT_FILE_NAME called')
      return {
        ...state,
        sentFiles: [...state.sentFiles, action.payload]
      }
    }
    case aT.apply.store.BANK_INFO: {
      console.log('reducer verification aT.apply.store.BANK_INFO payload %s', action.payload)
      return {
        ...state,
        banki: action.payload.banki,
        gerd: action.payload.gerd,
        bankanumer: action.payload.bankanumer
      }
    }    
    default:
      return state;
  }
};

// SELECTOR won't work cause reducer has not been explicitly define

export const getdocsToGetText = (state) => {  
  return state.apply.verification.docsToGetText;
};
export const getSentFiles = (state) => {  
  return state.apply.verification.sentFiles;
};
export const getBankInfo = (state) => {
  return {'banki': state.apply.verification.banki, 'gerd': state.apply.verification.gerd, 'bankanumer': state.apply.verification.bankanumer}
}
