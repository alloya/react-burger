import { combineReducers } from 'redux';
import { checkoutReducer } from './checkout';
import { constructorReducer } from './constructor';
import { ingredientsReducer } from './ingredient';
import { modalReducer } from './modal';



export const rootReducer = 
combineReducers({
  ingredient: ingredientsReducer,
  constructor: constructorReducer,
  checkout: checkoutReducer,
  modal: modalReducer
});