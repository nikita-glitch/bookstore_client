import { privateRoute } from "./index";

export const getAllGenres = async () => {
  const response = await privateRoute.get("genre");
  return response;
};
