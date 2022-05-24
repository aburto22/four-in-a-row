import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../types';

type InitialState = IUser | null;

const initialState: InitialState = null as InitialState;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUpUser: (state, action: PayloadAction<IUser>) => action.payload,
  },
});

export const { setUpUser } = userSlice.actions;

export default userSlice.reducer;
