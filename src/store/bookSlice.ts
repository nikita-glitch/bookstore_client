import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bookApi from "../API/booksAPI";
import { BookStateInterface, SortOptionsInterface } from "../interfaces/interfaces";
import { RootState } from "./store";
import userAPI from "../API/userAPI";

export const getBook = createAsyncThunk(
  "books/get",
  async (params: {
    priceFilter: number[];
    searchString: string;
    genreFilter: {key?: string}[];
    sortBy: string;
    offset: number;
  }) => {
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

// export const setBookRating = createAsyncThunk(
//   "rating/post",
//   async (data: { ratingValue: number | null; bookId?: string }) => {
//     const response = await userAPI.setRating(data.ratingValue, data.bookId);
//     return response?.data;
//   }
// );

export const postComment = createAsyncThunk(
  "comment/post",
  async (data: { commentText: string; bookId?: string }) => {
    const response = await userAPI.addComment(data.commentText, data.bookId);
    return response.data;
  }
);

const initialState = {
  book: null,
  total: 0,
  isLoading: false,
} as BookStateInterface;

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBook.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getBook.fulfilled, (state, action) => {
      const { result, total } = action.payload;
      state.book = result;
      state.total = total;
      state.isLoading = false;
    });

    builder.addCase(getBook.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(postComment.pending, (state, action) => {});

    builder.addCase(postComment.fulfilled, (state, action) => {
      const currentBook = state.book!.find(
        (elem) => elem.id === action.payload.bookId
      );      
      currentBook?.comments?.push(action.payload);
      console.log(currentBook?.comments);
      
    });

    builder.addCase(postComment.rejected, (state, action) => {});

    // builder.addCase(setBookRating.pending, (state, action) => {});

    // builder.addCase(setBookRating.fulfilled, (state, action) => {
    //   const { userRatingOfBook, ratingOfBook } = action.payload;
    //   const currentBook = state.book.find(
    //     (elem) => elem.id === userRatingOfBook.bookId
    //   );
    //   if (currentBook) {
    //     currentBook.rating.push(userRatingOfBook);
    //     currentBook.bookRating = ratingOfBook;
    //   }
    //   console.log(currentBook?.bookRating);
      
    // });

    // builder.addCase(setBookRating.rejected, (state, action) => {});
  },
});

export default bookSlice.reducer;
