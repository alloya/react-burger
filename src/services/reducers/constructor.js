import {
  DELETE_ITEM,
  ADD_ITEM,
  CLEAR_CONSTRUCTOR,
  FILL_CONSTRUCTOR
} from '../actions/constructor';

const constructorInitialState = {
  constructorItems: []
}

export const constructorReducer = (state = constructorInitialState, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      return {
        ...state,
        constructorItems: [...state.constructorItems, action.element]
      };
    }
    case DELETE_ITEM: {
      return {
        ...state,
        constructorItems: [...state.constructorItems].filter(item => item._id !== action.item._id)
      };
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
      };
    }
    default: {
      return state;
    }
  }
}