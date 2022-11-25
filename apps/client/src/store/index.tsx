import { configureStore } from "@reduxjs/toolkit";
import game from "@slices/game";
import user from "@slices/user";
import chat from "@slices/chat";
import placeholderToken from "@slices/placeholderToken";

const store = configureStore({
  reducer: {
    game,
    user,
    chat,
    placeholderToken,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
