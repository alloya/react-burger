import { IIngredient } from './../../utils/types/ingredient';
import { ADD_INGREDIENT_INFO_TO_MODAL, REMOVE_INGREDIENT_INFO_TO_MODAL } from "../constants/ingredient-modal"

export interface IAddIngredientInfoToModal {
  readonly type: typeof ADD_INGREDIENT_INFO_TO_MODAL;
  readonly ingredient: IIngredient;
}

export interface IRemoveIngredientInfoFromModal {
  readonly type: typeof REMOVE_INGREDIENT_INFO_TO_MODAL;
}

export type TIngredientModal = 
  | IAddIngredientInfoToModal
  | IRemoveIngredientInfoFromModal