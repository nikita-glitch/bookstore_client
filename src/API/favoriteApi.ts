import { privateRoute } from "./index";

export const getAllBooksFromFavorite = async () => {
  const response = privateRoute.get("/favorites");
  return response
};

export const removeFromFavorite = async (bookId: string) => {
  const response = privateRoute.delete("/favorites", {
    data: bookId,
  });
  return response
};

export const addToFavorite = async (bookId: string) => {
  const response = privateRoute.post("/favorites", bookId);
  return response
};
