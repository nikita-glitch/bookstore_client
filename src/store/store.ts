import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { thunk } from "redux-thunk";

export const store = configureStore({
  reducer: {
    users: userSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: true}),
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
