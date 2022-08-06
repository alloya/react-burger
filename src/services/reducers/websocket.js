import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_CONNECTION_START
} from '../actions/websocket';

const initialState = {
  wsConnected: false,
  messages: {},
  error: '',
  connecting: false
};

export const websocketReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };
    case WS_CONNECTION_START: {
      return {
        ...state,
        connecting: true,
        messages: {}
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