import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {
  IBoard, IUser, IPlayTokenData, IStartGameData,
} from '../types';
import {
  checkWinner, checkMatchNull, addToken, getActivePlayerMessage, getWinnerMessage, getPlayerToken,
} from '../lib/game';

interface InitialState {
  board: IBoard,
  message: string,
  active: boolean,
  players: IUser[],
  myId: string,
}

const initialState: InitialState = {
  board: Array(7).fill(Array(6).fill(null)),
  message: 'waiting for another user before playing',
  active: false,
  players: [],
  myId: '',
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    resetGame: (state, action: PayloadAction<string>) => ({
      ...state,
      board: initialState.board,
      active: action.payload === state.myId,
      message: getActivePlayerMessage(state.players, action.payload, state.myId),
    }),
    playToken: (state, action: PayloadAction<IPlayTokenData>) => {
      const { index, activePlayer } = action.payload;
      const playerToken = getPlayerToken(state.players, activePlayer);
      const newBoard = addToken(state.board, index, playerToken);

      if (!newBoard) {
        return state;
      }

      if (checkWinner(newBoard, playerToken)) {
        return {
          ...state,
          board: newBoard,
          message: getWinnerMessage(state.players, activePlayer, state.myId),
          active: false,
        };
      }

      if (checkMatchNull(newBoard)) {
        return {
          ...state,
          board: newBoard,
          message: 'It is a match null!',
          active: false,
        };
      }

      return {
        ...state,
        board: newBoard,
        active: activePlayer === state.myId,
        message: getActivePlayerMessage(state.players, activePlayer, state.myId),
      };
    },
    startGame: (state, action: PayloadAction<IStartGameData>) => {
      const { players, myId, activePlayer } = action.payload;

      console.log(myId);
      console.log(activePlayer);

      return {
        ...state,
        players,
        myId,
        message: getActivePlayerMessage(players, activePlayer, myId),
        active: activePlayer === myId,
      };
    },
  },
});

export const {
  playToken, resetGame, startGame,
} = gameSlice.actions;

export default gameSlice.reducer;
