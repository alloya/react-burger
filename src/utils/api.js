const appUrl = 'https://norma.nomoreparties.space/api';

export const getIngredientsData = () => {
  return fetch(`${appUrl}/ingredients`)
    .then(res => {
      if (!res.ok) {
        throw new Error('Ответ сети не был ok')
      }
      return res.json()
    })
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
  .then(res => {
    if (!res.ok) {
      throw new Error('Ответ сети не был ok')
    }
    return res.json()
  })
}