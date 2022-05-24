import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import {
  getUsers, addUser, getUserById, removeUser,
} from './lib/users';

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

io.on('connection', (socket) => {
  let userId: string | undefined;

  const welcomeMessage = io.sockets.sockets.size < 2
    ? 'Waiting for another user to connect.'
    : 'Get ready!';

  socket.emit('message', welcomeMessage);

  socket.on('setUpPlayer', (name, callback) => {
    userId = addUser();
    const user = getUserById(userId);
    callback(user);

    const users = getUsers();

    if (users.length >= 2) {
      const getStartingPlayer = users[Math.round(Math.random())].id;

      io.emit('startGame', getStartingPlayer);
      io.emit('message', 'Game starts now!');
    }
  });

  socket.on('disconnect', () => {
    removeUser(userId);
    console.log(getUsers());
  });
});

export default server;
