import { privateRoute } from "./index";


export const changeAmount = async (bookId: string, isIncrement: boolean) => {
  const response = privateRoute.patch("/cart", { bookId, isIncrement });
  return response
};

