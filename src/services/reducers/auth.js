import { getCookie } from '../../utils/utils';
import {
  AUTH_TOKENS,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILED,
  REDIRECT_TO_HOMEPAGE,
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
  UPDATE_TOKENS
} from '../actions/auth';

const authInitianState = {
  user: {},
  accessToken: '',
  refreshToken: '',
  getUserRequest: false,
  getUserFailed: false,
  refreshTokenRequest: false,
  refreshTokenFailed: false,
  registrationRequest: false,
  registrationFailed: false,
  loginRequest: false,
  loginFailed: false,
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
    case UPDATE_TOKENS: {
      return {
        ...state,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken
      }
    }

    default: {
      return state;
    }
  }
}