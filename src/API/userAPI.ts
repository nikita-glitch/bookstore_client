import { Dispatch } from "redux";
import { privateRoute } from ".";

export const getUser = async () =>  (dispatch: Dispatch) => {
  //dispatch()
  privateRoute
    .get("/profile")
    .then((response) => {
    })
    .catch((error) => {
      alert(error.response.data.message);
    });
};
