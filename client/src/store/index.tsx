import { configureStore } from '@reduxjs/toolkit';
import game from '../slices/game';
import user from '../slices/user';

const store = configureStore({
  reducer: {
    game,
    user,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
