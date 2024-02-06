import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userAPI from "../API/userAPI";
import { RootState } from "./store";
import { UserInterface } from "../interfaces/interfaces";

export const getUser = createAsyncThunk("user/get", async () => {
  const response = await userAPI.getUser();
  return response.data;
});

export const changeUserName = createAsyncThunk("name/patch", async (name: string) => {
  console.log(name);
  
  const response = await userAPI.changeName(name);
  console.log(response);
  
  alert(response.data.message)
  return response.data.name;
});

const initialState = {
  user: {
    id: "",
    name: "",
    email: "",
    role: "",
  },
  isLoading: false,
  error: {},
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
      }
      state.isLoading = false;
    });
    builder.addCase(changeUserName.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(changeUserName.fulfilled, (state, action) => {
      state.user.name = action.payload;
      state.isLoading = false;
    });
    builder.addCase(changeUserName.rejected, (state, action) => {      
      if (action.payload) {
        state.error = action.payload;
      }
      state.isLoading = false;
    });
  },
});

export default userSlice.reducer;

// export const selectStatus = (state: RootState) => {
//   return state.user.status;
// };
