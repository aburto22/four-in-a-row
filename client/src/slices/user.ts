import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "@types";

const initialState: IUser = {
  id: "",
  name: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => ({
      ...state,
      id: action.payload,
    }),
    setUserName: (state, action: PayloadAction<string>) => ({
      ...state,
      name: action.payload,
    }),
  },
});

export const { setUserId, setUserName } = userSlice.actions;

export default userSlice.reducer;
