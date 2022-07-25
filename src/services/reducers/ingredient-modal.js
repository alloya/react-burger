import { ADD_INGREDIENT_INFO_TO_MODAL, REMOVE_INGREDIENT_INFO_TO_MODAL} from '../actions/ingredient-modal';


const ingredientModalInitialState = {
  ingredientDetails: {}
};

export const ingredientModalReducer = (state = ingredientModalInitialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT_INFO_TO_MODAL: {
      debugger
      return {
        ...state,
        ingredientDetails: action.ingredient
      }
    }
    case REMOVE_INGREDIENT_INFO_TO_MODAL: {
      return {
        ...state,
        ingredientDetails: {}
      }
    }
    default:
      return state;
  }
}