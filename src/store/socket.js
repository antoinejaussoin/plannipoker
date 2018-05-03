import io from 'socket.io-client';
import { JOIN_SESSION } from '../actions';

export default class SocketIo {
  roomId = null;
  socket = null;

  connect() {
    this.socket = io();
  }

  disconnect() {
    this.socket.disconnect();
  }

  join(roomId) {
    this.roomId = roomId;
    this.send(JOIN_SESSION);
  }

  send(action, payload) {
    this.socket.emit(action, {
      roomId: this.roomId,
      payload
    });
  }

  on(action, callback) {
    this.socket.on(action, callback);
  }
}