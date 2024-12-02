import { io, ManagerOptions, Socket, SocketOptions } from 'socket.io-client';
import { LOCAL_STORAGE_KEY } from './constants';
import { CHAT_SOCKET_EVENT, refreshTokenApi } from 'utils';
import { message } from 'components';
import { ResponseDto } from 'types';

export type SocketClientOptions = {
  uri: string;
} & Partial<ManagerOptions & SocketOptions>;

export class SocketClient {
  protected _socket: Socket;
  private refreshCount = 5;
  constructor(options: SocketClientOptions) {
    this._socket = io(options.uri, options);
    this._socket.on(CHAT_SOCKET_EVENT.CONNECT, () => {
      console.log('Socket is connected successfully');
      this.refreshCount = 5;
    });
    this._socket.on(CHAT_SOCKET_EVENT.DISCONNECT, () => {
      console.log('Socket is disconnected');
    });
    this._socket.on(CHAT_SOCKET_EVENT.EXCEPTION, (error: ResponseDto<null>) => {
      message.systemError(error.message);
    });
    this._socket.on(CHAT_SOCKET_EVENT.UNAUTHORIZED, () => {
      console.log('Socket is disconnect due to token is expired');
      this.refreshCount -= 1;
      this.reconnect();
    });
    this._socket.on(CHAT_SOCKET_EVENT.TOKEN_EXPIRED, () => {
      console.log('Socket token is expiring, refreshing ...');
      this.renewToken();
    });
    this._socket.on(CHAT_SOCKET_EVENT.ERROR, (error) => {
      if (error.message === CHAT_SOCKET_EVENT.UNAUTHORIZED) {
        this.refreshCount -= 1;
        this.reconnect();
      } else {
        console.error(error);
      }
    });
  }

  connect() {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    if (accessToken) {
      this.socket.auth = {
        token: accessToken
      };
      this._socket.connect();
    }
  }

  disconnect() {
    this._socket.disconnect();
  }

  get socket() {
    return this._socket;
  }

  async reconnect() {
    const refreshToken = localStorage.getItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN);

    if (refreshToken && this.refreshCount > 0) {
      const responseToken = await refreshTokenApi(refreshToken);

      if (responseToken?.data.accessToken) {
        const accessToken = responseToken.data.accessToken;
        this.socket.auth = {
          token: accessToken
        };
        this.connect();
      }
    }
  }

  async renewToken() {
    const refreshToken = localStorage.getItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN);

    if (refreshToken) {
      const responseToken = await refreshTokenApi(refreshToken);

      if (responseToken?.data.accessToken) {
        const accessToken = responseToken.data.accessToken;
        this._socket.auth = {
          token: accessToken
        };
        this._socket.emit(CHAT_SOCKET_EVENT.UPDATE_TOKEN, accessToken);
      }
    }
  }
}
