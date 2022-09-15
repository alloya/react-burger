import { getCookie } from "../../utils/utils";
import { Middleware } from 'redux';
import { TRootState } from "../store/store";
import { TWSMiddleware } from "../../utils/types/wsMiddleware";

export const socketMiddleware = (wsActions: TWSMiddleware): Middleware<{}, TRootState> => {
  return (store) => {
    let socket: WebSocket | null = null;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
      if (type === wsInit) {
        socket = new WebSocket(payload);
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          console.log(`Ошибка ${event}`)
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
          socket?.close();
          console.log(`Код закрытия - ${event.code}`);
          console.log(`Причина закрытия - ${event.reason}`)
        };

        if (type === wsSendMessage) {
          const message = { ...payload, token: getCookie('token') };
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  };
};