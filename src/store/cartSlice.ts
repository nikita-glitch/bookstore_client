import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllBooksFromCart, changeAmount} from "../API/cartApi";
import userAPI from "../API/userAPI";

export const getCartBooks = createAsyncThunk("cart/get", async () => {
  const response = await getAllBooksFromCart();
  return response
});

export const setAmount = createAsyncThunk("cart/patch", async (data: {bookId: string, isIncrement: boolean}) => {
  const response = await changeAmount(data.bookId, data.isIncrement)
  return response
});

export const addBookToCart = createAsyncThunk("cart/post", async (bookId: string) => {
  const response = await userAPI.addToCart(bookId);
  return response.data.cartBook
});

export const removeBookFromCart = createAsyncThunk("cart/delete", async (bookId: string) => {
  const response = await userAPI.removeFromCart(bookId);
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
}

const cartSlice = createSlice({
name: 'cart',
initialState,
reducers: {
  amountIncremented(state, action) {
    const currentCartBook = state.cartBooks.find((elem) => elem.book.id === action.payload)
    if (currentCartBook) {
      currentCartBook.amount++
    }
  },

  amountDecremented(state, action) {
    console.log(action.payload);
    
    const currentCartBook = state.cartBooks.find((elem) => elem.book.id === action.payload)
    console.log(currentCartBook);
    
    if (currentCartBook) {
      currentCartBook.amount--
    }
  },

  bookRemovedFromCart(state, action) {
    state.cartBooks = state.cartBooks.filter((elem) => elem.book.id !== action.payload)
  }
},
extraReducers: (builder) => {
  builder.addCase(getCartBooks.pending, (state) => {
    state.isLoading = true;
    
  });

  builder.addCase(getCartBooks.fulfilled, (state, action) => {
    state.cartBooks = action.payload.data;
    state.isLoading = false;
  });

  builder.addCase(getCartBooks.rejected, (state, action: any) => {
    state.isLoading = false;
  });

  builder.addCase(addBookToCart.pending, (state) => {
    state.isLoading = true;
    
  });

  builder.addCase(addBookToCart.fulfilled, (state, action) => {
    state.cartBooks.push(action.payload.data);
    state.isLoading = false;
  });

  builder.addCase(addBookToCart.rejected, (state, action: any) => {
    state.isLoading = false;
  });
},
})

export const { amountIncremented, amountDecremented, bookRemovedFromCart } = cartSlice.actions

export default cartSlice.reducer