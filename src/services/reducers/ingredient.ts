import { IIngredient } from "../../utils/types";
import { TIngredientsActions, TTabType } from "../actions/ingredients";
import { TAB_SWITCH, GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, GET_ITEMS_FAILED } from "../constants/ingredients";

export interface IIngredientState {
  readonly ingredients: IIngredient[],
  readonly ingredientsRequest: boolean,
  readonly ingredientsFailed: boolean,
  readonly currentTab: string
}

const ingredientsInitialState: IIngredientState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  currentTab: 'bun'
}

export const ingredientsReducer = (state = ingredientsInitialState, action: TIngredientsActions): IIngredientState => {
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
        currentTab: action.tab
      }
    }
    default: {
      return state;
    }
  }
}