import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllBooksFromCart, changeAmount} from "../API/cartApi";

export const getCartBooks = createAsyncThunk("cart/get", async () => {
  const response = await getAllBooksFromCart();
  return response
});

export const setAmount = createAsyncThunk("cart/patch", async (data: {bookId: string, isIncrement: boolean}) => {
  const response = await changeAmount(data.bookId, data.isIncrement)
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
},
})

export default cartSlice.reducer