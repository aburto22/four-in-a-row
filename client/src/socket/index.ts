import { io } from 'socket.io-client';
import store from '../store';
import { setUpUser } from '../slices/user';
import {
  startGame, playToken, resetGame, setPlayers,
} from '../slices/game';
import type { IUser, IPlayTokenData, IStartGameData } from '../types';

const socket = io('http://localhost:8080');

socket.emit('setUpPlayer', 'Player', (data: IUser) => {
  store.dispatch(setUpUser(data));
});

socket.on('message', (message: string) => console.log(message));

socket.on('startGame', ({ activePlayer, players }: IStartGameData) => {
  store.dispatch(setPlayers(players));

  if (store.getState().user?.id === activePlayer) {
    store.dispatch(startGame());
  }
});

socket.on('playToken', (data: IPlayTokenData) => {
  store.dispatch(playToken(data.index));

  if (store.getState().user?.id === data.activePlayer) {
    store.dispatch(startGame());
  }
});

socket.on('resetGame', (id: string) => {
  store.dispatch(resetGame());

  if (store.getState().user?.id === id) {
    store.dispatch(startGame());
  }
});

export default socket;
