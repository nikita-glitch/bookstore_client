import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userAPI, { uploadAvatar } from "../API/userAPI";
import authAPI from "../API/authAPI";
import { changeAmount, getCartBooks } from "../API/cartApi";
import { UserStateInterface } from "../interfaces/interfaces";
import { getFavoriteBooks } from "../API/favoriteApi";

export const getUser = createAsyncThunk("user/get", async () => {
  const response = await userAPI.getUser();
  return response.data;
});

export const signIn = createAsyncThunk(
  "user/sign-in",
  async (values: { email: string; password: string }) => {
    const response = await authAPI.signIn(values);
    return response;
  }
);

export const signUp = createAsyncThunk(
  "user/sign-up",
  async (values: {
    email: string;
    password: string;
    passwordToCompare: string;
  }) => {
    const response = await authAPI.signUp(values);
    return response;
  }
);

export const changeUserName = createAsyncThunk(
  "name/patch",
  async (name: string) => {
    const response = await userAPI.changeName(name);
    return response.data;
  }
);

export const addUserAvatar = createAsyncThunk("avatar/get", async (file: FormData) => {
  const response = await uploadAvatar(file);  
  return response;
});

export const setBookRating = createAsyncThunk(
  "rating/post",
  async (data: { ratingValue: number | null; bookId?: string }) => {
    const response = await userAPI.setRating(data.ratingValue, data.bookId);
    return response?.data;
  }
);

export const setAmount = createAsyncThunk(
  "cart/patch",
  async (data: { bookId: string; isIncrement: boolean }) => {
    const response = await changeAmount(data.bookId, data.isIncrement);
    return response;
  }
);

export const getFavoriteBook = createAsyncThunk("favorite/get", async(favoriteId: string) => {
  const response = await getFavoriteBooks(favoriteId)
  return response
})

export const getCartBook = createAsyncThunk("cart/get", async(cartId: string) => {
  const response = await getCartBooks(cartId)
  return response
})


export const addBookToCart = createAsyncThunk(
  "cart/post",
  async (bookId?: string) => {
    const response = await userAPI.addToCart(bookId);
    return response;
  }
);

export const removeBookFromCart = createAsyncThunk(
  "cart/delete",
  async (bookId: string) => {
    const response = await userAPI.removeFromCart(bookId);
    return bookId;
  }
);

export const removeBookFromFavorite = createAsyncThunk(
  "favorite/delete",
  async (bookId: string) => {
    const response = await userAPI.removeFromFavorite(bookId);
    return {response, bookId};
  }
);

export const addBookToFavorite = createAsyncThunk(
  "favorite/post",
  async (bookId: string, {dispatch, getState}) => {
    const response = await userAPI.addToFavorite(bookId);
    return response;
  }
);

