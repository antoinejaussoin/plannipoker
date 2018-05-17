import * as express from 'express';
import * as http from 'http';
import * as socketIo from 'socket.io';
import { find } from 'lodash';
import { JOIN_SESSION,
        LEAVE_SESSION,
        RECEIVE_SELECTION,
        SEND_SELECTION,
        RENAME_USER,
        RECEIVE_PLAYER_LIST
} from './actions';
import { Card, Game, Story, Player, Vote } from './models';


const app = express();
const httpServer = new http.Server(app);
const io = socketIo(httpServer);
const port: number = +process.env.PORT || 3001;

app.get('/api/cards', (req, res) => {
  res.send(Card.getAllCards());
});

interface Rooms {
  [roomId: string]: Game;
}

interface ExtendedSocket extends socketIo.Socket {
  roomId: string;
}

// Data holding structure
const rooms: Rooms = {};

// Get or create a room from a roomId
const getRoom = (roomId: string): Game => {
  if (!rooms[roomId]) {
    rooms[roomId] = new Game();
  }

  return rooms[roomId];
};

// Broadcast an action to all people in a room
const sendToAll = (socket: ExtendedSocket, roomId: string, action: string, data) => {
  console.log(` ==> ${action} ${JSON.stringify(data)}`);
  socket
    .broadcast
    .to(roomId)
    .emit(action, data);
};

// Broadcast an action to the socket owner only
const sendToSelf = (socket: ExtendedSocket, action: string, data: any) => {
  console.log(` --> ${action} ${JSON.stringify(data)}`);
  socket.emit(action, data);
};

const joinHandler = (roomId: string, room: Game, payload, socket: ExtendedSocket) => {
  socket.join(roomId, () => {
    socket.roomId = roomId;
    room.players.push({
      id: socket.id,
      name: payload || 'Player Unknown',
      owner: room.players.length === 0,
    });
    if (room.story.votes.length) {
      sendToSelf(socket, RECEIVE_SELECTION, room.story.votes.map(vote => vote.card));
    }
    sendToSelf(socket, RECEIVE_PLAYER_LIST, room.players);
    sendToAll(socket, roomId, RECEIVE_PLAYER_LIST, room.players);
  });
}

const sendSelectionHandler = (roomId: string, room: Game, payload, socket: ExtendedSocket) => {
  room.story.votes = payload.map(card => new Vote(card, null));
  sendToAll(socket, roomId, RECEIVE_SELECTION, payload);
}

const renameUserHandler = (roomId: string, room: Game, payload, socket: ExtendedSocket) => {
  const user = find(room.players, { id: socket.id });
  if (user) {
    user.name = payload;
  }
  sendToSelf(socket, RECEIVE_PLAYER_LIST, room.players);
  sendToAll(socket, roomId, RECEIVE_PLAYER_LIST, room.players);
}

const leaveSessionHandler = (roomId: string, room: Game, payload, socket: ExtendedSocket) => {
  room.players = room.players.filter(player => player.id !== socket.id);
  sendToAll(socket, roomId, RECEIVE_PLAYER_LIST, room.players);
}

io.on('connection', (socket: ExtendedSocket) => {
  console.log(' Connection: New user connected - ', socket.id);

  const actions = [
    { action: JOIN_SESSION, handler: joinHandler },
    { action: SEND_SELECTION, handler: sendSelectionHandler },
    { action: RENAME_USER, handler: renameUserHandler },
    { action: LEAVE_SESSION, handler: leaveSessionHandler },
  ];

  actions.forEach(action => {
    socket.on(action.action, data => {
      console.log(` [Room ${data.roomId}]: ${action.action}`)
      const room = getRoom(data.roomId);
      action.handler(data.roomId, room, data.payload, socket);
    });
  });

  socket.on('disconnect', () => {
    if (socket.roomId) {
      const room = getRoom(socket.roomId);
      leaveSessionHandler(socket.roomId, room, null, socket);
    }
  });
});

httpServer.listen(port, () => console.log(`Listening on port ${port}`));