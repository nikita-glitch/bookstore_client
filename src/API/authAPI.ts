import { Dispatch } from "redux";
import { publicRoute } from ".";
import { getUser } from "../store/userSlice";
import { AppDispatch } from "../store/store";

export const signUp = async (values: {
  email: string;
  password: string;
  passwordToCompare: string;
}) => (dispatch: Dispatch) => {
  
  publicRoute
    .post("/auth/sign-up", values)
    .then((response) => {
      return response.data.message;
      
    })
    .catch((error) => {
      alert(error.response.data.message);
    });
};

export const signIn = async (values: { email: string; password: string }) => {
  publicRoute
    .post("/auth/sign-in", values)
    .then((response) => {     
      const token = response.data;
      localStorage.setItem("token", token);
    })
    .catch((error) => {
      // return error
     throw new Error(error.response.data.message)
    });
};

export default { signUp, signIn }
