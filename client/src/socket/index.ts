import { io } from 'socket.io-client';
import store from '../store';
import { setUpUser } from '../slices/user';
import {
  playToken, resetGame, startGame,
} from '../slices/game';
import type { IUser, IPlayTokenData, IStartGameData } from '../types';

const socket = io('http://localhost:8080');

socket.emit('setUpPlayer', 'Player', (data: IUser) => {
  store.dispatch(setUpUser(data));
});

socket.on('message', (message: string) => console.log(message));

socket.on('startGame', ({ activePlayer, players }: IStartGameData) => {
  const myId = store.getState().user?.id || '';
  store.dispatch(startGame({ players, myId, activePlayer }));
});

socket.on('playToken', ({ index, activePlayer }: IPlayTokenData) => {
  store.dispatch(playToken({ index, activePlayer }));
});

socket.on('resetGame', ({ activePlayer }: IStartGameData) => {
  store.dispatch(resetGame(activePlayer));
});

export default socket;
