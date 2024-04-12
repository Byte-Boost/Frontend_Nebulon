import cookie from '@boiseitguru/cookie-cutter';
import axios from 'axios';

// Create an axios instance
const instance = axios.create();

// Add a request interceptor
instance.interceptors.request.use((config) => {
  // Get the authorization value
  const authorizationValue = 'bear ' + cookie.get('token');

  // Add the Authorization header
  config.headers.Authorization = authorizationValue;

  return config;
});

export default instance;



