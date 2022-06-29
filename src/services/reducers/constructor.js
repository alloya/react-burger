import {
  DELETE_ITEM,
  ADD_ITEM,
  CLEAR_CONSTRUCTOR,
  FILL_CONSTRUCTOR,
  REMOVE_BUN
} from '../actions/constructor';

const constructorInitialState = {
  constructorItems: []
}

export const constructorReducer = (state = constructorInitialState, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      if (state.constructorItems && state.constructorItems.length) {
        return {
          ...state,
          constructorItems:  [...state.constructorItems, action.payload.ingredient]
        }
      }
      else {
        return {
          ...state,
          constructorItems:  [action.payload.ingredient]
        }
      }
    }
    case DELETE_ITEM: {
      return {
        ...state,
        constructorItems: [...state.constructorItems].filter(item => item._id !== action.payload)
      }
    }
    case CLEAR_CONSTRUCTOR: {
      return {
        ...state,
        constructorItems: []
      }
    }
    case FILL_CONSTRUCTOR: {
      return {
        ...state,
        constructorItems: action.elements
      }
    }
    case REMOVE_BUN: {
      if (state.constructorItems && state.constructorItems.find(el => el.type === 'bun')) {
        return {
          ...state,
          constructorItems: [...state.constructorItems].filter(el => el.type !== 'bun')
        }
      }
      else { return state }
    }
    default: {
      return state;
    }
  }
}