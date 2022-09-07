import { ADD_ITEM, CLEAR_CONSTRUCTOR, DELETE_ITEM_BY_INDEX, CHANGE_ITEMS_ORDER } from '../constants/constructor';
import { v4 as uuidv4 } from 'uuid';
import { IIngredient } from '../../utils/types';

export interface IExtendedIngredient extends IIngredient {
  readonly innerId: string
}

export interface IAddIngredient {
  readonly type: typeof ADD_ITEM;
  readonly ingredient: IExtendedIngredient 
}

export interface IClearConstructor {
  readonly type: typeof CLEAR_CONSTRUCTOR;
}

export interface IDeleteIngredientByIndex {
  readonly type: typeof DELETE_ITEM_BY_INDEX;
  readonly index: number
}

export interface IChangeItemsOrder {
  readonly type: typeof CHANGE_ITEMS_ORDER;
  readonly payload: { from: number, to: number }
}

export type TConstructorAction =
  | IAddIngredient
  | IClearConstructor
  | IDeleteIngredientByIndex
  | IChangeItemsOrder


export const addIngredient = (constructorElement: IIngredient): IAddIngredient => {
  const ingredient: IExtendedIngredient = {
      ...constructorElement,
      innerId: uuidv4()
    }
  return {
    type: ADD_ITEM,
    ingredient
  }
}

export const clearConstructor = (): IClearConstructor => {
  return {
    type: CLEAR_CONSTRUCTOR
  }
}

export const deleteIngredientByIndex = (index: number): IDeleteIngredientByIndex => {
  return {
    type: DELETE_ITEM_BY_INDEX,
    index
  }
}

export const changeItemOrder = (from: number, to: number): IChangeItemsOrder => {
  return {
    type: CHANGE_ITEMS_ORDER,
    payload:{
      from: from,
      to: to
    }
  }
}