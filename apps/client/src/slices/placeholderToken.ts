import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IToken } from "@types";

type State = {
  token: IToken | null;
  index: number;
  isClicked: boolean;
  display: boolean;
};

const initialState: State = {
  token: null,
  index: 0,
  isClicked: false,
  display: false,
};

const placeholderTokenSlice = createSlice({
  name: "placeholderToken",
  initialState,
  reducers: {
    setToken: (
      state,
      action: PayloadAction<Pick<State, "index" | "token" | "display">>
    ) => ({
      ...state,
      ...action.payload,
    }),
    resetToken: () => initialState,
    clickToken: (state) => ({
      ...state,
      isClicked: true,
    }),
  },
});

export const { setToken, resetToken, clickToken } =
  placeholderTokenSlice.actions;

export default placeholderTokenSlice.reducer;
