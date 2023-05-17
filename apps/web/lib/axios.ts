import { getAuthToken } from '@/utils/authToken';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001',
});


// Add an interceptor to include the bearer token in all requests
axiosInstance.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetcher = (url: string) =>
  axiosInstance.get(url).then((res) => res.data.data);

export default axiosInstance;
