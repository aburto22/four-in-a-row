import { configureStore } from "@reduxjs/toolkit";
import game from "@slices/game";
import user from "@slices/user";
import chat from "@slices/chat";

const store = configureStore({
  reducer: {
    game,
    user,
    chat,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
