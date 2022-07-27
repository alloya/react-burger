import { createUser, getUserRequest, loginRequest, logoutRequest, patchUserRequest, refreshTokenRequest, resetPasswordRequest, setNewPasswordRequest } from "../../utils/api";
import { deleteCookie, getCookie, getRefreshToken, setCookie, setRefreshToken, deleteRefreshToken } from "../../utils/utils";

export const AUTH_TOKENS = 'AUTH_TOKENS';
export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILED = 'REFRESH_TOKEN_FAILED';
export const REDIRECT_TO_HOMEPAGE = 'REDIRECT_TO_HOMEPAGE';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAILED = 'REGISTRATION_FAILED';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILED = 'AUTH_FAILED';
export const UPDATE_TOKENS = 'UPDATE_TOKENS';
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';
export const PASSWORD_RESET_REQUEST = 'PASSWORD_RESET_REQUEST';
export const PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS';
export const PASSWORD_RESET_FAILED = 'PASSWORD_RESET_FAILED';
export const RESET_PASSWORD_RESET_STATE = 'RESET_PASSWORD_RESET_STATE';
export const SET_PASSWORD_REQUEST = 'SET_PASSWORD_REQUEST';
export const SET_PASSWORD_SUCCESS = 'SET_PASSWORD_SUCCESS';
export const SET_PASSWORD_FAILED = 'SET_PASSWORD_FAILED';

export const refreshAccessToken = (refreshToken) => async (dispatch) => {
  dispatch({
    type: REFRESH_TOKEN_REQUEST
  });
  try {
    let res = await refreshTokenRequest(refreshToken)
    if (res && res.success) {
      updateTokens(res.accessToken, res.refreshToken)
      dispatch({
        type: REFRESH_TOKEN_SUCCESS
      });
    }
    else {
      dispatch({
        type: REFRESH_TOKEN_FAILED
      });
      throw ('Refresh access token failed');
    }
  } catch (error) {
    console.log(error)
  }
}

export const getUser = () => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  try {
    let res = await getUserRequest();
    if (res && res.success) {
      dispatch({
        type: GET_USER_SUCCESS,
        payload: res.user
      });
    }
  } catch (error) {
    dispatch({ type: GET_USER_FAILED });
    console.log(error)
  }
}

export const updateTokens = (accessToken, refreshToken) => {
  setCookie('token', accessToken, { expires: 1200 });
  setRefreshToken('refreshToken', refreshToken);
  return {
    type: UPDATE_TOKENS,
    accessToken,
    refreshToken
  }
}

export const registration = (form) => (dispatch) => {
  dispatch({
    type: REGISTRATION_REQUEST
  });
  createUser(form)
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: REGISTRATION_SUCCESS,
          user: res.user,
          accessToken: res.accessToken,
          refreshToken: res.refreshToken
        });
        dispatch(updateTokens(res.accessToken, res.refreshToken));
        dispatch(setAuth());
      }
    })
    .catch(err => {
      dispatch({
        type: REGISTRATION_FAILED
      });
      console.log(err)
    })
}

export const resetPassword = (email) => (dispatch) => {
  dispatch({ type: PASSWORD_RESET_REQUEST });
  resetPasswordRequest(email)
    .then(res => {
      if (res && res.success) {
        dispatch({ type: PASSWORD_RESET_SUCCESS });
      }
      else { dispatch({ type: PASSWORD_RESET_FAILED }) }
    })
    .catch(err => {
      dispatch({ type: PASSWORD_RESET_FAILED });
      console.log(err)
    })
}

export const setNewPassword = (form) => (dispatch) => {
  dispatch({ type: SET_PASSWORD_REQUEST });
  setNewPasswordRequest(form)
    .then(res => {
      if (res && res.success) {
        dispatch({ type: SET_PASSWORD_SUCCESS });
      }
      else { dispatch({ type: SET_PASSWORD_FAILED }) }
    })
    .catch(err => {
      dispatch({ type: SET_PASSWORD_FAILED });
      console.log(err)
    })
}

export const login = (form) => (dispatch) => {
  dispatch({
    type: LOGIN_REQUEST
  });
  loginRequest(form)
    .then(res => {
      if (res && res.success) {
        if (res.accessToken) {
          setCookie('token', res.accessToken, { expires: 1200 });
        }
        if (res.refreshToken) {
          setRefreshToken('refreshToken', res.refreshToken);
        }
        dispatch({
          type: LOGIN_SUCCESS,
          user: res.user
        });
        dispatch({
          type: AUTH_SUCCESS
        })
      }
    })
    .catch(err => {
      dispatch({
        type: LOGIN_FAILED
      });
      console.log(err)
    })
}

export const setAuth = () => {
  const token = getCookie('token');
  if (token) {
    return {
      type: AUTH_SUCCESS
    }
  }
  return { type: AUTH_FAILED }
}

export const updateUser = (form) => async (dispatch) => {
  try {
    if (!getCookie('token').length) {
      await refreshAccessToken(getRefreshToken());
    }
    dispatch({ type: UPDATE_USER_REQUEST });
    await patchUserRequest(form);
    dispatch({ type: UPDATE_USER_SUCCESS });
  } catch (error) {
    dispatch({ type: UPDATE_USER_FAILED });
    console.log(error);
  }
}

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST });
  logoutRequest(getRefreshToken())
    .then(res => {
      if (res && res.ok) {
        dispatch({
          type: LOGOUT_SUCCESS
        });
        deleteCookie('token');
        deleteRefreshToken();
      }
    })
    .catch(err => {
      dispatch({ type: LOGOUT_FAILED });
      console.log(err)
    })
}

export const checkAuth = () => async (dispatch) => {
  let accessToken = getCookie('token');
  let refreshToken = getRefreshToken();
  if (accessToken && refreshToken) {
    return true;
  }
  if (!accessToken && !refreshToken) {
    return false;
  }
  if (!accessToken && refreshToken) {
    await dispatch(refreshAccessToken(refreshToken));
    return true;
  }
  else {
    return false;
  }
}