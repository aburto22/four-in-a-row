import express from 'express';
import path from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { v4 } from 'uuid';
import {
  getUsers, addUser, getUserById, removeUser,
} from './lib/users';

const app = express();
const server = createServer(app);

const chatBot = 'Chat Bot';

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

app.use(express.static(path.join('..', 'client', 'build')));

io.on('connection', (socket) => {
  const userId = socket.id;

  const welcomeMessage = {
    user: chatBot,
    id: v4(),
    text: io.sockets.sockets.size < 2
      ? 'Waiting for another user to connect.'
      : 'Get ready!',
    time: Date(),
  };

  socket.emit('message', welcomeMessage);

  socket.on('setUpPlayer', async (name, callback) => {
    addUser(userId);
    const user = getUserById(userId);
    callback(user);

    const users = getUsers();

    const newPlayerMessage = {
      user: chatBot,
      id: v4(),
      text: `${user?.name} has joined the game.`,
      time: Date(),
    };

    socket.broadcast.emit('message', newPlayerMessage);

    if (users.length >= 2) {
      const activePlayer = users[Math.round(Math.random())].id;

      const data = {
        activePlayer,
        players: users,
      };

      io.of('/').sockets.forEach((s) => {
        s.emit('startGame', { ...data, myId: s.id });
      });

      const message = {
        user: chatBot,
        id: v4(),
        text: 'Game starts now!',
        time: Date(),
      };

      io.emit('message', message);
    }
  });

  socket.on('playToken', (data) => {
    const users = getUsers();

    const activePlayer = users.find((u) => u.id !== data.userId)?.id;

    io.emit('playToken', {
      index: data.index,
      activePlayer,
    });
  });

  socket.on('resetGame', () => {
    const users = getUsers();
    if (users.length < 2) {
      return;
    }

    const activePlayer = users[Math.round(Math.random())].id;

    const data = {
      activePlayer,
      players: users,
    };

    io.emit('resetGame', data);

    const message = {
      user: chatBot,
      id: v4(),
      text: 'Game has restarted.',
      time: Date(),
    };

    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    const username = getUserById(userId)?.name;
    removeUser(userId);
    io.emit('quitGame');

    const message = {
      user: chatBot,
      id: v4(),
      text: `${username} has quit the game. Waiting for another player to join.`,
      time: Date(),
    };

    io.emit('message', message);
  });
});

export default server;
