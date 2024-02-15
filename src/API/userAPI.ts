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
  const response = await privateRoute.patch("/users/profile/profile-change", {
    name: name,
  });
  return response;
};

export const uploadAvatar = async (file: FormData) => {
  const response = await privateRoute.put("/users/profile", file);
  return response;
};

const getAvatar = async () => {
  const response = privateRoute.get("/user/profile/avatar");
  return response;
};

const addComment = async (bookId: string) => {};

export const addToFavorite = async() => {
    const response = privateRoute.get("/");
  return response
}
export const addToCart = async() => {
    const response = privateRoute.get("/");
  return response
}
export const removeFromFavorite = async() => {
    const response = privateRoute.get("/");
  return response
}
export const removeFromCart = async() => {
    const response = privateRoute.get("/");
  return response
}

export default {
  getUser,
  changeName,
  changePassword,
  getAvatar,
};
