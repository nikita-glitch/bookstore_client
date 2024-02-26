import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bookApi from "../API/booksAPI";
import { BookStateInterface } from "../interfaces/interfaces";
import userAPI from "../API/userAPI";

export const getBook = createAsyncThunk(
  "books/get",
  async (params?: {
    priceFilter: number[];
    searchString: string;
    genreFilter: {key?: string}[];
    sortBy: string;
    offset: number;
  }) => {
    const sortOptions = {
      genreId: params?.genreFilter,
      priceRange: params?.priceFilter,
      sort: params?.sortBy,
    };

    const response = await bookApi.getBooks(
      params?.offset ?? 1,
      params?.searchString,
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
    return response;
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
      console.log(action.payload.data.comment);
      
      const comment = action.payload.data.comment
      const currentBook = state.book?.find(
        (book) => book.id === comment.bookId
      );    
        
      if (currentBook) {
        state.book?.forEach((book) => {
          if (book.id === currentBook.id) {
            book.comments.push(comment)
            return
          }
        })
      }
    });

    builder.addCase(postComment.rejected, (state, action) => {});

  },
});

export default bookSlice.reducer;
