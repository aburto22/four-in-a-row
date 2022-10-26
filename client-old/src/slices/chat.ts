import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMessage } from '../types';

const initialState: IMessage[] = [];

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<IMessage>) => [...state, action.payload],
  },
});

export const { addMessage } = chatSlice.actions;

export default chatSlice.reducer;
