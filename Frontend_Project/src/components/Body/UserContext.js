import React, { createContext, useContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const login = (userData) => {
    setUserData(userData); // Set complete user data object
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUserData(null);
    localStorage.removeItem('user');
  };

  // Initialize userData from localStorage if available on first load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ userData, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
