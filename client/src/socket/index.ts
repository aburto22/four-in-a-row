import { io } from 'socket.io-client';
import store from '../store';
import { setUpUser } from '../slices/user';
import { startGame } from '../slices/game';
import type { IUser } from '../types';

const socket = io('http://localhost:8080');

socket.emit('setUpPlayer', 'Player', (data: IUser) => {
  store.dispatch(setUpUser(data));
});

socket.on('message', (message: string) => console.log(message));

socket.on('startGame', (id) => {
  if (store.getState().user?.id === id) {
    store.dispatch(startGame());
  }
});

export default socket;
