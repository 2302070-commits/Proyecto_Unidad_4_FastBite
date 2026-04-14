import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]); 
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('currentUser');
        const storedUsers = await AsyncStorage.getItem('users');
        if (storedUsers) setUsers(JSON.parse(storedUsers));
        if (storedUser) setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error loading auth data', error);
      } finally {
        setIsAuthLoaded(true);
      }
    };
    loadAuthData();
  }, []);

  const login = async (username, password) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      await AsyncStorage.setItem('currentUser', JSON.stringify(user));
      return { success: true };
    }
    return { success: false, error: 'Usuario o contraseña incorrectos, o usuario no existe.' };
  };

  const register = async (username, password) => {
    if (users.find(u => u.username === username)) {
      return { success: false, error: 'Este usuario ya existe.' };
    }
    const newUser = { username, password };
    const newUsersList = [...users, newUser];
    setUsers(newUsersList);
    setCurrentUser(newUser); 
    
    await AsyncStorage.setItem('users', JSON.stringify(newUsersList));
    await AsyncStorage.setItem('currentUser', JSON.stringify(newUser));
    return { success: true };
  };

  const logout = async () => {
    setCurrentUser(null);
    await AsyncStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, isAuthLoaded }}>
      {children}
    </AuthContext.Provider>
  );
};
