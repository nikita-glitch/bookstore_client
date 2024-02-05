import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import userSlice from "./userSlice";


export default configureStore({
  reducer: {
    user: userSlice,
  }
  
})
