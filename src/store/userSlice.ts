import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userAPI from "../API/userAPI";
import authAPI from "../API/authAPI";
import { AxiosError } from "axios";

export const getUser = createAsyncThunk("user/get", async () => {
  const response = await userAPI.getUser();
  return response.data;
  
});

export const signIn = createAsyncThunk(
  "user/sign-in",
  async (values: { email: string; password: string }) => {
    try {
      const response = await authAPI.signIn(values);
      return response;      
    } catch (error) {
      console.log("signinthunk>", error);
    }
  }
);

export const signUp = createAsyncThunk(
  "user/sign-up",
  async (values: {
    email: string;
    password: string;
    passwordToCompare: string;
  }) => {
    try {
      const response = await authAPI.signUp(values);
      alert(response.data.message)
      console.log(response);
      console.log(response instanceof AxiosError);
      
      return response;
    } catch (error) {
      console.log("signupthunk>", error);
    }
  }
);

export const changeUserName = createAsyncThunk(
  "name/patch",
  async (name: string) => {
    const response = await userAPI.changeName(name);
    alert(response.data.message);
    return response.data.name;
  }
);

export const getUserAvatar = createAsyncThunk(
  "avatar/get",
  async () => {
    const response = await userAPI.getAvatar();
    return response?.data
  }
);

const initialState = {
  user: {
    id: "",
    name: "",
    email: "",
    role: "",
    cart: "",
    favorite: "",
    avatar: "",
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

    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });

    builder.addCase(signIn.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    });

    builder.addCase(signIn.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
      }
      state.isLoading = false;
    });

    builder.addCase(signUp.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });

    builder.addCase(signUp.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    });

    builder.addCase(signUp.rejected, (state, action) => {
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

    builder.addCase(getUserAvatar.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });

    builder.addCase(getUserAvatar.fulfilled, (state, action) => {
      state.user.avatar = action.payload;
      state.isLoading = false;
    });

    builder.addCase(getUserAvatar.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
      }
      state.isLoading = false;
    });
  },
});

export default userSlice.reducer;
