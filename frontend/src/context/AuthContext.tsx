// src/context/AuthContext.tsx
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import api from '../api';
import axios from 'axios';
import { BACKEND_URL } from '../config/config';

type User = {
  id: number;
  email: string;
  username?: string;
  date_joined?: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  refreshAuth: () => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to refresh authentication state
  const refreshAuth = async (): Promise<boolean> => {
    try {
      const storedToken = localStorage.getItem('token');
      
      if (!storedToken) {
        return false;
      }
      
      // Update the API instance with the current token
      api.defaults.headers.common['Authorization'] = `JWT ${storedToken}`;
      
      // Verify token with backend
      const { data } = await api.get('/user/');
      
      setToken(storedToken);
      setUser(data);
      
      return true;
    } catch (error) {
      console.error('Token refresh failed:', error);
      
      // If authentication failed, clear saved data
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        logout();
      }
      
      return false;
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      try {
        const storedToken = localStorage.getItem('token');
        
        if (!storedToken) {
          setIsLoading(false);
          return;
        }
        
        // Set token in state and API headers
        setToken(storedToken);
        api.defaults.headers.common['Authorization'] = `JWT ${storedToken}`;
        
        // Try to parse stored user data first for quicker UI loading
        const storedUserJson = localStorage.getItem('user');
        if (storedUserJson) {
          try {
            const storedUser = JSON.parse(storedUserJson);
            setUser(storedUser);
          } catch (e) {
            console.error("Failed to parse stored user data:", e);
          }
        }
        
        // Verify token with backend regardless of whether we have stored user data
        try {
          const { data } = await api.get('/user/');
          setUser(data);
          localStorage.setItem('user', JSON.stringify(data));
        } catch (error) {
          console.error("Token verification failed:", error);
          if (axios.isAxiosError(error) && error.response?.status === 401) {
            logout();
          }
        }
      } catch (e) {
        console.error("Auth initialization error:", e);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
    
    // Set up token refresh interval
    const tokenRefreshInterval = setInterval(() => {
      refreshAuth().catch(console.error);
    }, 15 * 60 * 1000); // Refresh every 15 minutes
    
    return () => clearInterval(tokenRefreshInterval);
  }, []);

  const signup = async (email: string, username: string, password: string) => {
    await api.post('/signup/', { email, username, password });
  };

  const login = async (email: string, password: string) => {
    try {
      const { data } = await api.post('/login/', { email, password });
      
      // Check for token in either data.token or data.access
      const tokenValue = data?.token || data?.access;
      
      // Make sure we have valid data before proceeding
      if (data && tokenValue && data.user) {
        // Save to localStorage
        localStorage.setItem('token', tokenValue);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Update application state
        api.defaults.headers.common['Authorization'] = `JWT ${tokenValue}`;
        setToken(tokenValue);
        setUser(data.user);
      } else {
        throw new Error("Invalid response from login API");
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout, isLoading, refreshAuth }}>
      {isLoading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);