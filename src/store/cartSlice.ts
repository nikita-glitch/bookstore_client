import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllBooksFromCart, removeFromCart } from "../API/cartApi";

export const getCartBooks = createAsyncThunk("cart/get", async () => {
  const response = await getAllBooksFromCart();
  return response
});

export const removeBookFromCart = createAsyncThunk("cart/delete", async (bookId: string) => {
  const response = await removeFromCart(bookId)
  return response
});

export const changeAmount = createAsyncThunk("cart/patch", async (bookId: string) => {
  const response = await removeFromCart(bookId)
  return response
});

export const addToCart = createAsyncThunk("cart/delete", async (bookId: string) => {
  const response = await removeFromCart(bookId)
  return response
});

const initialState = {
  cartBooks: [{
    has_paid: false,
    is_ordered: false,
    amount: 1,
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
      photo: "",
    }, 
  }],
  isLoading: false,
  error: {
    response: {
      data: "",
      status: "",
    },
  },
  message: {},
}

const cartSlice = createSlice({
name: 'cart',
initialState,
reducers: {},
extraReducers: (builder) => {
  builder.addCase(getCartBooks.pending, (state) => {
    state.isLoading = true;
    state.error.response = {
      data: "",
      status: "",
    };
  });

  builder.addCase(getCartBooks.fulfilled, (state, action) => {
    state.cartBooks = action.payload.data;
    state.isLoading = false;
  });

  builder.addCase(getCartBooks.rejected, (state, action: any) => {
    state.error.response = action.payload?.response;
    state.isLoading = false;
  });

  builder.addCase(removeBookFromCart.pending, (state) => {
    state.isLoading = true;
    state.error.response = {
      data: "",
      status: "",
    };
  });

  builder.addCase(removeBookFromCart.fulfilled, (state, action) => {
    state.message = action.payload.data
    state.isLoading = false;
  });

  builder.addCase(removeBookFromCart.rejected, (state, action: any) => {
    state.error.response = action.payload?.response;
    state.isLoading = false;
  });
},
})

export default cartSlice.reducer