const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const find = require('lodash/find');
const { JOIN_SESSION,
        LEAVE_SESSION,
        RECEIVE_SELECTION,
        SEND_SELECTION,
        RENAME_USER,
        RECEIVE_PLAYER_LIST
} = require('./actions');

const app = express();
const httpServer = new http.Server(app);
const io = socketIo(httpServer);
const port = process.env.PORT || 3001;

app.get('/api/cards', (req, res) => {
  res.send([
    { value: 0, label: '0', color: '#66bb6a' },
    { value: 0.5, label: '½', color: '#66bb6a' },
    { value: 1, label: '1', color: '#66bb6a' },
    { value: 2, label: '2', color: '#66bb6a' },
    { value: 3, label: '3', color: '#03a9f4' },
    { value: 5, label: '5', color: '#03a9f4' },
    { value: 8, label: '8', color: '#03a9f4' },
    { value: 13, label: '13', color: '#ba68c8' },
    { value: 20, label: '20', color: '#ba68c8' },
    { value: 40, label: '40', color: '#ba68c8' },
    { value: 99, label: '99', color: '#ba68c8' },
    { value: 0, label: '?', color: '#c2185b' },
    { value: 0, label: '☕️', color: '#c2185b' },
  ]);
});

// Data holding structure
const rooms = {};

// Get or create a room from a roomId
const getRoom = (roomId) => {
  if (!rooms[roomId]) {
    rooms[roomId] = {
      cards: [],
      players: []
    };
  }

  return rooms[roomId];
};

// Broadcast an action to all people in a room
const sendToAll = (socket, room, action, data) => {
  console.log(` ==> ${action} ${JSON.stringify(data)}`);
  socket
    .broadcast
    .to(room)
    .emit(action, data);
};

// Broadcast an action to the socket owner only
const sendToSelf = (socket, action, data) => {
  console.log(` --> ${action} ${JSON.stringify(data)}`);
  socket.emit(action, data);
};

const joinHandler = (roomId, room, payload, socket) => {
  socket.join(roomId, () => {
    socket.roomId = roomId;
    room.players.push({
      id: socket.id,
      name: 'Player Unknown'
    });
    if (room.cards.length) {
      sendToSelf(socket, RECEIVE_SELECTION, room.cards);
    }
    sendToSelf(socket, RECEIVE_PLAYER_LIST, room.players);
    sendToAll(socket, roomId, RECEIVE_PLAYER_LIST, room.players);
  });
}

const sendSelectionHandler = (roomId, room, payload, socket) => {
  room.cards = payload;
  sendToAll(socket, roomId, RECEIVE_SELECTION, payload);
}

const renameUserHandler = (roomId, room, payload, socket) => {
  const user = find(room.players, { id: socket.id });
  if (user) {
    user.name = payload;
  }
  sendToSelf(socket, RECEIVE_PLAYER_LIST, room.players);
  sendToAll(socket, roomId, RECEIVE_PLAYER_LIST, room.players);
}

io.on('connection', (socket) => {
  console.log(' Connection: New user connected - ', socket.id);

  const actions = [
    { action: JOIN_SESSION, handler: joinHandler },
    { action: SEND_SELECTION, handler: sendSelectionHandler },
    { action: RENAME_USER, handler: renameUserHandler },
  ];

  actions.forEach(action => {
    socket.on(action.action, data => {
      console.log(` [Room ${data.roomId}]: ${action.action}`)
      const room = getRoom(data.roomId);
      action.handler(data.roomId, room, data.payload, socket);
    });
  });
});

httpServer.listen(port, () => console.log(`Listening on port ${port}`));