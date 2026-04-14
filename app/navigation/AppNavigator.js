import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import TabNavigator from './TabNavigator';
import FoodDetailScreen from '../screens/FoodDetailScreen';
import CheckoutScreen from '../screens/CheckoutScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#f0f0f0',
        },
        headerTintColor: '#333',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="MainTabs" 
        component={TabNavigator} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="FoodDetail" 
        component={FoodDetailScreen} 
        options={{ title: 'Detalle de Comida' }} 
      />
      <Stack.Screen 
        name="Checkout" 
        component={CheckoutScreen} 
        options={{ title: 'Confirmar Pedido' }} 
      />
    </Stack.Navigator>
  );
}
