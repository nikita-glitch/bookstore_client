import { privateRoute } from "."


export const getUser = async () => {
  try {
    const user = privateRoute.get('/profile')
    
  } catch (error) {
    
  }
}