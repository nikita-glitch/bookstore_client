import axios from 'axios';

const privateRoute = axios.create({
  // baseURL: process.env.API_URL,
  baseURL: 'http://localhost:5000/api/v1'

})

privateRoute.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
  config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})
export {  privateRoute }
