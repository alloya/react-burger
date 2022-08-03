import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE
} from '../actions/websocket';

const initialState = {
  wsConnected: false,
  messages: [],
  error: ''
};

export const websocketReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      debugger
      return {
        ...state,
        wsConnected: true
      };

    case WS_CONNECTION_ERROR:
      debugger
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
        messages: state.messages.length
          ? [...state.messages, { ...action.payload, timestamp: new Date().getTime() / 1000 }]
          : [{ ...action.payload, timestamp: new Date().getTime() / 1000 }]
      };

    default:
      return state;
  }
};