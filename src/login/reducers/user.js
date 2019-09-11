import { aT, success, fail } from '../../globals/constants';


// This is so messy!! TODO: Clean Up!!

// Make the investor and the applicant "inherit" from this!

const initialState = {
  userName: null,
  firstName: 'ullur',
  lastName: null,
  email: '',
  gsm: null,
  homeAddress: null,
  postCode: null,
  city: null,
  bankId: null,
  bankAccountType: null,
  bankAccountNumber: null,
  // fundsAddedAmt: null, // investor only?
  isJafnaMember: false,
  hasAppliedForMembership: false, // is this really needed? Sagas can do this.
  // isBorrower: null, // deprecated in favor of inheritance
  // applicationStep: '', // applicant only.
  token: '',
  loginguid: '',
  isEmailVerified: false,
  emailGuid: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case aT.mock.LOAD_MOCK_USER_DATA: {
      return {
        ui: {
          isloggingIn: false,
          isLoggedIn: false,
          isLoading: false,
          isValidFetch: false
        },
        userName: 'johnnyappleseed',
        firstName: 'Johnny',
        lastName: 'Appleseed',
        email: 'appleseed@gmail.com',
        gsm: '5656633',
        homeAddress: 'My home',
        postCode: '',
        city: 'Reykjavik',
        bankId: null,
        bankAccountType: null,
        bankAccountNumber: null,
        fundsAddedAmt: 25000,
        isJafnaMember: false,
        applyForMembership: false,
        token: ''        
      };
    }
    case aT.mock.UNLOAD_MOCK_USER_DATA: {
      return initialState;
    }
    case success(aT.login.api.USER_INFO_PUT): {
      console.log('inside reduces user success USER_INFO_PUT  payload', action.payload)
      const data = action.payload
      return {
        ...state,
        userName: data.userName,
        firstName: data.firstName,
        lastName: data.lastName,
        homeAddress: data.homeAddress,
        postCode: data.postCode,
        gsm: data.gsm,
        email: data.email,
        city: data.city,
        bankId: data.bankId,
        bankAccountType: data.bankAccountType,
        bankAccountNumber: data.bankAccountNumber,
        isJafnaMember: data.isJafnaMember        
      }
    }
    case aT.login.api.USER_REQUEST: {
      return {
        ...state,
        ui: {
          ...state.ui,
          isValidFetch: false,
          isLoading: true
        }
      };
    }
    case success(aT.login.api.USER_REQUEST): {
      const data = action.payload;      
      return {
        ...state,
        userName: data.userName,
        firstName: data.firstName,
        lastName: data.lastName,
        homeAddress: data.homeAddress,
        postCode: data.postCode,
        gsm: data.gsm,
        email: data.email,
        city: data.city,
        bankId: data.bankId,
        bankAccountType: data.bankAccountType,
        bankAccountNumber: data.bankAccountNumber,
        isJafnaMember: data.isJafnaMember
      };
    }
    case fail(aT.login.api.USER_REQUEST): {
      return {
        ...state,
        ui: {
          ...state.ui,
          isValidFetch: false,
          isLoading: false
        }
      };
    }
    case success(aT.login.api.LOGIN_COMPLETION_B_REQUEST): {
      return {
        ...state,
        userName: action.payload.username,
        firstName: action.payload.firstName,
        borrowerId: action.payload.id,
        step: action.payload.step,
        token: action.payload.token
      };
    }
    case success(aT.login.api.LOGIN_COMPLETION_I_REQUEST): {
      return {
        ...state,
        userName: action.payload.username,
        firstName: action.payload.firstName,
        investorId: action.payload.id,
        investorStep: action.payload.step,
        token: action.payload.token
      };
    }
    case fail(aT.apply.api.BORROWER_DEV_LOGIN): {
      return {
        ...state,
        ui: {
          ...state.ui,
          isValidFetch: false,
          isLoading: false
        }
      };
    }
    case success(aT.login.api.LOGIN_GUID_REQUEST): {
      return {
        ...state,
        loginguid: action.payload.loginguid
      };
    }
    case aT.login.BECOME_JAFNA_MEMBER: {
      return {
        ...state,
        hasAppliedForMembership: true
      };
    }
    case success(aT.login.api.VERIFY_EMAIL_POST): {      
      console.log('inside reduces user VERIFY_EMAIL_POST  payload', action.payload)
      return {        
        ...state,
        email: action.payload.new_email,
        emailGuid: action.payload.emailGuid
      }
    }
    case success(aT.login.api.IS_EMAIL_VERIFIED_REQUEST): {      
      console.log('inside reduces user IS_EMAIL_VERIFIED_REQUEST  payload', action.payload)
      return {        
        ...state,
        isEmailVerified: action.payload.isEmailVerified        
      }
    }

    default:
      return state;
  }
};


// Selectors - Make sagas simpler.
export const getToken = (state) => state.login.user.token;

export const getLoginGuid = (state) => state.login.user.loginguid;

export const getIsLoggedIn = (state) => {
  if (state.login.user.token)
    return (state.login.user.token.length > 0)
  return false
};

export const getUI = (state) => state.login.user.ui;

export const getIsUserInfoStored = (state) => {
  if (state.login.user.postCode)
    return (state.login.user.postCode.length > 0)
  return false
}

export const getUser = (state) => ({
  userName: state.login.user.userName,
  firstName: state.login.user.firstName,
  lastName: state.login.user.lastName,
  email: state.login.user.email,
  gsm: state.login.user.gsm,
  homeAddress: state.login.user.homeAddress,
  postCode: state.login.user.postCode,
  city: state.login.user.city,
  bankId: state.login.user.bankId,
  bankAccountType: state.login.user.bankAccountType,
  bankAccountNumber: state.login.user.bankAccountNumber,
  isJafnaMember: state.login.user.isJafnaMember,
  hasAppliedForMembership: state.login.user.hasAppliedForMembership
});

export const getIsEmailVerified = (state) => {  
  return state.login.user.isEmailVerified
}
