import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bookApi from "../API/booksAPI";
import { SortOptionsInterface } from "../interfaces/interfaces";
import { RootState } from "./store";

export const getBook = createAsyncThunk(
  "books/get",
  async (
    params: {
      priceFilter: number[];
      searchString: string;
      genreFilter: {}[];
      sortBy: string;
      offset: number;
    }
  ) => {   
    const sortOptions = {
      genreId: params.genreFilter,
      priceRange: params.priceFilter,
      sort: params.sortBy,
    };

    const response = await bookApi.getBooks(
      params.offset,
      params.searchString,
      sortOptions
    );
    
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
      bookRating: 0,
      rating: [{
        id: '',
        value: 0,
        userId: '',
        bookId: '',
      }],
      author: {
        id: "",
        author_name: "",
      },
      genreId: "",
      comments: [{
        id: '', 
        text: '',
        user: {
          id: '',
          name: '',
          email: '',
          role: '',
          avatar: {
            id: '', 
            avatarName: '',
            data: '',
          }
        },
        bookId: '',
        createdAt: ''
      }],
      photo: "",
    },
  ],
  total: 0,
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
      const { result, total } = action.payload;
      state.book = result;
      state.total = total;
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
