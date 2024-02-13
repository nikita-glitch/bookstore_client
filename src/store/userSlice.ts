import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userAPI from "../API/userAPI";
import authAPI from "../API/authAPI";

export const getUser = createAsyncThunk("user/get", async () => {
  const response = await userAPI.getUser();
  return response.data;
});

export const signIn = createAsyncThunk(
  "user/sign-in",
  async (values: { email: string; password: string }, thunkApi) => {
    try {
      const response = await authAPI.signIn(values);
      console.log(response);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
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
    const response = await authAPI.signUp(values);
    alert(response.data.message);
    return response;
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

export const getUserAvatar = createAsyncThunk("avatar/get", async () => {
  const response = await userAPI.getAvatar();
  return response?.data;
});

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
  error: {
    response: {
      data: "",
      status: "",
    },
  },
  message: "",
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true;
      state.error.response = {
        data: "",
        status: "",
      };
    });

    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    });

    builder.addCase(getUser.rejected, (state, action) => {
      if (action.payload) {
        state.error.response = {
          data: "",
          status: "",
        };
      }
      state.isLoading = false;
    });
    
    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true;
      state.error.response = {
        data: "",
        status: "",
      };
    });

    builder.addCase(signIn.fulfilled, (state, action: {payload: any }) => {
      const { token, user } = action.payload.data;
      localStorage.setItem('token', token)
      state.user = user
      state.error.response = {
        data: "",
        status: "",
      };
      state.isLoading = false;
    });

    builder.addCase(signIn.rejected, (state, action: {payload: any }) => {
      state.error.response = action.payload?.response;
      state.isLoading = false;
    });

    builder.addCase(signUp.pending, (state) => {
      state.isLoading = true;
      state.error.response = {
        data: "",
        status: "",
      };
    });

    builder.addCase(signUp.fulfilled, (state, action) => {
      state.user = action.payload?.data;
      state.error.response = {
        data: "",
        status: "",
      };
      state.isLoading = false;
    });

    builder.addCase(signUp.rejected, (state, action) => {
      /////
      state.isLoading = false;
    });

    builder.addCase(changeUserName.pending, (state) => {
      state.isLoading = true;
      state.error.response = {
        data: "",
        status: "",
      };
    });

    builder.addCase(changeUserName.fulfilled, (state, action) => {
      state.user.name = action.payload;
      state.isLoading = false;
    });

    builder.addCase(changeUserName.rejected, (state, action) => {
      ///
      state.isLoading = false;
    });

    builder.addCase(getUserAvatar.pending, (state) => {
      state.isLoading = true;
      state.error.response = {
        data: "",
        status: "",
      };
    });

    builder.addCase(getUserAvatar.fulfilled, (state, action) => {
      state.user.avatar = action.payload;
      state.isLoading = false;
    });

    builder.addCase(getUserAvatar.rejected, (state, action) => {
      //////
      state.isLoading = false;
    });
  },
});

export default userSlice.reducer;
