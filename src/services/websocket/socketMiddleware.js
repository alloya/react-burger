import { getCookie } from "../../utils/utils";

export const socketMiddleware = (wsActions) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
      if (type === wsInit) {
        debugger
        socket = new WebSocket(payload);
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          console.log(`Ошибка ${event.message}`)
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