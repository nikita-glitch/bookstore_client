import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bookApi from "../API/booksAPI";
import { SortOptionsInterface } from "../interfaces/interfaces";
import { RootState } from "./store";

export const getBook = createAsyncThunk(
  "books/get",
  async (_, thunkApi) => {
    const { books } = thunkApi.getState() as RootState
    
    const sortOptions = {
      genreId: books.genreFilter,
      priceRange: books.priceFilter,
      sort: books.sortBy
    }

    const response = await bookApi.getBooks( books.offset,
      books.searchString,
      sortOptions);      

    return response.data;
  }
);

const initialState = {
  book: [
    {
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
    },
  ],
  searchString: '',
  genreFilter: "",
  priceFilter: [0, 100],
  sortBy: "",
  limit: 12,
  total: 0,
  offset: 1,
  isLoading: false,
  error: {},
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    settedSortBy (state, action) {
      state.sortBy = action.payload; 
    },
    settedPriseFilter (state, action) {
      state.priceFilter = action.payload;
    },
    settedGenreFilter (state, action) {
      state.genreFilter = action.payload; 
    },
    settedSearchString (state, action) {
      state.searchString = action.payload; 
    },
    settedOffset (state, action) {
      state.offset = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getBook.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });

    builder.addCase(getBook.fulfilled, (state, action) => {
      const { result, total } = action.payload;
      state.book = result;
      state.total = total
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

export const { settedGenreFilter, settedOffset, settedPriseFilter, settedSearchString, settedSortBy  } = bookSlice.actions