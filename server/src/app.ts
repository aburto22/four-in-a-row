import express from 'express';
import path from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';
import {
  getUsers, addUser, getUserById, removeUser,
} from './lib/users';
import { createMessage } from './lib/messages';
import type { PlayTokenData, MessageData } from './types';

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

  const welcomeText = io.sockets.sockets.size < 2
    ? 'Welcome! Waiting for another user to connect.'
    : 'Welcome!';

  socket.emit('message', createMessage(chatBot, welcomeText));

  socket.on('setUpPlayer', async (name) => {
    addUser(userId, name);
    const user = getUserById(userId);

    socket.emit('assignUserId', user?.id);

    const users = getUsers();

    console.log(users);

    socket.broadcast.emit('message', createMessage(chatBot, `${user?.name} has joined the game.`));

    if (users.length >= 2) {
      const activePlayer = users[Math.round(Math.random())].id;

      const data = {
        activePlayer,
        players: users,
      };

      io.of('/').sockets.forEach((s) => {
        s.emit('startGame', { ...data, myId: s.id });
      });

      io.emit('message', createMessage(chatBot, 'Game starts now!'));
    }
  });

  socket.on('playToken', (data: PlayTokenData) => {
    const users = getUsers();

    const activePlayer = users.find((u) => u.id !== data.userId)?.id;

    io.emit('playToken', {
      index: data.index,
      activePlayer,
    });
  });

  socket.on('winner', (winnerId: string) => {
    const otherUsername = getUserById(winnerId)?.name;

    const text = winnerId === socket.id
      ? 'The game is over. You have WON!'
      : `The game is over. ${otherUsername} has won. Good luck next time!`;

    socket.emit('message', createMessage(chatBot, text));
  });

  socket.on('matchNull', () => {
    socket.emit('message', createMessage(chatBot, 'The game is a tie!'));
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

    io.emit('message', createMessage(chatBot, 'Game has restarted.'));
  });

  socket.on('disconnect', () => {
    const username = getUserById(userId)?.name;
    removeUser(userId);
    io.emit('quitGame');

    const text = `${username} has quit the game. Waiting for another player to join.`;

    io.emit('message', createMessage(chatBot, text));
  });

  socket.on('message', ({ user, text }: MessageData) => {
    io.emit('message', createMessage(user, text));
  });
});

export default server;
