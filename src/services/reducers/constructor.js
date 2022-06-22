import {
  DELETE_ITEM,
  ADD_ITEM,
  CLEAR_CONSTRUCTOR
} from '../actions/constructor';

const constructorInitialState = {
  items: []
}

export const constructorReducer = (state = constructorInitialState, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      return {
        ...state,
        items: [...state.items, action.element]
      };
    }
    case DELETE_ITEM: {
      return {
        ...state,
        items: [...state.items].filter(item => item._id !== action.item._id)
      };
    }
    case CLEAR_CONSTRUCTOR: {
      return {
        ...state,
        items: []
      }
    }
    default: {
      return state;
    }
  }
}