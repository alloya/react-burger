import { combineReducers } from 'redux';
import { checkoutReducer } from './checkout';
import { constructorReducer } from './constructor';
import { ingredientsReducer } from './ingredient';
import { ingredientModalReducer } from './ingredient-modal';
import { modalReducer } from './modal';
import { orderModalReducer } from './order-modal';



export const rootReducer = 
combineReducers({
  ingredients: ingredientsReducer,
  constructor: constructorReducer,
  checkout: checkoutReducer,
  modal: modalReducer,
  ingredientModal: ingredientModalReducer,
  orderModal: orderModalReducer
});