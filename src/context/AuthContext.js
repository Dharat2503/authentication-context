


import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  const signup = (username, email, password) => {
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return false;
    }

    const newUser = { username, email, password };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    console.log("User signed up:", newUser); 
    return true;
  };

  const login = (email, password) => {
    const existingUser = users.find(user => user.email === email && user.password === password);
    if (existingUser) {
      // Set flag in local storage indicating the user is logged in
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
    }
    return existingUser;
  };

  const logout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false);
    // Additional cleanup or actions if needed
  };

  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ users, isLoggedIn, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
