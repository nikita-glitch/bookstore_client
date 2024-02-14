import { privateRoute } from ".";

export const signUp = async (values: {
  email: string;
  password: string;
  passwordToCompare: string;
}) => {
  const response = privateRoute.post("/auth/sign-up", values);
  return response;
};

export const signIn = async (values: { email: string; password: string }) => {
  const response = privateRoute.post("/auth/sign-in", values);
  return response;
};
export default { signUp, signIn };
