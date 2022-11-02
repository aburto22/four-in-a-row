import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMessage, IUser } from "@types";

type State = {
  messages: IMessage[];
  users: IUser[];
};

const initialState: State = {
  messages: [],
  users: [],
};

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
    updateUsers: (state, action: PayloadAction<IUser[]>) => {
      return {
        ...state,
        users: action.payload,
      };
    },
  },
});

export const { addMessage, updateUsers } = chatSlice.actions;

export default chatSlice.reducer;
