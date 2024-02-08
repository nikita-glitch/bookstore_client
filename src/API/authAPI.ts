import { privateRoute } from ".";

export const signUp = async (values: {
  email: string;
  password: string;
  passwordToCompare: string;
}) => {
  try {
    const response = await privateRoute.post("/auth/sign-up", values);
    return response.data
  } catch (error) {
    return error
  }
};

export const signIn = async (values: { email: string; password: string }) => {
  try {
    const response = await privateRoute.post("/auth/sign-in", values);
    const { token, user } = response.data;
    localStorage.setItem("token", token);
    return user;
  } catch (error) {
    return error;
  }
};

export default { signUp, signIn };
