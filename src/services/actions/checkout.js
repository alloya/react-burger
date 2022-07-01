import { postOrder } from "../../utils/api";
import { clearConstructor } from "./constructor";
import { SHOW_ORDER_DETAILS_POPUP } from './modal';

export const ORDER_CHECKOUT_REQUEST = 'ORDER_CHECKOUT_REQUEST';
export const ORDER_CHECKOUT_SUCCESS = 'ORDER_CHECKOUT_SUCCESS';
export const ORDER_CHECKOUT_FAILED = 'ORDER_CHECKOUT_FAILED';

export const orderCheckout = (order) => (dispatch) => {
  dispatch({
    type: ORDER_CHECKOUT_REQUEST
  });
  postOrder(order)
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: ORDER_CHECKOUT_SUCCESS,
          order: res.order.number
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