import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCartBooks = createAsyncThunk("cart/get", async () => {});

export const removeBookFromCart = createAsyncThunk("cart/delete", async () => {});


const initialState = {
  cartBooks: [{
    
  }],
  isLoading: false,
  error: {
    response: {
      data: "",
      status: "",
    },
  },
  message: "",
}

const cartSlice = createSlice({
name: 'cart',
initialState,
reducers: {},
extraReducers: (builder) => {
  builder.addCase(getCartBooks.pending, (state) => {
    // state.isLoading = true;
    // state.error.response = {
    //   data: "",
    //   status: "",
    // };
  });

  builder.addCase(getCartBooks.fulfilled, (state, action) => {
    // state.user = action.payload;
    // state.isLoading = false;
  });

  builder.addCase(getCartBooks.rejected, (state, action) => {
    // if (action.payload) {
    //   state.error.response = {
    //     data: "",
    //     status: "",
    //   };
    // }
    // state.isLoading = false;
  });

  builder.addCase(removeBookFromCart.pending, (state) => {
    // state.isLoading = true;
    // state.error.response = {
    //   data: "",
    //   status: "",
    // };
  });

  builder.addCase(removeBookFromCart.fulfilled, (state, action) => {
    // state.user = action.payload;
    // state.isLoading = false;
  });

  builder.addCase(removeBookFromCart.rejected, (state, action) => {
    // if (action.payload) {
    //   state.error.response = {
    //     data: "",
    //     status: "",
    //   };
    // }
    // state.isLoading = false;
  });
},
})

export default cartSlice.reducer