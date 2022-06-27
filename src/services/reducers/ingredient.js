import { TAB_SWITCH, GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, GET_ITEMS_FAILED } from "../actions/ingredients";

const ingredientsInitialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  currentTab: 'bun'
}

export const ingredientsReducer = (state = ingredientsInitialState, action) => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true
      };
    }
    case GET_ITEMS_SUCCESS: {
      return { 
        ...state, 
        ingredientsFailed: false, 
        ingredients: action.data, 
        ingredientsRequest: false 
      };
    }
    case GET_ITEMS_FAILED: {
      return { 
        ...state, 
        ingredientsFailed: true, 
        ingredientsRequest: false 
      };
    }
    case TAB_SWITCH: {
      return {
        ...state,
        currentTab: action.payload
      }
    }
    default: {
      return state;
    }
  }
}