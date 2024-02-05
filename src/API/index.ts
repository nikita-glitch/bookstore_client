import axios from 'axios';

const publicRoute = axios.create({
  // baseURL: process.env.BASE_URL,
  baseURL: 'http://localhost:5000/api/v1',
})

const privateRoute = axios.create({
  // baseURL: process.env.BASE_URL,
  baseURL: 'http://localhost:5000/api/v1'

})

privateRoute.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
  config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})
export { publicRoute, privateRoute }