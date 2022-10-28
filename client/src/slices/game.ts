import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { IBoard, IPlayer, IStartGameData, IGame } from "@types";
import { getActivePlayerMessage } from "@lib/game";

interface State {
  board: IBoard;
  message: string;
  isPlayerTurn: boolean;
  players: IPlayer[];
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
        isPlayerTurn: state.myId === activePlayerId,
        status,
        message,
      };
    },
    quitGame: () => initialState,
  },
});

export const { startGame, quitGame, setUserId, updateGame } = gameSlice.actions;

export default gameSlice.reducer;
