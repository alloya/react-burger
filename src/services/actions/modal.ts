import { SHOW_ORDER_DETAILS_POPUP, SHOW_INGREDIENT_DETAILS_POPUP, CLOSE_ALL_POPUPS } from "../constants/modal";


export interface IShowOrderDetailsPopup {
  readonly type: typeof SHOW_ORDER_DETAILS_POPUP;
}

export interface IShowIngredientDetailsPopup {
  readonly type: typeof SHOW_INGREDIENT_DETAILS_POPUP;
}

export interface ICloseAllPopups {
  readonly type: typeof CLOSE_ALL_POPUPS;
}

export type TModalActions =
  | IShowOrderDetailsPopup
  | IShowIngredientDetailsPopup
  | ICloseAllPopups