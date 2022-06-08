const appUrl = 'https://norma.nomoreparties.space/api/ingredients';

export const getIngredientsData = () => {
  return fetch(appUrl)
    .then(res => {
      if (!res.ok) {
        throw new Error('Ответ сети не был ok')
      }
      return res.json()
    })
}