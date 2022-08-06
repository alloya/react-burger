import { getCookie } from "./utils";

const appUrl = 'https://norma.nomoreparties.space/api';

function checkResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

export const getIngredientsData = () => {
  return fetch(`${appUrl}/ingredients`)
    .then(checkResponse)
}

export const postOrder = (data) => {
  return fetch(`${appUrl}/orders`, {
    method: "POST",
    headers: {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    },
    body: JSON.stringify({
      "ingredients": data
    })
  })
  .then(checkResponse)
}

export const createUser = ({name, email, password}) => {
  return fetch(`${appUrl}/auth/register`, {
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      "name": name,
      "email": email,
      "password": password
    })
  })
  .then(checkResponse)
}

export const resetPasswordRequest = (email) => {
  return fetch(`${appUrl}/password-reset`, {
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      "email": email
    })
  })
  .then(checkResponse)
}

export const setNewPasswordRequest = (password, token) => {
  return fetch(`${appUrl}/password-reset/reset`, {
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      "password": password,
      "token": token
    })
  })
  .then(checkResponse);
}

export const refreshTokenRequest = (token) => {
  return fetch(`${appUrl}/auth/token`, {
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      "token": token
    })
  })
  .then(checkResponse);
}

export const getUserRequest = async () => {
  return await fetch(`${appUrl}/auth/user`, {
    method: "GET",
    headers: {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    }
  })
  .then(checkResponse);
}

export const patchUserRequest = async ({name, email, password = null}) => {
  return await fetch(`${appUrl}/auth/user`, {
    method: "PATCH",
    headers: {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    },
    body: JSON.stringify({
      "name": name,
      "email": email,
      "password": password
    })
  })
  .then(checkResponse);
}

export const loginRequest = async form => {
  return await fetch(`${appUrl}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
  .then(checkResponse);
};

export const logoutRequest = async (refreshToken) => {
  return await fetch(`${appUrl}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "token": refreshToken
    })
  })
  .then(checkResponse);
};