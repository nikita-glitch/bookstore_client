import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import bookSlice from "./bookSlice";
import cartSlice from "./cartSlice";
import favoriteSlice from "./favoriteSlice";

export const store = configureStore({
  reducer: {
    users: userSlice,
    books: bookSlice,
    cart: cartSlice,
    favorite: favoriteSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: true}),
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
