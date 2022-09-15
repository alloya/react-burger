import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { checkoutReducer } from './checkout';
import { constructorReducer } from './constructor';
import { ingredientsReducer } from './ingredient';
import { ingredientModalReducer } from './ingredient-modal';
import { modalReducer } from './modal';
import { websocketReducer } from './websocket';

export const rootReducer = 
combineReducers({
  ingredients: ingredientsReducer,
  constructor: constructorReducer,
  checkout: checkoutReducer,
  modal: modalReducer,
  ingredientModal: ingredientModalReducer,
  auth: authReducer,
  ws: websocketReducer
});