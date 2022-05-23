import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoard, IPlayer } from '../types';
import { checkWinner, checkMatchNull } from '../lib/game';

interface InitialState {
  player: IPlayer,
  board: IBoard,
  message: string,
  active: boolean,
}

const initialState: InitialState = {
  player: 1,
  board: Array(7).fill(Array(6).fill(null)),
  message: '',
  active: true,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    changeTurn: (state) => ({
      ...state,
      player: state.player === 1 ? 2 : 1,
    }),
    resetGame: () => initialState,
    playToken: (state, action: PayloadAction<number>) => {
      const columnIndex = action.payload;
      const currentBoard = state.board;
      const currentColumn = currentBoard[columnIndex];
      const rowIndex = currentColumn.findIndex((t) => t === null);

      if (rowIndex === -1) {
        return {
          ...state,
          message: 'Cannot play in this column. Choose another one',
        };
      }

      const newColumn = currentColumn.map((t, i) => {
        if (i === rowIndex) {
          return state.player;
        }
        return t;
      });
      const newBoard = currentBoard.map((c, i) => {
        if (i === columnIndex) {
          return newColumn;
        }
        return c;
      });

      if (checkWinner(newBoard, state.player)) {
        return {
          ...state,
          board: newBoard,
          message: `Player ${state.player} has won the game!`,
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
        player: state.player === 1 ? 2 : 1,
        message: '',
      };
    },
  },
});

export const { changeTurn, playToken, resetGame } = gameSlice.actions;

export default gameSlice.reducer;
