import { TOrder } from '../../utils/types';
import { TFeedMessage } from '../../utils/types/wsMessage';
import { TWSActions } from '../actions/websocket';
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_CONNECTION_START
} from '../constants/websocket';

export interface IWSState {
  readonly wsConnected: boolean;
  readonly messages: TFeedMessage | null;
  readonly error: string;
  readonly connecting: boolean;
}

const initialState: IWSState = {
  wsConnected: false,
  messages: null,
  error: '',
  connecting: false
};

export const websocketReducer = (state = initialState, action: TWSActions): IWSState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };
    case WS_CONNECTION_START: {
      debugger
      return {
        ...state,
        connecting: true,
        messages: null
      }
    }
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        error: action.payload
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        messages: action.payload
      };

    default:
      return state;
  }
};