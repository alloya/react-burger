import { createUser, getUserRequest, loginRequest, patchUserRequest, refreshTokenRequest } from "../../utils/api";
import { getCookie, getRefreshToken, setCookie, setRefreshToken } from "../../utils/utils";

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

export const refreshAccessToken = (refreshToken) => async (dispatch) => {
  dispatch({
    type: REFRESH_TOKEN_REQUEST
  });
  try {
    let res = await refreshTokenRequest(refreshToken)
    console.log('refreshToken', res)
    if (res && res.success) {
      debugger
      updateTokens(res.accessToken, res.refreshToken)
    }
    else {
      dispatch({
        type: REFRESH_TOKEN_FAILED
      });
      throw ('Refresh access token failed');
    }
    //await getUser(res.accessToken);
  } catch (error) {
    console.log(error)
  }
}

export const getUser = () => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  try {
    let res = await getUserRequest();
    console.log('res', res)
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
  // getUserRequest(accessToken)
  //   .then(res => {
  //     if (res && res.success) {
  //       dispatch({
  //         type: GET_USER_SUCCESS,
  //         token: res.accessToken
  //       });
  //     }
  //     else {
  //       dispatch({ type: GET_USER_FAILED });
  //       throw ('Get user failed');
  //     }
  //   })
  //   .catch(error => {
  //     dispatch({ type: GET_USER_FAILED });
  //     console.log(error)
  //   })
}

export const updateTokens = (accessToken, refreshToken) => {
  setCookie('token', accessToken, 1200);
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
      }
    })
    .catch(err => {
      dispatch({
        type: REGISTRATION_FAILED
      });
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
          user: res.user,
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
          isAuth: true
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

export function setAuthSuccess() {
  return {
    type: AUTH_SUCCESS
  }
}

export const setAuth = () => {
  if (getCookie('token')) {
    return {
      type: AUTH_SUCCESS
    }
  }
  return { type: AUTH_FAILED}
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