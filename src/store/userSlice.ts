import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userAPI from "../API/userAPI";
import authAPI from "../API/authAPI";

export const getUser = createAsyncThunk("user/get", async () => {
  const response = await userAPI.getUser();  
  return response.data;
});

export const signIn = createAsyncThunk(
  "user/sign-in",
  async (values: { email: string; password: string }, thunkApi) => {
    try {
      const response = await authAPI.signIn(values);
      console.log(response);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
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
    alert(response.data.message);
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

export const getUserAvatar = createAsyncThunk("avatar/get", async () => {
  const response = await userAPI.getAvatar();
  return response?.data;
});

export const setBookRating = createAsyncThunk("rating/post", async (data: {ratingValue: number | null, bookId?: string }) => {
  const response = await userAPI.setRating(data.ratingValue, data.bookId);
  return response?.data;
});




const initialState = {
  user: {
    id: "",
    name: "",
    email: "",
    role: "",
    cart: {
      cartBooks: [
        {
          id: "",
          amount: 1,
          cartId: "",
          bookId: "",
          book: {
            id: "",
            title: "",
            description: "",
            price: 0,
            bookRating: 0,
            rating: [{
              id: '',
              value: 0,
              userId: '',
              bookId: '',
            }],
            author: {
              id: "",
              author_name: "",
            },
            genreId: "",
            comments: [{
              id: '', 
              text: '',
              userId: '',
              bookId: '',
              createdAt: ''
            }],
            photos: {
              data:{ 
                data: [], 
                type: "Buffer"
              },
              id: "",
              photoName: ""
            },
          },
        },
      ],
      id: "",
      is_ordered: false,
      has_paid: false,
    },
    favorite: {
      favoriteBooks: [
        {
          id: "",
          favoriteId: "",
          bookId: "",
          book: {
            id: "",
            title: "",
            description: "",
            price: 0,
            bookRating: 0,
            rating: [{
              id: '',
              value: 0,
              userId: '',
              bookId: '',
            }],
            author: {
              id: "",
              author_name: "",
            },
            genreId: "",
            comments: [{
              id: '', 
              text: '',
              userId: '',
              bookId: '',
              createdAt: ''
            }],
            photos: {
              
              data:{ 
                data: [], 
                type: "Buffer"
              },
              id: "",
              photoName: ""
            },
          },
        },
      ],
      id: "",
    },
    avatar: {
      id: '', 
      avatarName: '',
      data: '',
    },
    rating: [{
      id: '',
      value: 0,
      userId: '',
      bookId: '',
    }],
  },
  isLoading: false,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
      state.user.name = action.payload.name;
      state.isLoading = false;
    });

    builder.addCase(changeUserName.rejected, (state, action: any) => {
      state.isLoading = false;
    });

    builder.addCase(getUserAvatar.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getUserAvatar.fulfilled, (state, action) => {
      state.user.avatar = action.payload;
      state.isLoading = false;
    });

    builder.addCase(getUserAvatar.rejected, (state, action: any) => {
      state.isLoading = false;
    });

    builder.addCase(setBookRating.pending, (state, action) => {
      
    })

    builder.addCase(setBookRating.fulfilled, (state, action) => {
      state.user.rating.push(action.payload.userRatingOfBook)
    })

    builder.addCase(setBookRating.rejected, (state, action) => {
      
    })
  },
});

export default userSlice.reducer;
