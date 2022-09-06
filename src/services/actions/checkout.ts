import { TAppDispatch } from './../../index';
import { postOrder } from "../../utils/api";
import { clearConstructor } from "./constructor";
import { SHOW_ORDER_DETAILS_POPUP } from './modal';
import { ORDER_CHECKOUT_REQUEST, ORDER_CHECKOUT_SUCCESS, ORDER_CHECKOUT_FAILED } from "../constants/checkout";

export interface IOrderCheckoutRequest {
  readonly type: typeof ORDER_CHECKOUT_REQUEST
}

export interface IOrderCheckoutSuccess {
  readonly type: typeof ORDER_CHECKOUT_SUCCESS,
  readonly order: { "number": number }
}

export interface IOrderCheckoutFailed {
  readonly type: typeof ORDER_CHECKOUT_FAILED
}

export type TCheckoutAction = 
  IOrderCheckoutRequest 
  | IOrderCheckoutSuccess 
  | IOrderCheckoutFailed

export const orderCheckout = (order: string[]) => (dispatch : TAppDispatch) => {
  dispatch({
    type: ORDER_CHECKOUT_REQUEST
  });
  postOrder(order)
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: ORDER_CHECKOUT_SUCCESS,
          order: res.order
        });
        dispatch({
          type: SHOW_ORDER_DETAILS_POPUP
        });
        dispatch(clearConstructor())
      }
    })
    .catch(err => {
      dispatch({
        type: ORDER_CHECKOUT_FAILED
      });
      console.log(err)
    })
};