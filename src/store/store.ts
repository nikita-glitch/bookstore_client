import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import bookSlice from "./bookSlice";

export const store = configureStore({
  reducer: {
    users: userSlice,
    books: bookSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: true}),
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
