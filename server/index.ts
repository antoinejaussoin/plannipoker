/* tslint:disable no-console */

import * as express from 'express';
import * as http from 'http';
import * as socketIo from 'socket.io';
import { find } from 'lodash';
import { JOIN_GAME,
        LEAVE_GAME,
        RENAME_PLAYER,
        RECEIVE_PLAYER_LIST,
        CREATE_STORY,
        DELETE_STORY,
        SELECT_STORY,
        RECEIVE_STORY_UPDATE,
        VOTE,
        RECEIVE_ALL_GAME_DATA,
} from '../src/actions';
import { Card, Game, Story, Player, Vote } from '../src/models';

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
  userId: number;
}

// Data holding structure
const rooms: Rooms = {};

// Get or create a room from a roomId
const getGame = (roomId: string): Game => {
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
    socket.userId = payload.id;
    room.players.push({
      id: payload.id,
      name: payload.username,
      owner: room.players.length === 0,
    });
    sendToSelf(socket, RECEIVE_ALL_GAME_DATA, room);
    sendToAll(socket, roomId, RECEIVE_PLAYER_LIST, room.players);
  });
};

const createStoryHandler = (roomId: string, room: Game, payload, socket: ExtendedSocket) => {
  room.stories.push(payload);
  sendToAll(socket, roomId, RECEIVE_ALL_GAME_DATA, room);
};

const selectStoryHandler = (roomId: string, room: Game, payload, socket: ExtendedSocket) => {
  room.currentStoryId = payload;
  sendToAll(socket, roomId, RECEIVE_ALL_GAME_DATA, room);
};

const receiveVoteHandler = (roomId: string, game: Game, payload: any, socket: ExtendedSocket) => {
  const story = find(game.stories, { id: payload.storyId });
  const player = find(game.players, { id: socket.userId });
  story.votes.push(new Vote(payload.card, player));
  sendToAll(socket, roomId, RECEIVE_STORY_UPDATE, story);
};

const renamePlayerHandler = (roomId: string, room: Game, payload, socket: ExtendedSocket) => {
  const user = find(room.players, { id: socket.userId });
  if (user) {
    user.name = payload;
  }
  sendToSelf(socket, RECEIVE_PLAYER_LIST, room.players);
  sendToAll(socket, roomId, RECEIVE_PLAYER_LIST, room.players);
};

const leaveGameHandler = (roomId: string, room: Game, payload, socket: ExtendedSocket) => {
  room.players = room.players.filter(player => player.id !== socket.userId);
  sendToAll(socket, roomId, RECEIVE_PLAYER_LIST, room.players);
};

io.on('connection', (socket: ExtendedSocket) => {
  console.log(' Connection: New user connected - ', socket.id);

  const actions = [
    { action: JOIN_GAME, handler: joinHandler },
    { action: VOTE, handler: receiveVoteHandler },
    { action: RENAME_PLAYER, handler: renamePlayerHandler },
    { action: CREATE_STORY, handler: createStoryHandler },
    { action: SELECT_STORY, handler: selectStoryHandler },
    { action: LEAVE_GAME, handler: leaveGameHandler },
  ];

  actions.forEach(action => {
    socket.on(action.action, data => {
      console.log(` [Room ${data.roomId}]: ${action.action}`);
      const game = getGame(data.roomId);
      action.handler(data.roomId, game, data.payload, socket);
    });
  });

  socket.on('disconnect', () => {
    if (socket.roomId) {
      const room = getGame(socket.roomId);
      leaveGameHandler(socket.roomId, room, null, socket);
    }
  });
});

httpServer.listen(port, () => console.log(`Listening on port ${port}`));
