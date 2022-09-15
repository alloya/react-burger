import { TForm } from "./types/form";
import { getCookie } from "./utils";

const appUrl = 'https://norma.nomoreparties.space/api';

function checkResponse(res: Response) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

function request(url: string, options: object) {
  return fetch(url, options).then(checkResponse)
}

export const getIngredientsData = () => {
  return request(`${appUrl}/ingredients`, {});
}

export const postOrder = (data: ReadonlyArray<string>) => {
  return request(`${appUrl}/orders`, {
    method: "POST",
    headers: {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    },
    body: JSON.stringify({
      "ingredients": data
    })
  })
}

export const createUser = ({name, email, password}: TForm) => {
  return request(`${appUrl}/auth/register`, {
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
}

export const resetPasswordRequest = (email:string) => {
  return request(`${appUrl}/password-reset`, {
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      "email": email
    })
  })
}

export const setNewPasswordRequest = (password: string, token: string) => {
  return request(`${appUrl}/password-reset/reset`, {
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      "password": password,
      "token": token
    })
  })
}

export const refreshTokenRequest = (token: string) => {
  return request(`${appUrl}/auth/token`, {
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      "token": token
    })
  })
}

export const getUserRequest = async () => {
  return await request(`${appUrl}/auth/user`, {
    method: "GET",
    headers: {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    }
  })
}

export const patchUserRequest = async ({name, email, password = undefined}: TForm) => {
  return await request(`${appUrl}/auth/user`, {
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
}

export const loginRequest = async (form: TForm)=> {
  return await request(`${appUrl}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
};

export const logoutRequest = async (refreshToken: string) => {
  return await request(`${appUrl}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "token": refreshToken
    })
  })
};