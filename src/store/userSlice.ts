import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userAPI, { uploadAvatar } from "../API/userAPI";
import { changeAmount, getCartBooks } from "../API/cartApi";
import { UserStateInterface } from "../interfaces/interfaces";
import { getFavoriteBooks } from "../API/favoriteApi";
import { signIn, signUp } from "../API/authAPI";

export const getUser = createAsyncThunk("user/get", async () => {
  const response = await userAPI.getUser();
  return response.data;
});

export const signInThunk = createAsyncThunk(
  "user/sign-in",
  async (values: { email: string; password: string }, {rejectWithValue}) => {
try {
  const response = await signIn(values);
  return response.data;

} catch(err) {
return rejectWithValue(err)
}
  }
);

export const signUpThunk = createAsyncThunk(
  "user/sign-up",
  async (values: {
    email: string;
    password: string;
    passwordToCompare: string;
  },  {rejectWithValue}) => {
    try {
      const response = await signUp(values);
      console.log("thunk>", response);
      return response.data;
    }  catch(err) {
      return rejectWithValue(err)
      }
  }
);

export const changeUserName = createAsyncThunk(
  "name/patch",
  async (name: string) => {
    const response = await userAPI.changeName(name);
    return response.data;
  }
);

export const addUserAvatar = createAsyncThunk(
  "avatar/get",
  async (file: FormData) => {
    const response = await uploadAvatar(file);
    return response.data;
  }
);

export const setBookRating = createAsyncThunk(
  "rating/post",
  async (data: { ratingValue: number | null; bookId?: string }) => {
    const response = await userAPI.setRating(data.ratingValue, data.bookId);
    return { res: response?.data, bookId: data.bookId };
  }
);

export const setAmount = createAsyncThunk(
  "cart/patch",
  async (data: { bookId: string; isIncrement: boolean }, thunkApi) => {
    const response = (await changeAmount(data.bookId, data.isIncrement)).data;
    return { response, data };
  }
);

export const getFavoriteBook = createAsyncThunk(
  "favorite/get",
  async (favoriteId: string) => {
    const response = await getFavoriteBooks(favoriteId);
    return response.data;
  }
);

export const getCartBook = createAsyncThunk(
  "cart/get",
  async (cartId: string) => {
    const response = await getCartBooks(cartId);
    return response.data;
  }
);

export const addBookToCart = createAsyncThunk(
  "cart/post",
  async (bookId?: string) => {
    const response = await userAPI.addToCart(bookId);
    return response.data;
  }
);

export const removeBookFromCart = createAsyncThunk(
  "cart/delete",
  async (bookId: string) => {
    const response = (await userAPI.removeFromCart(bookId)).data;
    return { response, bookId };
  }
);

export const removeBookFromFavorite = createAsyncThunk(
  "favorite/delete",
  async (bookId: string) => {
    const response = (await userAPI.removeFromFavorite(bookId)).data;
    return { response, bookId };
  }
);

export const addBookToFavorite = createAsyncThunk(
  "favorite/post",
  async (bookId: string, { dispatch, getState }) => {
    const response = await userAPI.addToFavorite(bookId);
    return response.data;
  }
);

const initialState = {
  user: null,
  isLoading: false,
} as UserStateInterface;

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(removeBookFromCart.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(removeBookFromCart.fulfilled, (state, action) => {
      state.user!.cart!.cartBooks = state.user!.cart.cartBooks.filter(
        (elem) => elem.book.id !== action.payload.bookId
      );
      state.isLoading = false;
    });

    builder.addCase(removeBookFromCart.rejected, (state, action: any) => {
      state.isLoading = false;
    });

    builder.addCase(removeBookFromFavorite.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(removeBookFromFavorite.fulfilled, (state, action) => {
      state.user!.favorite.favoriteBooks =
        state.user!.favorite.favoriteBooks.filter(
          (elem) => elem.book.id !== action.payload.bookId
        );
      state.isLoading = false;
    });

    builder.addCase(removeBookFromFavorite.rejected, (state, action: any) => {
      state.isLoading = false;
    });

    builder.addCase(addBookToCart.fulfilled, (state, action) => {
      state.user!.cart.cartBooks.push(action.payload.cartBook);
      state.isLoading = false;
    });

    builder.addCase(addBookToCart.rejected, (state, action: any) => {
      state.isLoading = false;
    });

    builder.addCase(addBookToFavorite.fulfilled, (state, action) => {
      state.user!.favorite.favoriteBooks.push(action.payload.favoriteBook);
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

    builder.addCase(signInThunk.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(signInThunk.fulfilled, (state, action: any) => {
      const { token, user } = action.payload;
      localStorage.setItem("token", token);
      state.user = user;
      state.isLoading = false;
    });

    builder.addCase(signInThunk.rejected, (state, action: any) => {
      state.isLoading = false;
    });

    builder.addCase(signUpThunk.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(signUpThunk.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isLoading = false;
    });

    builder.addCase(signUpThunk.rejected, (state, action) => {
      state.isLoading = false;
      console.log("thunk>", action.payload);
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
      state.user!.avatar = action.payload.avatar;
      state.isLoading = false;
    });

    builder.addCase(addUserAvatar.rejected, (state, action: any) => {
      state.isLoading = false;
    });

    builder.addCase(setBookRating.pending, (state, action) => {});

    builder.addCase(setBookRating.fulfilled, (state, action) => {
      state.user!.rating! = state.user!.rating!.filter(
        (rate) => rate.bookId !== action.payload.bookId
      );
      state.user!.rating!.push(action.payload.res.userRatingOfBook);
    });

    builder.addCase(setBookRating.rejected, (state, action) => {});

    builder.addCase(getCartBook.pending, (state, action) => {});

    builder.addCase(getCartBook.fulfilled, (state, action) => {
      state.user!.cart = action.payload;
    });

    builder.addCase(getCartBook.rejected, (state, action) => {});

    builder.addCase(getFavoriteBook.pending, (state, action) => {});

    builder.addCase(getFavoriteBook.fulfilled, (state, action) => {
      state.user!.favorite = action.payload;
    });

    builder.addCase(getFavoriteBook.rejected, (state, action) => {});

    builder.addCase(setAmount.pending, (state, action) => {});

    builder.addCase(setAmount.fulfilled, (state, action) => {
      const { bookId, isIncrement } = action.payload.data;
      const currentCartBook = state.user?.cart?.cartBooks.find(
        (elem) => elem.book.id === bookId
      );
      if (!currentCartBook) {
        return;
      }
      if (isIncrement) {
        currentCartBook.amount++;
        return;
      }
      if (currentCartBook.amount <= 1) {
        state.user!.cart!.cartBooks = state.user!.cart.cartBooks.filter(
          (elem) => elem.book.id !== bookId
        );
      } else {
        currentCartBook.amount--;
      }
    });

    builder.addCase(setAmount.rejected, (state, action) => {});
  },
});

export default userSlice.reducer;