const initialState = {
  user: null,
  isLoading: false,
} as UserStateInterface;

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    amountIncremented(state, action) {
      const currentCartBook = state.user!.cart.cartBooks.find(
        (elem) => elem.book.id === action.payload
      );
      if (currentCartBook) {
        currentCartBook.amount++;
      }
    },

    amountDecremented(state, action) {
      const currentCartBook = state.user!.cart.cartBooks.find(
        (elem) => elem.book.id === action.payload
      );
      if (currentCartBook) {
        if (currentCartBook.amount <= 1) {
          state.user!.cart!.cartBooks = state.user!.cart.cartBooks.filter(
            (elem) => elem.book.id !== action.payload
          );
        } else {
          currentCartBook.amount--;
        }
      }
    },

    bookRemovedFromCart(state, action) {
      state.user!.cart!.cartBooks = state.user!.cart.cartBooks.filter(
        (elem) => elem.book.id !== action.payload
      );
    },

    bookRemovedFromFavorite(state, action) {
      state.user!.favorite.favoriteBooks =
        state.user!.favorite.favoriteBooks.filter(
          (elem) => elem.book.id !== action.payload
        );
    },
  },
  extraReducers: (builder) => {

    builder.addCase(removeBookFromCart.pending, (state, action) => {
      state.isLoading = true;
    })

    builder.addCase(removeBookFromCart.fulfilled, (state, action) => {
      state.user!.cart.cartBooks = state.user!.cart.cartBooks.filter((cartBook) => cartBook.id !== action.payload);
      state.isLoading = false;
    });

    builder.addCase(removeBookFromCart.rejected, (state, action: any) => {
      state.isLoading = false;
    });

    builder.addCase(removeBookFromFavorite.pending, (state, action) => {
      state.isLoading = true;
    })

    builder.addCase(removeBookFromFavorite.fulfilled, (state, action) => {
      state.user!.favorite.favoriteBooks = state.user!.favorite.favoriteBooks.filter((favBook) => favBook.id !== action.payload.bookId);
      state.isLoading = false;
    });

    builder.addCase(removeBookFromFavorite.rejected, (state, action: any) => {
      state.isLoading = false;
    });

    builder.addCase(addBookToCart.fulfilled, (state, action) => {
      state.user!.cart.cartBooks.push(action.payload.data.cartBook);
      state.isLoading = false;
    });

    builder.addCase(addBookToCart.rejected, (state, action: any) => {
      state.isLoading = false;
    });

    builder.addCase(addBookToFavorite.fulfilled, (state, action) => {
      console.log(action.payload);

      state.user!.favorite.favoriteBooks.push(action.payload.data);
      state.isLoading = false;
    });

    builder.addCase(addBookToFavorite.rejected, (state, action: any) => {
      state.isLoading = false;
    });

    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    });

    builder.addCase(getUser.rejected, (state, action: any) => {
      state.isLoading = false;
    });

    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(signIn.fulfilled, (state, action: any) => {
      const { token, user } = action.payload.data;
      localStorage.setItem("token", token);
      state.user = user;
      state.isLoading = false;
    });

    builder.addCase(signIn.rejected, (state, action: any) => {
      state.isLoading = false;
    });

    builder.addCase(signUp.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(signUp.fulfilled, (state, action) => {
      state.user = action.payload?.data;
      state.isLoading = false;
    });

    builder.addCase(signUp.rejected, (state, action: any) => {
      state.isLoading = false;
    });

    builder.addCase(changeUserName.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(changeUserName.fulfilled, (state, action) => {
      state.user!.name = action.payload.name;
      state.isLoading = false;
    });

    builder.addCase(changeUserName.rejected, (state, action: any) => {
      state.isLoading = false;
    });

    builder.addCase(addUserAvatar.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(addUserAvatar.fulfilled, (state, action) => {
      state.user!.avatar = action.payload.data.avatar;
      state.isLoading = false;
    });

    builder.addCase(addUserAvatar.rejected, (state, action: any) => {
      state.isLoading = false;
    });

    builder.addCase(setBookRating.pending, (state, action) => {});

    builder.addCase(setBookRating.fulfilled, (state, action) => {      
      state.user!.rating!.push(action.payload.userRatingOfBook);
    });

    builder.addCase(setBookRating.rejected, (state, action) => {});

    builder.addCase(getCartBook.pending, (state, action) => {});

    builder.addCase(getCartBook.fulfilled, (state, action) => {     
      state.user!.cart = action.payload.data;
    });

    builder.addCase(getCartBook.rejected, (state, action) => {});

    builder.addCase(getFavoriteBook.pending, (state, action) => {});

    builder.addCase(getFavoriteBook.fulfilled, (state, action) => {    
      state.user!.favorite = action.payload.data;
    });

    builder.addCase(getFavoriteBook.rejected, (state, action) => {});
  },
});

export const {
  amountIncremented,
  amountDecremented,
  bookRemovedFromCart,
  bookRemovedFromFavorite,
} = userSlice.actions;

export default userSlice.reducer;
