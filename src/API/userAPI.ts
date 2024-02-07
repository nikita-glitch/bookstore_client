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
  privateRoute
    .patch("/users/profile/password-change", values)
    .then((response) => alert(response.data.message))
    .catch((error) => alert(error.response.data.message));
};

const changeName = async (name: string) => {
  const response = await privateRoute.patch("/users/profile/profile-change", {
    name: name,
  });
  return response;
};

const uploadAvatar = async (file: any) => {
  privateRoute
    .put("/users/profile")
    .then((response) =>{return response.data})
    .catch((error) => alert(error.response.data.message));
};

const getAvatar = async () => {
  privateRoute
    .get("/users/profile")
    .then((response) => alert(response.data.message))
    .catch((error) => alert(error.response.data.message));
};

const addToCart = async (bookId: string) => {

}

const addToFavorite = async (bookId: string) => {
  
}

const getCart = async () => {
  try {
    const response = privateRoute.get('cart');
    return response
  } catch (error) {
    
  }
}

const addComment = async (bookId: string) => {

}

const getFavorite = async () => {
  try {
    const response = privateRoute.get('favorites')
    return response
  } catch (error) {
    
  }
}

export default { getUser, changeName, changePassword, uploadAvatar, getCart, getFavorite };
