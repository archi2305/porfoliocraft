import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('portfoliocraft_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('portfoliocraft_token'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      const storedToken = localStorage.getItem('portfoliocraft_token');
      if (storedToken) {
        try {
          const res = await authAPI.getMe();
          setUser(res.data);
          localStorage.setItem('portfoliocraft_user', JSON.stringify(res.data));
        } catch (err) {
          console.error("Token verification failed", err);
          logout();
        }
      }
      setIsLoading(false);
    };

    verifyUser();
  }, []);

  const login = async (loginIdentifier, password) => {
    const res = await authAPI.login({ login: loginIdentifier, password });
    const { access_token, user: userData } = res.data;
    localStorage.setItem('portfoliocraft_token', access_token);
    localStorage.setItem('portfoliocraft_user', JSON.stringify(userData));
    setToken(access_token);
    setUser(userData);
    return userData;
  };

  const register = async (email, username, password) => {
    const res = await authAPI.register({ email, username, password });
    const { access_token, user: userData } = res.data;
    localStorage.setItem('portfoliocraft_token', access_token);
    localStorage.setItem('portfoliocraft_user', JSON.stringify(userData));
    setToken(access_token);
    setUser(userData);
    return userData;
  };

  const quickDemoLogin = async () => {
    return await login('demo@portfoliocraft.com', 'password123');
  };

  const logout = () => {
    localStorage.removeItem('portfoliocraft_token');
    localStorage.removeItem('portfoliocraft_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        register,
        quickDemoLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
