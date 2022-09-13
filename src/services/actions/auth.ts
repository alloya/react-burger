import { createUser, getUserRequest, loginRequest, logoutRequest, patchUserRequest, refreshTokenRequest, resetPasswordRequest, setNewPasswordRequest } from "../../utils/api";
import { TOKEN_EXPIRATION_TIME } from "../../utils/const";
import { TForm } from "../../utils/types/form";
import { IUser } from "../../utils/types/user";
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
import { TAppDispatch, TAppThunk } from "../store/store";

export interface IRefreshTokenRequest {
  readonly type: typeof REFRESH_TOKEN_REQUEST
}

export interface IRefreshTokenSuccess {
  readonly type: typeof REFRESH_TOKEN_SUCCESS
}

export interface IRefreshTokenFailed {
  readonly type: typeof REFRESH_TOKEN_FAILED
}

export interface IGetUserRequest {
  readonly type: typeof GET_USER_REQUEST
}

export interface IGetUserSuccess {
  readonly type: typeof GET_USER_SUCCESS,
  readonly payload: boolean
}

export interface IGetUserFailed {
  readonly type: typeof GET_USER_FAILED
}

export interface IRegistrationRequest {
  readonly type: typeof REGISTRATION_REQUEST
}

export interface IRegistrationSuccess {
  readonly type: typeof REGISTRATION_SUCCESS
}

export interface IRegistrationFailed {
  readonly type: typeof REGISTRATION_FAILED
}

export interface ILoginRequest {
  readonly type: typeof LOGIN_REQUEST
}

export interface ILoginSuccess {
  readonly type: typeof LOGIN_SUCCESS,
  readonly user: IUser,
}

export interface ILoginFailed {
  readonly type: typeof LOGIN_FAILED
}

export interface IUpdateUserRequest {
  readonly type: typeof UPDATE_USER_REQUEST
}

export interface IUpdateUserSuccess {
  readonly type: typeof UPDATE_USER_SUCCESS,
  readonly payload: IUser
}

export interface IUpdateUserFailed {
  readonly type: typeof UPDATE_USER_FAILED
}

export interface IAuthSuccess {
  readonly type: typeof AUTH_SUCCESS
}

export interface IAuthFailed {
  readonly type: typeof AUTH_FAILED
}

export interface ILogoutRequest {
  readonly type: typeof LOGOUT_REQUEST
}

export interface ILogoutSuccess {
  readonly type: typeof LOGOUT_SUCCESS
}

export interface ILogoutFailed {
  readonly type: typeof LOGOUT_FAILED
}

export interface IPasswordResetRequest {
  readonly type: typeof PASSWORD_RESET_REQUEST
}

export interface IPasswordResetSuccess {
  readonly type: typeof PASSWORD_RESET_SUCCESS
}

export interface IPasswordResetFailed {
  readonly type: typeof PASSWORD_RESET_FAILED
}

export interface ISetPasswordRequest {
  readonly type: typeof SET_PASSWORD_REQUEST
}

export interface ISetPasswordSuccess {
  readonly type: typeof SET_PASSWORD_SUCCESS
}

export interface ISetPasswordFailed {
  readonly type: typeof SET_PASSWORD_FAILED
}

export interface IResetUpdateUser {
  readonly type: typeof RESET_UPDATE_USER
}

export interface IUpdateTokens {
  readonly type: typeof UPDATE_TOKENS,
  readonly accessToken: string,
  readonly refreshToken: string
}

export interface IResetPasswordResetState {
  readonly type: typeof RESET_PASSWORD_RESET_STATE,
  readonly passwordResetRequest: boolean,
  readonly passwordResetFailed: boolean,
  readonly passwordResetSuccess: boolean,
  readonly setPasswordRequest: boolean,
  readonly setPasswordFailed: boolean,
  readonly setPasswordSuccess: boolean
}

export type TAuthActions =
ISetPasswordFailed | ISetPasswordSuccess | ISetPasswordRequest | IPasswordResetFailed | IPasswordResetSuccess | IPasswordResetRequest | ILoginRequest | ILoginSuccess | ILoginFailed | ILogoutFailed | ILogoutSuccess | ILogoutRequest | IAuthFailed | IAuthSuccess | IUpdateUserFailed | IUpdateUserSuccess | IUpdateUserRequest | IRegistrationFailed | IRegistrationSuccess | IRegistrationRequest | IGetUserFailed | IGetUserSuccess | IGetUserRequest | IRefreshTokenFailed | IRefreshTokenSuccess | IRefreshTokenRequest | IResetUpdateUser | IUpdateTokens | IResetPasswordResetState

export const resetPasswordResetState = (): IResetPasswordResetState => {
  return { 
    type: RESET_PASSWORD_RESET_STATE,
    passwordResetRequest: false,
    passwordResetFailed: false, 
    passwordResetSuccess: false,
    setPasswordRequest: false,
    setPasswordFailed: false,
    setPasswordSuccess: false
  }
}

