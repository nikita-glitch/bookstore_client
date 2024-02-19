import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllBooksFromCart, changeAmount} from "../API/cartApi";
import userAPI from "../API/userAPI";

export const getCartBooks = createAsyncThunk("cart/get", async () => {
  const response = await getAllBooksFromCart();
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
  
},
extraReducers: (builder) => {

},
})


export default cartSlice.reducer