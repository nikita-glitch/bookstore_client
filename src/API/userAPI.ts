import { privateRoute } from ".";

const getUser = async () => {
  
    const response = await privateRoute.get("/users/profile");
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
    .then((response) => alert(response.data.message))
    .catch((error) => alert(error.response.data.message));
};

const getAvatar = async (file: any) => {
  privateRoute
    .get("/users/profile")
    .then((response) => alert(response.data.message))
    .catch((error) => alert(error.response.data.message));
};

export default { getUser, changeName, changePassword };
