import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoard } from '../types';

interface InitialState {
  player: number,
  board: IBoard,
}

const initialState: InitialState = {
  player: 1,
  board: Array(7).fill(Array(6).fill(null)),
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    changeTurn: (state) => ({
      ...state,
      player: state.player === 1 ? 2 : 1,
    }),
    playToken: (state, action: PayloadAction<number>) => {
      const columnIndex = action.payload;
      const currentBoard = state.board;
      const currentColumn = currentBoard[columnIndex];
      const rowIndex = currentColumn.findIndex((t) => t === null);
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

      return {
        ...state,
        board: newBoard,
        player: state.player === 1 ? 2 : 1,
      };
    },
  },
});

export const { changeTurn, playToken } = gameSlice.actions;

export default gameSlice.reducer;
