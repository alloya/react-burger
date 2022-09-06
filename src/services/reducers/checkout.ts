import { TCheckoutAction } from '../actions/checkout';
import {
  ORDER_CHECKOUT_FAILED,
  ORDER_CHECKOUT_REQUEST,
  ORDER_CHECKOUT_SUCCESS
} from '../constants/checkout';

export interface ICheckoutState {
  orderCheckoutFailed: boolean;
  orderCheckoutRequest: boolean;
  order: { "number": number } | undefined;
}

const checkoutInitialState: ICheckoutState = {
  orderCheckoutFailed: false,
  order: undefined,
  orderCheckoutRequest: false
};

export const checkoutReducer = (state = checkoutInitialState, action: TCheckoutAction): ICheckoutState => {
  switch (action.type) {
    case ORDER_CHECKOUT_REQUEST: {
      return {
        ...state,
        orderCheckoutFailed: false,
        orderCheckoutRequest: true
      };
    }
    case ORDER_CHECKOUT_FAILED: {
      return {
        ...state,
        orderCheckoutFailed: true,
        orderCheckoutRequest: false
      };
    }
    case ORDER_CHECKOUT_SUCCESS: {
      return {
        ...state,
        order: action.order,
        orderCheckoutRequest: false
      };
    }
    default: {
      return state;
    }
  }
};