const logInRequest = (): ILoginRequest => {
  return { type: LOGIN_REQUEST }
}

const loginSuccess = (user: IUser): ILoginSuccess => {
  return { 
    type: LOGIN_SUCCESS,
    user 
  }
}

const loginFailed = (): ILoginFailed => {
  return { type: LOGIN_FAILED }
}

const passwordResetRequest = (): IPasswordResetRequest => {
  return { type: PASSWORD_RESET_REQUEST }
}

const passwordResetSuccess = (): IPasswordResetSuccess => {
  return { type: PASSWORD_RESET_SUCCESS }
}

const passwordResetFailed = (): IPasswordResetFailed => {
  return { type: PASSWORD_RESET_FAILED }
}

const authSuccess = (): IAuthSuccess => {
  return { type: AUTH_SUCCESS }
}

const authFailed = (): IAuthFailed => {
  return { type: AUTH_FAILED }
}

const refreshAccessTokenRequest = (): IRefreshTokenRequest => {
  return { type: REFRESH_TOKEN_REQUEST }
}

const refreshAccessTokenSuccess = (): IRefreshTokenSuccess => {
  return { type: REFRESH_TOKEN_SUCCESS }
}

const refreshAccessTokenFailed = (): IRefreshTokenFailed => {
  return { type: REFRESH_TOKEN_FAILED }
}

export const refreshAccessToken = (refreshToken: string) => async (dispatch: TAppDispatch) => {
  dispatch(refreshAccessTokenRequest());
  try {
    let res = await refreshTokenRequest(refreshToken)
    if (res && res.success) {
      updateTokens(res.accessToken, res.refreshToken)
      dispatch(refreshAccessTokenSuccess());
    }
    else { return Promise.reject(`Ошибка: ${res.status} Refresh token failed`) }
  } catch (error) {
    console.log(error)
    dispatch(refreshAccessTokenFailed());
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

export const updateTokens = (accessToken: string, refreshToken: string): IUpdateTokens => {
  setCookie('token', accessToken, { expires: TOKEN_EXPIRATION_TIME });
  setRefreshToken('refreshToken', refreshToken);
  return {
    type: UPDATE_TOKENS,
    accessToken,
    refreshToken
  }
}

export const registration: TAppThunk = (form: TForm) => (dispatch: TAppDispatch) => {
  dispatch({ type: REGISTRATION_REQUEST });
  createUser(form)
    .then(res => {
      if (res && res.success) {
        dispatch({ type: REGISTRATION_SUCCESS });
        dispatch(updateTokens(res.accessToken, res.refreshToken));
        dispatch(authSuccess());
      }
      else { return Promise.reject(`Ошибка: ${res.status} Registration failed`) }
    })
    .catch(err => {
      dispatch({ type: REGISTRATION_FAILED });
      console.log(err)
    })
}

export const resetPassword = (email: string) => (dispatch: TAppDispatch) => {
  dispatch(passwordResetRequest());
  resetPasswordRequest(email)
    .then(res => {
      if (res && res.success) {
        dispatch(passwordResetSuccess());
      }
      else { return Promise.reject(`Ошибка: ${res.status} Reset password failed`) }
    })
    .catch(err => {
      dispatch(passwordResetFailed());
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
  dispatch(logInRequest());
  loginRequest(form)
    .then(res => {
      if (res && res.success) {
        if (res.accessToken) {
          setCookie('token', res.accessToken, { expires: TOKEN_EXPIRATION_TIME });
        }
        if (res.refreshToken) {
          setRefreshToken('refreshToken', res.refreshToken);
        }
        dispatch(loginSuccess(res.user));
        dispatch(authSuccess())
      }
      else { return Promise.reject(`Ошибка: ${res.status} Login failed`) }
    })
    .catch(err => {
      dispatch(loginFailed());
      console.log(err)
    })
}

export const setAuth = () => (dispatch: TAppDispatch) => {
  const token = getCookie('token');
  if (token) {
    dispatch(authSuccess());
    return;
  }
  dispatch(authFailed())
}

export const updateUser = (form: TForm) => async (dispatch: TAppDispatch) => {
  try {
    if (getCookie('token') === undefined) {
      await refreshAccessToken(getRefreshToken()!);
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
    const res = await logoutRequest(getRefreshToken()!)
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

export const checkAuth = (): string | boolean=> {
  let accessToken = getCookie('token');
  let refreshToken = getRefreshToken();
  if (accessToken && refreshToken) {
    return true;
  }
  if (!accessToken && !refreshToken) {
    return false;
  }
  if (!accessToken && refreshToken) {
    return 'refresh';
  }
  return false
}