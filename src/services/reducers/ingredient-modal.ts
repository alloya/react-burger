import { IIngredient } from '../../utils/types';
import { TIngredientModalActions } from '../actions/ingredient-modal';
import { ADD_INGREDIENT_INFO_TO_MODAL, REMOVE_INGREDIENT_INFO_TO_MODAL} from '../constants/ingredient-modal';

export interface IIngredientModalState {
  ingredientDetails: IIngredient | null
}

const ingredientModalInitialState: IIngredientModalState = {
  ingredientDetails: null
};

export const ingredientModalReducer = (state = ingredientModalInitialState, action: TIngredientModalActions): IIngredientModalState => {
  switch (action.type) {
    case ADD_INGREDIENT_INFO_TO_MODAL: {
      return {
        ...state,
        ingredientDetails: action.ingredient
      }
    }
    case REMOVE_INGREDIENT_INFO_TO_MODAL: {
      return {
        ...state,
        ingredientDetails: null
      }
    }
    default:
      return state;
  }
}