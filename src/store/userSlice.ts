import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userAPI from "../API/userAPI";
import authAPI from "../API/authAPI";

export const getUser = createAsyncThunk("user/get", async () => {
  const response = await userAPI.getUser();
  return response.data;
});

export const getUserCart = createAsyncThunk("cart/get", async () => {
  const response = await userAPI.getCart();
  if (response) {
    return response.data;
  }
});

export const getUserFavorite = createAsyncThunk("favorite/get", async () => {
  const response = await userAPI.getFavorite();
  if (response) {
    return response.data;
  }
});

export const changeUserName = createAsyncThunk(
  "name/patch",
  async (name: string) => {
    const response = await userAPI.changeName(name);
    alert(response.data.message);
    return response.data.name;
  }
);

export const changeUserAvatar = createAsyncThunk(
  "avatar/put",
  async (file: any) => {
    const response = await userAPI.uploadAvatar(file);
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
    avatarId: "",
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

    builder.addCase(changeUserAvatar.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });

    builder.addCase(changeUserAvatar.fulfilled, (state, action) => {
      // state.user.avatarId = action.payload;
      state.isLoading = false;
    });

    builder.addCase(changeUserAvatar.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
      }
      state.isLoading = false;
    });

    builder.addCase(getUserCart.fulfilled, (state, action) => {
      state.user.cart = action.payload;
      state.isLoading = false;
    });

    builder.addCase(getUserFavorite.fulfilled, (state, action) => {
      state.user.favorite = action.payload;
      state.isLoading = false;
    });
  },
});

export default userSlice.reducer;
