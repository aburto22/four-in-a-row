import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IToken } from "@types";

type State = {
  token: IToken | null;
  index: number;
};

const initialState: State = {
  token: null,
  index: 0,
};

const placeholderTokenSlice = createSlice({
  name: "placeholderToken",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<State>) => action.payload,
    removeToken: () => initialState,
  },
});

export const { setToken, removeToken } = placeholderTokenSlice.actions;

export default placeholderTokenSlice.reducer;
