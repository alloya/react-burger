import { getCookie } from '../../utils/utils';
import {
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  REGISTRATION_REQUEST,
  REGISTRATION_FAILED,
  REGISTRATION_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  AUTH_SUCCESS,
  AUTH_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  RESET_UPDATE_USER,
  UPDATE_TOKENS,
  LOGOUT_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  PASSWORD_RESET_FAILED,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_REQUEST,
  RESET_PASSWORD_RESET_STATE,
  SET_PASSWORD_REQUEST,
  SET_PASSWORD_SUCCESS,
  SET_PASSWORD_FAILED,
} from '../constants/auth';

const authInitianState = {
  user: {},
  accessToken: '',
  refreshToken: '',
  getUserRequest: false,
  getUserFailed: false,
  refreshTokenRequest: false,
  refreshTokenFailed: false,
  refreshTokenSuccess: false,
  registrationRequest: false,
  registrationFailed: false,
  registrationSuccess: false,
  loginRequest: false,
  loginFailed: false,
  logoutRequest: false,
  logoutFailed: false,
  logoutSuccess: false,
  updateUserRequest: false,
  updateUserFailed: false,
  updateUserSuccess: false,
  passwordResetRequest: false,
  passwordResetSuccess: false,
  passwordResetFailed: false,
  setPasswordRequest: false,
  setPasswordSuccess: false,
  setPasswordFailed: false,
  token: getCookie('token'),
  isAuth: Boolean(getCookie('token'))
};

export const authReducer = (state = authInitianState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true,
        getUserFailed: false
      };
    }
    case GET_USER_FAILED: {
      return {
        state,
        getUserRequest: false,
        getUserFailed: true
      }
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        getUserRequest: false
      }
    }
    case REFRESH_TOKEN_REQUEST: {
      return {
        ...state,
        refreshTokenRequest: true
      }
    }
    case REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        refreshTokenRequest: false,
        refreshTokenSuccess: true
      }
    }
    case REFRESH_TOKEN_FAILED: {
      return {
        ...state,
        refreshTokenRequest: false,
        refreshTokenFailed: true
      }
    }
    case REGISTRATION_REQUEST: {
      return {
        ...state,
        registrationRequest: true
      }
    }
    case REGISTRATION_FAILED: {
      return {
        ...state,
        registrationRequest: false,
        registrationFailed: true
      }
    }
    case REGISTRATION_SUCCESS: {
      return {
        ...state,
        registrationRequest: false,
        registrationSuccess: true
      }
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true
      }
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.user,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        loginRequest: false
      }
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: true
      }
    }
    case AUTH_SUCCESS: {
      return {
        ...state,
        isAuth: true
      }
    }
    case AUTH_FAILED: {
      return {
        ...state,
        isAuth: false
      }
    }
    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateUserRequest: true
      }
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        updateUserSuccess: true,
        updateUserRequest: false,
        user: action.payload
      }
    }
    case UPDATE_USER_FAILED: {
      return {
        ...state,
        updateUserFailed: true,
        updateUserRequest: false
      }
    }
    case RESET_UPDATE_USER: {
      return {
        ...state,
        updateUserSuccess: false
      }
    }
    case UPDATE_TOKENS: {
      return {
        ...state,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken
      }
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true
      }
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutRequest: false,
        logoutSuccess: true,
        isAuth: false
      }
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        logoutRequest: false,
        logoutFailed: true
      }
    }
    case PASSWORD_RESET_REQUEST: {
      return {
        ...state,
        passwordResetRequest: true,
        passwordResetFailed: false,
        passwordResetSuccess: false
      }
    }
    case PASSWORD_RESET_SUCCESS: {
      return {
        ...state,
        passwordResetRequest: false,
        passwordResetSuccess: true
      }
    }
    case PASSWORD_RESET_FAILED: {
      return {
        ...state,
        passwordResetRequest: false,
        passwordResetFailed: true
      }
    }
    case RESET_PASSWORD_RESET_STATE: {
      return {
        ...state,
        passwordResetRequest: false,
        passwordResetFailed: false,
        passwordResetSuccess: false,
        setPasswordRequest: false,
        setPasswordFailed: false,
        setPasswordSuccess: false
      }
    }
    case SET_PASSWORD_REQUEST: {
      return {
        ...state,
        setPasswordRequest: true,
        setPasswordSuccess: false,
        setPasswordFailed: false
      }
    }
    case SET_PASSWORD_SUCCESS: {
      return {
        ...state,
        setPasswordRequest: false,
        setPasswordSuccess: true,
        setPasswordFailed: false
      }
    }
    case SET_PASSWORD_FAILED: {
      return {
        ...state,
        setPasswordRequest: false,
        setPasswordSuccess: false,
        setPasswordFailed: true
      }
    }
    default: {
      return state;
    }
  }
}