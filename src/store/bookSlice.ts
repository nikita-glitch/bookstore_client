import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bookApi from "../API/booksAPI";
import { SortOptionsInterface } from "../interfaces/interfaces";
import { RootState } from "./store";
import userAPI from "../API/userAPI";

export const getBook = createAsyncThunk(
  "books/get",
  async (params: {
    priceFilter: number[];
    searchString: string;
    genreFilter: {}[];
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
    console.log(response.data);

    return response.data;
  }
);

export const postComment = createAsyncThunk(
  "comment/post",
  async (data: { commentText: string; bookId?: string }) => {
    const response = await userAPI.addComment(data.commentText, data.bookId);
    return response?.data;
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
      rating: [
        {
          id: "",
          value: 0,
          userId: "",
          bookId: "",
        },
      ],
      author: {
        id: "",
        author_name: "",
      },
      genreId: "",
      comments: [
        {
          id: "",
          text: "",
          user: {
            id: "",
            name: "",
            email: "",
            role: "",
            avatar: {
              id: "",
              avatarName: "",
              data: "",
            },
          },
          bookId: "",
          createdAt: "",
        },
      ],
      photos: {
        bookId: "",
        data: {
          data: [],
          type: "Buffer",
        },
        id: "",
        photoName: "",
      },
    },
  ],
  total: 0,
  isLoading: false,
};

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
      const currentBook = state.book.find(
        (elem) => elem.id === action.payload.bookId
      );
      currentBook?.comments.push(action.payload)
    });

    builder.addCase(postComment.rejected, (state, action) => {});
  },
});

export default bookSlice.reducer;
