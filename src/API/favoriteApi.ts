import { privateRoute } from "./index";

export const getAllBooksFromFavorite = async () => {
  const response = privateRoute.get("/favorites");
  return response
};
