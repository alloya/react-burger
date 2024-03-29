import { TModalActions } from './../actions/modal';
import { 
  SHOW_INGREDIENT_DETAILS_POPUP, 
  SHOW_ORDER_DETAILS_POPUP, 
  CLOSE_ALL_POPUPS
} from "../constants/modal";

export interface IModalState {
  readonly ingredientModalOpened: boolean,
  readonly orderModalOpened: boolean
}

const modalInitialState: IModalState = {
  ingredientModalOpened: false,
  orderModalOpened: false
}

export const modalReducer = (state = modalInitialState, action: TModalActions): IModalState => {
  switch (action.type) {
    case SHOW_INGREDIENT_DETAILS_POPUP: {
      return {
        ...state,
        ingredientModalOpened: true
      }
    }
    case SHOW_ORDER_DETAILS_POPUP: {
      return {
        ...state,
        orderModalOpened: true
      }
    }
    case CLOSE_ALL_POPUPS: {
      return {
        ...state,
        orderModalOpened: false,
        ingredientModalOpened: false
      }
    }
    default: {
      return state;
    }
  }
}