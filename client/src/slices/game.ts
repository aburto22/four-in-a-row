import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {
  IBoard,
  IPlayer,
  IPlayTokenData,
  IStartGameData,
  IGame,
} from "@types";
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
  players: IPlayer[];
  myId: string;
  status: "waiting" | "playing" | "matchNull" | "winner";
  winnerId: string;
}

const initialState: State = {
  board: Array(7).fill(Array(6).fill(null)),
  message: "waiting for another user before playing",
  isPlayerTurn: false,
  players: [],
  myId: "",
  status: "waiting",
  winnerId: "",
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
      winenrId: "",
    }),
    updateGame: (state, action: PayloadAction<IGame>) => {
      const { board, activePlayerId, status, winnerName, players } =
        action.payload;

      let message = getActivePlayerMessage(players, activePlayerId, state.myId);

      if (status === "winner") {
        message =
          activePlayerId === state.myId
            ? "You have won!"
            : `You have lost, ${winnerName} has won.`;
      }
      if (status === "matchNull") {
        message = "It is a tie!";
      }

      return {
        ...state,
        board,
        isPlayerTurn: status === "playing" && state.myId === activePlayerId,
        status,
        message,
      };
    },
    playToken: (state, action: PayloadAction<IPlayTokenData>) => {
      const { index, activePlayer } = action.payload;
      const { players, board, myId } = state;
      const playerToken = getPlayerToken(players, activePlayer);
      const newBoard = addToken(board, index, playerToken);

      if (!newBoard) {
        return state;
      }

      if (checkWinner(newBoard, playerToken)) {
        const previousPlayerId = players.find((p) => p.id !== activePlayer)?.id;

        if (!previousPlayerId) {
          throw new Error("Weird thing happened");
        }

        return {
          ...state,
          board: newBoard,
          message: getWinnerMessage(players, previousPlayerId, myId),
          isPlayerTurn: false,
          status: "winner",
          winnerId: previousPlayerId,
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
        isPlayerTurn: activePlayer === myId,
        message: getActivePlayerMessage(players, activePlayer, myId),
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

export const {
  playToken,
  resetGame,
  startGame,
  quitGame,
  setUserId,
  updateGame,
} = gameSlice.actions;

export default gameSlice.reducer;
