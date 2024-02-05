import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: { 
    user: {}, 
    isLoading: false, 
    error: "" 
  },
  reducers: {
    getUserStart(state) {
      state.isLoading = true;
    },
    getUserSuccsess(state, action) {
      state.isLoading = false;
      state.error = '';
      state.user = action.payload
    },
    getUserError(state, action) {    
      state.isLoading = false;
      state.error = action.payload;         
    },
  },
});

export default userSlice.reducer;
