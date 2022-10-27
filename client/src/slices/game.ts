import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { IBoard, IUser, IPlayTokenData, IStartGameData } from "@types";
import {
  checkWinner,
  checkMatchNull,
  addToken,
  getActivePlayerMessage,
  getWinnerMessage,
  getPlayerToken,
} from "@lib/game";

interface State {
  board: IBoard;
  message: string;
  isPlayerTurn: boolean;
  players: IUser[];
  myId: string;
  status: "waiting" | "playing" | "matchNull" | "winner";
}

const initialState: State = {
  board: Array(7).fill(Array(6).fill(null)),
  message: "waiting for another user before playing",
  isPlayerTurn: false,
  players: [],
  myId: "",
  status: "waiting",
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    resetGame: (state, action: PayloadAction<string>) => ({
      ...state,
      board: initialState.board,
      isPlayerTurn: action.payload === state.myId,
      message: getActivePlayerMessage(
        state.players,
        action.payload,
        state.myId
      ),
      status: "playing",
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
          isPlayerTurn: false,
          status: "winner",
        };
      }

      if (checkMatchNull(newBoard)) {
        return {
          ...state,
          board: newBoard,
          message: "It is a match null!",
          isPlayerTurn: false,
          status: "matchNull",
        };
      }

      return {
        ...state,
        board: newBoard,
        isPlayerTurn: activePlayer === state.myId,
        message: getActivePlayerMessage(
          state.players,
          activePlayer,
          state.myId
        ),
      };
    },
    setUserId: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        myId: action.payload,
      };
    },
    startGame: (state, action: PayloadAction<IStartGameData>) => {
      const { players, activePlayer } = action.payload;
      const { myId } = state;

      return {
        ...state,
        players,
        message: getActivePlayerMessage(players, activePlayer, myId),
        isPlayerTurn: activePlayer === myId,
        status: "playing",
      };
    },
    quitGame: () => initialState,
  },
});

export const { playToken, resetGame, startGame, quitGame, setUserId } =
  gameSlice.actions;

export default gameSlice.reducer;
