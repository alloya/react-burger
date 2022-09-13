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




export const wsConnectionStart = (url: string): IWSConnectionStart => {
  debugger
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

export const wsConnectionError = (): IWSConnectionError => {
  return {
    type: WS_CONNECTION_ERROR
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