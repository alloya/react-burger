export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';
export const FILL_CONSTRUCTOR = 'FILL_CONSTRUCTOR';
export const REMOVE_BUN = 'REMOVE_BUN';
export const DELETE_ITEM_BY_INDEX = 'DELETE_ITEM_BY_INDEX';

export const addIngredient = (element) => (dispatch) => {
  dispatch({
    type: ADD_ITEM,
    payload: element
  })

}

export const deleteBun = () => (dispatch) => {
  dispatch({
    type: REMOVE_BUN
  })
}

export const deleteIngredient = (element) => (dispatch) => {
  dispatch({
    type: DELETE_ITEM,
    payload: element
  })
}

export const clearConstructor = () => (dispatch) => {
  dispatch({
    type: CLEAR_CONSTRUCTOR
  })
}

export const deleteIngredientByIndex = (index) => (dispatch) => {
  dispatch({
    type: DELETE_ITEM_BY_INDEX,
    index
  })
}