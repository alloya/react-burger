import { getIngredientsData } from "../../utils/api";
import IngredientTypes from "../../utils/models/ingredient-type-model";
import { IIngredient } from "../../utils/types";
import { TAB_SWITCH, GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, GET_ITEMS_FAILED } from "../constants/ingredients";
import { TAppDispatch } from "../store/store";

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

const getIngredientsRequest = (): IGetItemsRequest => {
  return {
    type: GET_ITEMS_REQUEST
  }
}

const getIngredientsSuccess = (data: IIngredient[]): IGetItemsSuccess => {
  return {
    type: GET_ITEMS_SUCCESS,
    data
  }
}

const getIngredientsFailed = (): IGetItemsFailed => {
  return {
    type: GET_ITEMS_FAILED
  }
}

export type TIngredientsActions =
  | IGetItemsRequest
  | IGetItemsSuccess
  | IGetItemsFailed
  | ITabSwitch

export const getIngredients = () => async (dispatch: TAppDispatch) => {
    dispatch(getIngredientsRequest());
  try {
    const data = await getIngredientsData();
    dispatch(getIngredientsSuccess(data.data))
  } catch (error) {
    dispatch(getIngredientsFailed());
    console.log(error)
  }
}

export const switchTab = (tab: string): ITabSwitch => {
  return {
    type: TAB_SWITCH,
    tab
  }
}