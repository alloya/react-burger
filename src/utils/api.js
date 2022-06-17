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