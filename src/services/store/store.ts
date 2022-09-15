import { Action, ActionCreator, applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, { ThunkAction } from "redux-thunk";
import { TWSMiddleware } from "../../utils/types/wsMiddleware";
import { TAuthActions } from "../actions/auth";
import { TCheckoutAction } from "../actions/checkout";
import { TConstructorAction } from "../actions/constructor";
import { TIngredientModalActions } from "../actions/ingredient-modal";
import { TIngredientsActions } from "../actions/ingredients";
import { TModalActions } from "../actions/modal";
import { TWSActions } from "../actions/websocket";
import { WS_CONNECTION_START, WS_SEND_MESSAGE, WS_CONNECTION_SUCCESS, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_GET_MESSAGE } from "../constants/websocket";
import { rootReducer } from "../reducers";
import { socketMiddleware } from "../websocket/socketMiddleware";

const wsActions: TWSMiddleware = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
};

export type TAppDispatch = TAppThunk;
export type TRootState = ReturnType<typeof rootReducer>;

type TApplicationActions = TAuthActions | TCheckoutAction | TConstructorAction | TIngredientsActions | TIngredientModalActions | TModalActions | TWSActions;

export type TAppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, TRootState, TApplicationActions>
>;

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, socketMiddleware(wsActions))));