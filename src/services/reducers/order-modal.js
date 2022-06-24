import { ADD_ORDER_NUMBER_TO_MODAL, REMOVE_ORDER_NUMBER_TO_MODAL } from "../actions/orderModal";

const orderModalInitialState = {
  orderNumber: null
}

export const orderModalReducer = (state = orderModalInitialState, action) => {
  switch (action.type) {
    case ADD_ORDER_NUMBER_TO_MODAL: {
      debugger
      return {
        ...state,
        orderNumber: action.data.order.number
      }
    }
    case REMOVE_ORDER_NUMBER_TO_MODAL: {
      return {
        ...state,
        orderNumber: null
      }
    }
    default:
      return state;
  }
}