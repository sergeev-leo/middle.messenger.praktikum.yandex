import { YANDEX_WS_API_HOST } from './constants';
import { TCallback } from '../types';

export type TSocketAPIProps = {
  userId: number | string,
  chatId: number | string,
  token: string,
};

export type TMessage = {
  type: string,
  content?: string,
}

/* eslint-disable no-console */
export const SOCKET_API_MESSAGES_TYPES = {
  GET_OLD: 'get old',
  MESSAGE: 'message',
  PING: 'ping',
};

export class SocketAPI {
  socket: WebSocket;
  interval: ReturnType<typeof setInterval>;
  listeners: TCallback[] = [];

  connect(props: TSocketAPIProps) {
    const {
      userId,
      chatId,
      token,
    } = props;

    return new Promise(
      (resolve, reject) => {
        this.socket = new WebSocket(
          [YANDEX_WS_API_HOST, userId, chatId, token].join('/'),
        );

        this.socket.addEventListener(
          'open',
          () => {
            console.log('Соединение установлено');
            resolve(null);
          },
        );

        this.socket.addEventListener(
          'message',
          message => this.listeners.forEach((listener: TCallback) => listener(JSON.parse(message.data))),
        );

        this.socket.addEventListener(
          'close',
          event => {
            if (event.wasClean) {
              console.log('Соединение закрыто чисто');
            } else {
              console.log('Обрыв соединения');
            }

            clearTimeout(this.interval);
            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
            reject();
          },
        );
      },
    );
  }

  ping() {
    this.interval = setInterval(
      () => {
        this.send({ type: SOCKET_API_MESSAGES_TYPES.PING });
      },
      30000,
    );
  }

  send(message: TMessage) {
    this.socket.send(JSON.stringify(message));
  }

  public addMessageListener(listener: TCallback) {
    this.listeners.push(listener);
  }

  public getOldMessages() {

    this.send({
      type: SOCKET_API_MESSAGES_TYPES.GET_OLD,
      content: '0',
    });
  }

  public sendMessage(message: string) {
    this.send({
      type: SOCKET_API_MESSAGES_TYPES.MESSAGE,
      content: message,
    });
  }

  public close() {
    clearTimeout(this.interval);
    this.listeners = [];
    this.socket.close();
  }
}
