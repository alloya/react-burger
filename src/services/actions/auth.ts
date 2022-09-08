import { TAppDispatch } from "../..";
import { createUser, getUserRequest, loginRequest, logoutRequest, patchUserRequest, refreshTokenRequest, resetPasswordRequest, setNewPasswordRequest } from "../../utils/api";
import { TForm } from "../../utils/types/form";
import { deleteCookie, getCookie, getRefreshToken, setCookie, setRefreshToken, deleteRefreshToken } from "../../utils/utils";
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


export const refreshAccessToken = (refreshToken: string) => async (dispatch: TAppDispatch) => {
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
    else { return Promise.reject(`Ошибка: ${res.status} Refresh token failed`) }
  } catch (error) {
    console.log(error)
    dispatch({ type: REFRESH_TOKEN_FAILED });
  }
}

export const getUser = () => async (dispatch: TAppDispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  try {
    let res = await getUserRequest();
    if (res && res.success) {
      dispatch({
        type: GET_USER_SUCCESS,
        payload: res.user
      });
    }
    else { return Promise.reject(`Ошибка: ${res.status} Get user failed`) }
  } catch (error) {
    dispatch({ type: GET_USER_FAILED });
    console.log(error)
  }
}

export const updateTokens = (accessToken: string, refreshToken: string) => {
  setCookie('token', accessToken, { expires: 1200 });
  setRefreshToken('refreshToken', refreshToken);
  return {
    type: UPDATE_TOKENS,
    accessToken,
    refreshToken
  }
}

export const registration = (form: TForm) => (dispatch: TAppDispatch) => {
  dispatch({ type: REGISTRATION_REQUEST });
  createUser(form)
    .then(res => {
      if (res && res.success) {
        dispatch({ type: REGISTRATION_SUCCESS });
        dispatch(updateTokens(res.accessToken, res.refreshToken));
        dispatch(setAuth());
      }
      else { return Promise.reject(`Ошибка: ${res.status} Registration failed`) }
    })
    .catch(err => {
      dispatch({ type: REGISTRATION_FAILED });
      console.log(err)
    })
}

export const resetPassword = (email: string) => (dispatch: TAppDispatch) => {
  dispatch({ type: PASSWORD_RESET_REQUEST });
  resetPasswordRequest(email)
    .then(res => {
      if (res && res.success) {
        dispatch({ type: PASSWORD_RESET_SUCCESS });
      }
      else { return Promise.reject(`Ошибка: ${res.status} Reset password failed`) }
    })
    .catch(err => {
      dispatch({ type: PASSWORD_RESET_FAILED });
      console.log(err)
    })
}

export const setNewPassword = (form: TForm) => (dispatch: TAppDispatch) => {
  dispatch({ type: SET_PASSWORD_REQUEST });
  setNewPasswordRequest(form.password!, form.token!)
    .then(res => {
      if (res && res.success) {
        dispatch({ type: SET_PASSWORD_SUCCESS });
      }
      else { return Promise.reject(`Ошибка: ${res.status} Set new password failed`); }
    })
    .catch(err => {
      dispatch({ type: SET_PASSWORD_FAILED });
      console.log(err)
    })
}

export const login = (form: TForm) => (dispatch: TAppDispatch) => {
  dispatch({ type: LOGIN_REQUEST });
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
        dispatch({ type: AUTH_SUCCESS })
      }
      else { return Promise.reject(`Ошибка: ${res.status} Login failed`) }
    })
    .catch(err => {
      dispatch({ type: LOGIN_FAILED });
      console.log(err)
    })
}

export const setAuth = () => {
  const token = getCookie('token');
  if (token) {
    return { type: AUTH_SUCCESS }
  }
  return { type: AUTH_FAILED }
}

export const updateUser = (form: TForm) => async (dispatch: TAppDispatch) => {
  try {
    if (!getCookie('token').length) {
      await refreshAccessToken(getRefreshToken());
    }
    dispatch({ type: UPDATE_USER_REQUEST });
    const res = await patchUserRequest(form);
    if (res && res.success) {
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: res.user
      });
    }
    else { return Promise.reject(`Ошибка: ${res.status} Update user failed`); }
  } catch (error) {
    dispatch({ type: UPDATE_USER_FAILED });
    console.log(error);
  }
}

export const logout = () => async (dispatch: TAppDispatch) => {
  dispatch({ type: LOGOUT_REQUEST });
  try {
    const res = await logoutRequest(getRefreshToken())
    if (res && res.success) {
      dispatch({ type: LOGOUT_SUCCESS });
      deleteCookie('token');
      deleteRefreshToken();
    }
    else { return Promise.reject(`Ошибка: ${res.status} Logout failed`); }
  } catch (error) {
    dispatch({ type: LOGOUT_FAILED });
    console.log(error)
  }
}

export const checkAuth = () => async (dispatch: TAppDispatch) => {
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