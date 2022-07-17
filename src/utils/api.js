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
      'Content-type': 'application/json'
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
  return fetch(`${appUrl}/reset-password`, {
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

export const setNewPasswordRequest = ({email, token}) => {
  return fetch(`${appUrl}/reset-password/reset`, {
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      "email": email,
      "token": token
    })
  })
  .then(checkResponse)
}