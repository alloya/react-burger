import {
  DELETE_ITEM,
  ADD_ITEM,
  CLEAR_CONSTRUCTOR,
  DELETE_ITEM_BY_INDEX,
  CHANGE_ITEMS_ORDER
} from '../actions/constructor';

const constructorInitialState = {
  constructorItems: []
}

export const constructorReducer = (state = constructorInitialState, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      if (state.constructorItems && state.constructorItems.length) {
        if (action.payload.ingredient.type === 'bun') {
          const arr = state.constructorItems.filter(el => el.type !== 'bun');
          arr.unshift(action.payload.ingredient);
          return {
            ...state,
            constructorItems: [...arr]
          }
        }
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
      return constructorInitialState;
    }
    case DELETE_ITEM_BY_INDEX: {
      return {
        ...state,
        constructorItems: [...state.constructorItems.slice(0, action.index), ...state.constructorItems.slice(action.index + 1)]
      }
    }
    case CHANGE_ITEMS_ORDER: {
      const ingredients = [...state.constructorItems];
      ingredients.splice(
        action.payload.to, 
        0, 
        ingredients.splice(action.payload.from, 1)[0]
      );
      return {
        ...state,
        constructorItems: [...ingredients]
      }
    }
    default: {
      return state;
    }
  }
}