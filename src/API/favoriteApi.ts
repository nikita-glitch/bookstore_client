import { privateRoute } from "."

export const getFavoriteBooks = async (favoriteId: string) => {
  const response = privateRoute.get('/favorites/' + favoriteId)
  return response
}