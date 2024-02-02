import * as axios from 'axios'
import { publicRoute } from '.'

export const signUp = async (values: string) => {
  try {
    console.log(values);
    
    const response = await publicRoute.post('/auth/sign-up', values)
    return response;
  } catch (error) {
    alert(error);
  }
}

export const signIn = async (email: string, password: string) => {
  try {
    const response = await publicRoute.post('/auth/sign-in', {
      email: email,
      password: password,
    })
    return response;
  } catch (error) {
    alert(error);
  }
}