import { privateRoute } from ".";

const getUser = async () => {
  const response = privateRoute.get("/users/profile");
  return response;
};

export const changePassword = async (values: {
  oldPassword: string;
  newPassword: string;
  passwordToCompare: string;
}) => {
  return await privateRoute.patch("/users/profile/password-change", values);
};

const changeName = async (name: string) => {
  const response = await privateRoute.patch("/users/profile/profile-change", { name });
  return response;
};

export const uploadAvatar = async (file: FormData) => {  
  const response = await privateRoute.put("/users/profile", file);
  return response;
};


export const addComment = async (commentText: string, bookId?: string) => {
  const response = await privateRoute.post("/users/comment", { commentText, bookId });
  return response;
};

export const addToFavorite = async (bookId?: string) => {
  const response = privateRoute.post("/users/favorite", { bookId });
  return response;
};
export const addToCart = async (bookId?: string) => {
  const response = await privateRoute.post("/users/cart", { bookId });
  return response;
};
export const removeFromFavorite = async (bookId?: string) => {
  const response = privateRoute.delete("/users/favorite", {
    data: {
      bookId,
    },
  });
  return response;
};
export const removeFromCart = async (bookId?: string) => {
  const response = privateRoute.delete("/users/cart", {
    data: {
      bookId,
    },
  });
  return response;
};

export const setRating = async (
  ratingValue: number | null,
  bookId?: string
) => {
  const response = privateRoute.put("/users/rating", { bookId, ratingValue });
  return response;
};

export default {
  getUser,
  changeName,
  changePassword,
  addToCart, 
  addToFavorite, 
  removeFromCart, 
  removeFromFavorite, 
  setRating,
  addComment,
};
