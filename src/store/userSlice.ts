import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userAPI from "../API/userAPI";
import authAPI from "../API/authAPI";

export const getUser = createAsyncThunk("user/get", async () => {
  const response = await userAPI.getUser();
  return response.data
});

// export const signIn = createAsyncThunk("user/sign-in", async (values: { email: string; password: string }, thunkAPI ) => {
//    authAPI.signIn(values)
//    .then()
//    .catch((error) => {
//     if (!error.response) {
//       throw error
//     }
//     console.log(error);
    
//     return thunkAPI.rejectWithValue(error.response.data)
//    })
  
// });

export const changeUserName = createAsyncThunk("name/patch", async (name: string) => {
  const response = await userAPI.changeName(name); 
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
