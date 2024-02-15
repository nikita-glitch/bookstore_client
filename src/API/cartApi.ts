import { privateRoute } from "./index";

export const getAllBooksFromCart = async () => {
  const response = privateRoute.get("/cart");
  return response
};

export const changeAmount = async (bookId: string, isIncrement: boolean) => {
  const response = privateRoute.patch("/cart", { bookId, isIncrement });
  return response
};

