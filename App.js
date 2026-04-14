import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './app/navigation/AppNavigator';
import { CartProvider } from './app/context/CartContext';
import { AuthProvider } from './app/context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <PaperProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </PaperProvider>
      </CartProvider>
    </AuthProvider>
  );
}