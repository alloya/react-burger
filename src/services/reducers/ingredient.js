import { TAB_SWITCH } from "../actions/ingredients";

const ingredientsInitialState = {
  ingredients: [],
  currentTab: 'buns'
}

export const ingredientsReducer = (state = ingredientsInitialState, action) => {
  switch (action.type) {
    case TAB_SWITCH:
      return {
        ...state,
        currentTab: action.payload
      }
    default: {
      return state;
    }
  }
}