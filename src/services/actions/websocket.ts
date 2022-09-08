import { TFeedMessage } from "../../utils/types/wsMessage";
import { WS_CONNECTION_START, WS_SEND_MESSAGE, WS_CONNECTION_SUCCESS, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_GET_MESSAGE } from "../constants/websocket";

export interface IWSConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: string;
}

export interface IWSConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWSConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWSConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: string;
}

export interface IWSGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: TFeedMessage;
}

export interface IWSSendMessage {
  readonly type: typeof WS_SEND_MESSAGE;
  readonly payload: string;
}

export type TWSActions =
  | IWSConnectionStart
  | IWSConnectionSuccess
  | IWSConnectionClosed
  | IWSConnectionError
  | IWSGetMessage
  | IWSSendMessage

export const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
};

export const wsConnectionStart = (url: string): IWSConnectionStart => {
  return {
    type: WS_CONNECTION_START,
    payload: url
  }
}

export const wsConnectionSuccess = (): IWSConnectionSuccess => {
  return {
    type: WS_CONNECTION_SUCCESS
  };
};

export const wsConnectionError = (error: string): IWSConnectionError => {
  return {
    type: WS_CONNECTION_ERROR,
    payload: error
  };
};

export const wsConnectionClosed = (): IWSConnectionClosed => {
  return {
    type: WS_CONNECTION_CLOSED
  };
};

export const wsGetMessage = (message: TFeedMessage): IWSGetMessage => {
  return {
    type: WS_GET_MESSAGE,
    payload: message
  };
};

export const wsSendMessage = (message: string): IWSSendMessage => {
  return {
    type: WS_SEND_MESSAGE,
    payload: message
  };
};
