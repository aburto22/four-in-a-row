import { io } from 'socket.io-client';
import store from '../store';
import { setUpUser } from '../slices/user';
import {
  playToken, resetGame, startGame, quitGame,
} from '../slices/game';
import { addMessage } from '../slices/chat';
import type {
  IUser, IPlayTokenData, IStartGameData, IMessage,
} from '../types';

const socketUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080';

const socket = io(socketUrl);

socket.emit('setUpPlayer', 'Player', (data: IUser) => {
  store.dispatch(setUpUser(data));
});

socket.on('message', (message: IMessage) => store.dispatch(addMessage(message)));

socket.on('startGame', ({ activePlayer, myId, players }: IStartGameData) => {
  store.dispatch(startGame({ players, myId, activePlayer }));
});

socket.on('playToken', ({ index, activePlayer }: IPlayTokenData) => {
  store.dispatch(playToken({ index, activePlayer }));
});

socket.on('resetGame', ({ activePlayer }: IStartGameData) => {
  store.dispatch(resetGame(activePlayer));
});

socket.on('quitGame', () => {
  store.dispatch(quitGame());
});

export default socket;
