export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';
export const DELETE_ITEM_BY_INDEX = 'DELETE_ITEM_BY_INDEX';
export const CHANGE_ITEMS_ORDER = 'CHANGE_ITEMS_ORDER';

export const addIngredient = (element) => (dispatch) => {
  dispatch({
    type: ADD_ITEM,
    payload: element
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

export const changeItemOrder = (from, to) => (dispatch) => {
  dispatch({
    type: CHANGE_ITEMS_ORDER,
    payload:{
      from: from,
      to: to
    }
  })
}