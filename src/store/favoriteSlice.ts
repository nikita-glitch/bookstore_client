import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllBooksFromFavorite } from "../API/favoriteApi";
import userAPI from "../API/userAPI";

export const getFavoriteBooks = createAsyncThunk("favorite/get", async () => {
  const response = await getAllBooksFromFavorite()
  return response
});

export const removeBookFromFavorite = createAsyncThunk("favorite/delete", async (bookId: string) => {
  const response = await userAPI.removeFromFavorite(bookId);
});

export const addBookToFavorite = createAsyncThunk("favorite/post", async (bookId: string) => {
  const response = await userAPI.addToFavorite(bookId);

});


const initialState = {
  favoriteBooks: [{
    book: {
      id: "",
      title: "",
      description: "",
      price: 0,
      rating: 0,
      author: {
        id: "",
        author_name: "",
      },
      genreId: "",
      comments: "",
      photos: {
        bookId: "",
      data:{ 
        data: [], 
        type: "Buffer"
      },
      id: "",
      photoName: ""
      },
    }, 
  }],
  isLoading: false,
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFavoriteBooks.pending, (state) => {
      state.isLoading = true;
    
    });
  
    builder.addCase(getFavoriteBooks.fulfilled, (state, action) => {
      state.favoriteBooks = action.payload.data;
      state.isLoading = false;
    });
  
    builder.addCase(getFavoriteBooks.rejected, (state, action: any) => {
      state.isLoading = false;
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
