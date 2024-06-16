import cookie from '@boiseitguru/cookie-cutter';
import axios from 'axios';

// Axios configuration
const axiosConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_IP,
  timeout: 30000,
};

// Create an axios instance
const instance = axios.create(axiosConfig);
console.log(instance.defaults.baseURL);
// Add a request interceptor
instance.interceptors.request.use((config) => {
  // Get the authorization value
  const authorizationValue = 'bear ' + cookie.get('token');

  // Add the Authorization header
  config.headers.Authorization = authorizationValue;

  return config;
});

export default instance;



