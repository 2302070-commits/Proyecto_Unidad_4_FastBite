import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Badge } from 'react-native-paper';
import { View } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import MenuScreen from '../screens/MenuScreen';
import DietScreen from '../screens/DietScreen';
import RecipeScreen from '../screens/RecipeScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { CartContext } from '../context/CartContext';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#2e7d32', // Green theme for eco/health
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 10,
          backgroundColor: '#fff',
          height: 60,
          paddingBottom: 8,
        }
      }}
    >
      <Tab.Screen 
        name="Rescate" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="pricetag" size={size} color={color} />
          ),
        }} 
      />

      <Tab.Screen 
        name="Menú" 
        component={MenuScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="fast-food" size={size} color={color} />
          ),
          tabBarActiveTintColor: '#ff9800',
        }} 
      />
      
      <Tab.Screen 
        name="Dietas" 
        component={DietScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }} 
      />

      <Tab.Screen 
        name="Recetas" 
        component={RecipeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" size={size} color={color} />
          ),
          tabBarActiveTintColor: '#0288d1', // Specific override for Recipes tab
        }} 
      />

      <Tab.Screen 
        name="Carrito" 
        component={CartScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <View>
              <Ionicons name="cart" size={size} color={color} />
              {totalItems > 0 && (
                <Badge style={{ position: 'absolute', top: -5, right: -10, backgroundColor: '#2e7d32' }}>
                  {totalItems}
                </Badge>
              )}
            </View>
          ),
        }} 
      />

      <Tab.Screen 
        name="Perfil" 
        component={ProfileScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
}
