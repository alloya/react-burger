import { v4 as uuidv4 } from 'uuid';
export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';
export const DELETE_ITEM_BY_INDEX = 'DELETE_ITEM_BY_INDEX';
export const CHANGE_ITEMS_ORDER = 'CHANGE_ITEMS_ORDER';

export const addIngredient = (element) => (dispatch) => {
  element.ingredient.innerId = uuidv4();
  dispatch({
    type: ADD_ITEM,
    payload: element
  })
}

export const deleteIngredient = (element) => {
  return {
    type: DELETE_ITEM,
    payload: element
  }
}

export const clearConstructor = () => {
  return {
    type: CLEAR_CONSTRUCTOR
  }
}

export const deleteIngredientByIndex = (index)  => {
  return {
    type: DELETE_ITEM_BY_INDEX,
    index
  }
}

export const changeItemOrder = (from, to) => {
  return {
    type: CHANGE_ITEMS_ORDER,
    payload:{
      from: from,
      to: to
    }
  }
}