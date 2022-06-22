import { postOrder } from "../../utils/api";
import { SHOW_ORDER_DETAILS_POPUP }from './modal';

export const ORDER_CHECKOUT_REQUEST = 'ORDER_CHECKOUT_REQUEST';
export const ORDER_CHECKOUT_SUCCESS = 'ORDER_CHECKOUT_SUCCESS';
export const ORDER_CHECKOUT_FAILED = 'ORDER_CHECKOUT_FAILED';

export function orderCheckout(order) {
  return function(dispatch) {
    dispatch({
      type: ORDER_CHECKOUT_REQUEST
    });
    postOrder(order).then(res => {
      if (res && res.success) {
        dispatch({
          type: ORDER_CHECKOUT_SUCCESS,
          order: res.data
        });
        dispatch({
          type: SHOW_ORDER_DETAILS_POPUP,
        });
      } else {
        dispatch({
          type: ORDER_CHECKOUT_FAILED
        });
      }
    });
  };
}