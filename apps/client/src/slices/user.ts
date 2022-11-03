import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "@types";

const initialState: IUser = {
  name: "",
  id: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => ({
      ...state,
      name: action.payload,
    }),
    setUserId: (state, action: PayloadAction<string>) => ({
      ...state,
      id: action.payload,
    }),
  },
});

export const { setUserName, setUserId } = userSlice.actions;

export default userSlice.reducer;
