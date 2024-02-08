import { privateRoute } from "./index";

export const getAllGenres = async () => {
  try {
    const response = await privateRoute.get('books-genre')
    return response
  } catch (error) {
    
  }
}
