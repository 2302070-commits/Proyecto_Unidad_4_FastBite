import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import MyNavigation from './app/MyNavegation';

export default function App() {
  return (
    <NavigationContainer>
    <PaperProvider>
      <MyNavigation />
    </PaperProvider>
    </NavigationContainer>
  );
}