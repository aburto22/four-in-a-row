import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IToken, IGame } from "@types";

type State = {
  token: IToken | null;
  index: number;
  isClicked: boolean;
  display: boolean;
  nextAction: IGame | null;
};

const initialState: State = {
  token: null,
  index: 0,
  isClicked: false,
  display: false,
  nextAction: null,
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
    clickToken: (state, action: PayloadAction<IGame>) => ({
      ...state,
      isClicked: true,
      nextAction: action.payload,
    }),
  },
});

export const { setToken, resetToken, clickToken } =
  placeholderTokenSlice.actions;

export default placeholderTokenSlice.reducer;
