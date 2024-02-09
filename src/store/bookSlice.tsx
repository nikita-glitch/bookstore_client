import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bookApi from "../API/booksAPI";

export const getBook = createAsyncThunk("books/get", async () => {
  const response = await bookApi.getBooks();
  return response.data
});

const initialState = {
  book: [{
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
    photo: "",
  }],
  genreFilter: null,
  priceFilter: null,
  sortBy: null,
  limit: 12, 
  offset: null,
  isLoading: false, 
  error: {},

};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBook.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });

    builder.addCase(getBook.fulfilled, (state, action) => {
      state.book = action.payload;
      state.isLoading = false;
    });

    builder.addCase(getBook.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
      }
      state.isLoading = false;
    });
  },
});

export default bookSlice.reducer;
