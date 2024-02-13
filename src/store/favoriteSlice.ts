import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getFavoriteBooks = createAsyncThunk("cart/get", async () => {
  
});

export const removeBookFromFavorite = createAsyncThunk("cart/delete", async () => {});

const initialState = {
  favoriteBooks: [{}],
  isLoading: false,
  error: {
    response: {
      data: "",
      status: "",
    },
  },
  message: "",
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFavoriteBooks.pending, (state) => {
      // state.isLoading = true;
      // state.error.response = {
      //   data: "",
      //   status: "",
      // };
    });
  
    builder.addCase(getFavoriteBooks.fulfilled, (state, action) => {
      // state.user = action.payload;
      // state.isLoading = false;
    });
  
    builder.addCase(getFavoriteBooks.rejected, (state, action) => {
      // if (action.payload) {
      //   state.error.response = {
      //     data: "",
      //     status: "",
      //   };
      // }
      // state.isLoading = false;
    });
  
    builder.addCase(removeBookFromFavorite.pending, (state) => {
      // state.isLoading = true;
      // state.error.response = {
      //   data: "",
      //   status: "",
      // };
    });
  
    builder.addCase(removeBookFromFavorite.fulfilled, (state, action) => {
      // state.user = action.payload;
      // state.isLoading = false;
    });
  
    builder.addCase(removeBookFromFavorite.rejected, (state, action) => {
      // if (action.payload) {
      //   state.error.response = {
      //     data: "",
      //     status: "",
      //   };
      // }
      // state.isLoading = false;
    });
  },
});
export default favoriteSlice.reducer;
