// src/api.ts
import axios from 'axios';
import { BACKEND_URL } from './config/config';

const api = axios.create({
  baseURL: BACKEND_URL + 'api', // Make sure this correctly joins with your BACKEND_URL
});

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Check if error is due to unauthorized access (token expired)
    if (error.response && error.response.status === 401) {
      // Clear invalid tokens
      if (localStorage.getItem('token')) {
        const originalRequest = error.config;
        const refreshToken = localStorage.getItem('refresh');
        
        // If we have a refresh token, try to get a new access token
        if (refreshToken && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            const refreshResponse = await axios.post(
              `${BACKEND_URL}api/token/refresh/`,
              { refresh: refreshToken }
            );
            
            const newToken = refreshResponse.data.access;
            localStorage.setItem('token', newToken);
            api.defaults.headers.common['Authorization'] = `JWT ${newToken}`;
            originalRequest.headers['Authorization'] = `JWT ${newToken}`;
            
            // Retry the original request
            return api(originalRequest);
          } catch (refreshError) {
            // If refresh token is invalid, log out
            localStorage.removeItem('token');
            localStorage.removeItem('refresh');
            localStorage.removeItem('user');
            window.location.href = '/login';
          }
        } else {
          // If no refresh token or retry failed, handle logout
          localStorage.removeItem('token');
          localStorage.removeItem('refresh');
          localStorage.removeItem('user');
        }
      }
    }
    
    return Promise.reject(error);
  }
);

// Add request interceptor to add token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;