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
  return await privateRoute.patch("/users/profile/password-change", values)
    
};

const changeName = async (name: string) => {
  const response = await privateRoute.patch("/users/profile/profile-change", {
    name: name,
  });
  return response;
};

export const uploadAvatar = async (file: FormData) => {
  try {
    console.log(file);
    
    const response = await privateRoute.put("/users/profile", file);
    alert(response.data.message);
  } catch (error) {
    console.log(file);
    
    console.log(error);
    
    return error
  }
};

const getAvatar = async () => {
  try {
    const response = privateRoute.get("/user/profile/avatar");
    return response;
  } catch (error) {}
};

const addToCart = async (bookId: string) => {};

const addToFavorite = async (bookId: string) => {};

const getCart = async () => {
  try {
    const response = privateRoute.get("cart");
    return response;
  } catch (error) {}
};

const addComment = async (bookId: string) => {};

const getFavorite = async () => {
  try {
    const response = privateRoute.get("favorites");
    return response;
  } catch (error) {}
};

export default {
  getUser,
  changeName,
  changePassword,
  getAvatar,
  getCart,
  getFavorite,
};
