import { io } from 'socket.io-client';
import store from '../store';
import { setUserId } from '../slices/user';
import {
  playToken, resetGame, startGame, quitGame,
} from '../slices/game';
import { addMessage } from '../slices/chat';
import type {
  IPlayTokenData, IStartGameData, IMessage,
} from '../types';

const socketUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080';

const socket = io(socketUrl);

socket.on('assignUserId', (id: string) => {
  store.dispatch(setUserId(id));
});

socket.on('message', (message: IMessage) => store.dispatch(addMessage(message)));

socket.on('startGame', ({ activePlayer, players }: IStartGameData) => {
  const myId = store.getState().user.id;
  store.dispatch(startGame({ players, myId, activePlayer }));
});

socket.on('playToken', ({ index, activePlayer }: IPlayTokenData) => {
  store.dispatch(playToken({ index, activePlayer }));

  const gameState = store.getState().game;

  if (gameState.status === 'winner') {
    const winnerId = gameState.players.find((p) => p.id !== activePlayer)?.id;
    socket.emit('winner', winnerId);
  }

  if (gameState.status === 'matchNull') {
    socket.emit('matchNull');
  }
});

socket.on('resetGame', ({ activePlayer }: IStartGameData) => {
  store.dispatch(resetGame(activePlayer));
});

socket.on('quitGame', () => {
  store.dispatch(quitGame());
});

export default socket;