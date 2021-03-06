import io, { Socket } from 'socket.io-client';
import { JOIN_GAME } from '../actions';

export interface Transport {
  connect();
  disconnect();
  join(roomId: string, userId: string, username: string);
  send(action: string, payload: any);
  on(action: string, callback: (payload: any) => void);
}

export default class SocketIo implements Transport {
  roomId: string = null;
  private socket: any;

  connect() {
    this.socket = io();
    this.socket.on('disconnect', () => {
      this.socket = null;
    });
  }

  disconnect() {
    this.socket.disconnect();
  }

  join(roomId: string, id: string, username: string) {
    this.roomId = roomId;
    this.send(JOIN_GAME, { id, username });
  }

  send(action: string, payload: any) {
    this.socket.emit(action, {
      roomId: this.roomId,
      payload,
    });
  }

  on(action: string, callback: (payload: any) => void) {
    this.socket.on(action, callback);
  }
}
