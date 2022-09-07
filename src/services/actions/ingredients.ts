import { TAppDispatch } from "../..";
import { getIngredientsData } from "../../utils/api";
import IngredientTypes from "../../utils/models/ingredient-type-model";
import { IIngredient } from "../../utils/types";
import { TAB_SWITCH, GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, GET_ITEMS_FAILED } from "../constants/ingredients";

export type TTabType = keyof typeof IngredientTypes;

export interface IGetItemsRequest {
  readonly type: typeof GET_ITEMS_REQUEST;
}

export interface IGetItemsSuccess {
  readonly type: typeof GET_ITEMS_SUCCESS;
  readonly data: IIngredient[];
}

export interface IGetItemsFailed {
  readonly type: typeof GET_ITEMS_FAILED;
}

export interface ITabSwitch {
  readonly type: typeof TAB_SWITCH,
  readonly tab: string
}

export type TIngredientsActions =
  | IGetItemsRequest
  | IGetItemsSuccess
  | IGetItemsFailed
  | ITabSwitch

export const getIngredients = () => async (dispatch: TAppDispatch) => {
  dispatch({
    type: GET_ITEMS_REQUEST
  });
  try {
    const data = await getIngredientsData();
    dispatch({
      type: GET_ITEMS_SUCCESS,
      data: data.data
    })
  } catch (error) {
    dispatch({
      type: GET_ITEMS_FAILED
    });
    console.log(error)
  }
}

export const switchTab = (tab: string): ITabSwitch => {
  return {
    type: TAB_SWITCH,
    tab
  }
}