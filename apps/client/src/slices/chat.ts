import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMessage, IPlayer, IUser, UpdateChatUsers } from "@types";

type GameState = {
  status: "playing";
  users: IPlayer[];
  messages: IMessage[];
};

type WaitingState = {
  status: "waiting";
  users: IUser[];
  messages: IMessage[];
};

const initialState = {
  messages: [],
  users: [],
  status: "waiting",
} as GameState | WaitingState;

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<IMessage>) => {
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    },
    updateUsers: (state, action: PayloadAction<UpdateChatUsers>) => {
      if (action.payload.status === "waiting") {
        return {
          ...state,
          status: action.payload.status,
          users: action.payload.users,
        };
      }
      return {
        ...state,
        status: action.payload.status,
        users: action.payload.users,
      };
    },
  },
});

export const { addMessage, updateUsers } = chatSlice.actions;

export default chatSlice.reducer;
