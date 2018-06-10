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
        FLIP_STORY,
        RENAME_GAME,
        RECEIVE_GAME_NAME_CHANGE,
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
  userId: string;
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

const joinHandler = (roomId: string, game: Game, payload, socket: ExtendedSocket) => {
  socket.join(roomId, () => {
    socket.roomId = roomId;
    socket.userId = payload.id;
    game.players.push({
      id: payload.id,
      name: payload.username,
      owner: game.players.length === 0,
    });
    sendToSelf(socket, RECEIVE_ALL_GAME_DATA, game);
    sendToAll(socket, roomId, RECEIVE_PLAYER_LIST, game.players);
  });
};

const createStoryHandler = (roomId: string, game: Game, payload, socket: ExtendedSocket) => {
  game.stories.push(payload);
  if (!game.currentStoryId) {
    game.currentStoryId = payload.id;
  }
  sendToAll(socket, roomId, RECEIVE_ALL_GAME_DATA, game);
};

const selectStoryHandler = (roomId: string, game: Game, payload, socket: ExtendedSocket) => {
  game.currentStoryId = payload;
  sendToAll(socket, roomId, RECEIVE_ALL_GAME_DATA, game);
};

const receiveVoteHandler = (roomId: string, game: Game, payload: any, socket: ExtendedSocket) => {
  const card = payload.card;
  const story = game.stories.find(s => s.id === payload.storyId);

  if (story.flipped) {
    return;
  }

  const player = find(game.players, { id: socket.userId });
  const currentVote = story.votes.find(vote => vote.player.id === player.id);
  if (!currentVote) {
    story.votes.push(new Vote(card, player));
  } else {
    currentVote.card = card;
  }
  sendToAll(socket, roomId, RECEIVE_STORY_UPDATE, story);
};

const flipStoryHandler = (roomId: string, game: Game, payload: any, socket: ExtendedSocket) => {
  const story = game.stories.find(s => s.id === payload.storyId);
  story.flipped = true;
  sendToAll(socket, roomId, RECEIVE_STORY_UPDATE, story);
};

const renamePlayerHandler = (roomId: string, game: Game, payload, socket: ExtendedSocket) => {
  const user = find(game.players, { id: socket.userId });
  if (user) {
    user.name = payload;
  }
  sendToSelf(socket, RECEIVE_PLAYER_LIST, game.players);
  sendToAll(socket, roomId, RECEIVE_PLAYER_LIST, game.players);
};

const leaveGameHandler = (roomId: string, game: Game, payload, socket: ExtendedSocket) => {
  game.players = game.players.filter(player => player.id !== socket.userId);
  sendToAll(socket, roomId, RECEIVE_PLAYER_LIST, game.players);
};

const renameGameHandler = (roomId: string, game: Game, payload, socket: ExtendedSocket) => {
  game.name = payload;
  sendToAll(socket, roomId, RECEIVE_GAME_NAME_CHANGE, game.name);
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
    { action: FLIP_STORY, handler: flipStoryHandler },
    { action: RENAME_GAME, handler: renameGameHandler },
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
