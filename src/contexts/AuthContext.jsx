import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedAuth = localStorage.getItem('isAuthenticated');
    const savedAdmin = localStorage.getItem('isAdmin');

    if (savedUser && savedAuth === 'true') {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
      setIsAdmin(savedAdmin === 'true');
    }
  }, []);

  const login = async (email, password) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock authentication - in real app, this would call an API
        if (email && password) {
          const mockUser = {
            id: 1,
            name: 'John Doe',
            email: email,
            role: email.includes('admin') ? 'admin' : 'user'
          };

          setUser(mockUser);
          setIsAuthenticated(true);
          setIsAdmin(mockUser.role === 'admin');

          // Save to localStorage
          localStorage.setItem('user', JSON.stringify(mockUser));
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('isAdmin', mockUser.role === 'admin' ? 'true' : 'false');

          resolve(mockUser);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const adminLogin = async (email, password) => {
    // Simulate admin API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password && email.includes('admin')) {
          const mockAdmin = {
            id: 1,
            name: 'Admin User',
            email: email,
            role: 'admin'
          };

          setUser(mockAdmin);
          setIsAuthenticated(true);
          setIsAdmin(true);

          localStorage.setItem('user', JSON.stringify(mockAdmin));
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('isAdmin', 'true');

          resolve(mockAdmin);
        } else {
          reject(new Error('Invalid admin credentials'));
        }
      }, 1000);
    });
  };

  const socialLogin = async (provider) => {
    // Simulate social login
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          id: Date.now(),
          name: `${provider} User`,
          email: `user@${provider.toLowerCase()}.com`,
          role: 'user'
        };

        setUser(mockUser);
        setIsAuthenticated(true);
        setIsAdmin(false);

        localStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('isAdmin', 'false');

        resolve(mockUser);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);

    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('isAdmin');
  };

  const signup = async (userData) => {
    // Simulate signup API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userData.email && userData.password && userData.name) {
          const newUser = {
            id: Date.now(),
            name: userData.name,
            email: userData.email,
            role: 'user'
          };

          setUser(newUser);
          setIsAuthenticated(true);
          setIsAdmin(false);

          localStorage.setItem('user', JSON.stringify(newUser));
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('isAdmin', 'false');

          resolve(newUser);
        } else {
          reject(new Error('Invalid signup data'));
        }
      }, 1000);
    });
  };

  const value = {
    user,
    isAuthenticated,
    isAdmin,
    login,
    adminLogin,
    socialLogin,
    logout,
    signup
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
