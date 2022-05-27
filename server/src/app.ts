import express from 'express';
import path from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { addUser, getUserById, removeUser } from './lib/users';
import {
  getWaitingRoom,
  addUserToWaitingRoom,
  removeUserFromWaitingRoom,
  removeUserFromRoom,
  addUserToRoom,
  createRoom,
  getRoomById,
  getRoomByUserId,
  removeRoom,
} from './lib/rooms';
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

  socket.emit('message', createMessage(chatBot, 'Welcome!'));

  socket.on('setUpPlayer', async (name) => {
    const waitingRoom = getWaitingRoom();

    addUser(userId, name);
    const user = getUserById(userId);

    addUserToWaitingRoom(userId);
    socket.join(waitingRoom.id);

    socket.emit('assignUserId', user?.id);
  });

  socket.on('startGame', () => {
    const waitingRoom = getWaitingRoom();

    if (waitingRoom.users.length >= 2) {
      const { id: roomId } = createRoom();

      waitingRoom.users.forEach((u) => {
        addUserToRoom(roomId, u.id);
        removeUserFromWaitingRoom(u.id);
        const s = io.sockets.sockets.get(u.id);
        s?.leave(waitingRoom.id);
        s?.join(roomId);
      });

      const users = getRoomById(roomId)?.users;

      if (!users) {
        console.error('users not found');
        return;
      }

      const activePlayer = users[Math.round(Math.random())].id;

      const data = {
        activePlayer,
        players: users,
      };

      io.in(roomId).emit('startGame', data);
      io.in(roomId).emit('message', createMessage(chatBot, 'Game starts now!'));
    }
  });

  socket.on('playToken', ({ index, userId: uId }: PlayTokenData) => {
    const room = getRoomByUserId(userId);

    if (!room) {
      console.error('no room!');
      return;
    }

    const activePlayer = room.users.find((u) => u.id !== uId)?.id;

    io.in(room.id).emit('playToken', {
      index,
      activePlayer,
    });
  });

  socket.on('winner', (winnerId: string) => {
    const otherUsername = getUserById(winnerId)?.name;

    const text = winnerId === userId
      ? 'The game is over. You have WON!'
      : `The game is over. ${otherUsername} has won. Good luck next time!`;

    socket.emit('message', createMessage(chatBot, text));
  });

  socket.on('matchNull', () => {
    socket.emit('message', createMessage(chatBot, 'The game is a tie!'));
  });

  socket.on('resetGame', () => {
    const room = getRoomByUserId(userId);

    if (!room) {
      console.error('no room!');
      return;
    }

    if (room.users.length < 2) {
      return;
    }

    const activePlayer = room.users[Math.round(Math.random())].id;

    const data = {
      activePlayer,
      players: room.users,
    };

    io.in(room.id).emit('resetGame', data);
    io.in(room.id).emit('message', createMessage(chatBot, 'Game has restarted.'));
  });

  socket.on('disconnect', () => {
    const { id: waitingRoomId } = getWaitingRoom();
    const username = getUserById(userId)?.name;
    const room = getRoomByUserId(userId);
    removeUser(userId);

    if (!room) {
      console.error('no room!');
      return;
    }

    removeUserFromRoom(room.id, userId);

    const otherUsers = getRoomById(room.id)?.users;

    if (room.type === 'waiting') {
      return;
    }

    removeRoom(room.id);

    otherUsers?.forEach((u) => {
      const s = io.sockets.sockets.get(u.id);
      s?.emit('quitGame');
      const text = `${username} has quit the game. Waiting for another player to join.`;
      s?.emit('message', createMessage(chatBot, text));
      s?.leave(room.id);
      s?.join(waitingRoomId);
    });
  });

  socket.on('message', ({ user, text }: MessageData) => {
    const room = getRoomByUserId(userId);

    if (!room) {
      console.error('no room!');
      return;
    }

    io.to(room.id).emit('message', createMessage(user, text));
  });
});

export default server;
