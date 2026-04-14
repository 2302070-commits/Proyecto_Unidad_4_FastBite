import React, { useContext } from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper';
import { CartContext } from '../context/CartContext';

export default function CartScreen({ navigation }) {
  const { cart, removeFromCart, total } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Image 
          source={{uri: 'https://cdn-icons-png.flaticon.com/512/102/102661.png'}} 
          style={styles.emptyIcon}
        />
        <Text variant="titleLarge" style={styles.emptyText}>Tu carrito está vacío</Text>
        <Button mode="outlined" onPress={() => navigation.navigate('Menú')} style={styles.shopButton}>
          Ver Menú
        </Button>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.strMealThumb }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text variant="titleMedium" style={styles.itemName} numberOfLines={1}>{item.strMeal}</Text>
        <Text variant="bodyMedium" style={styles.itemPrice}>${item.price} x {item.quantity}</Text>
      </View>
      <IconButton
        icon="delete"
        iconColor="#ff3333"
        size={24}
        onPress={() => removeFromCart(item.idMeal)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.idMeal}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      
      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text variant="titleLarge" style={styles.totalText}>Total:</Text>
          <Text variant="titleLarge" style={styles.totalAmount}>${total.toFixed(2)}</Text>
        </View>
        <Button 
          mode="contained" 
          onPress={() => navigation.navigate('Checkout')} 
          style={styles.checkoutButton}
        >
          Proceder al Pago
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  emptyIcon: {
    width: 64,
    height: 64,
    opacity: 0.5,
    marginBottom: 16,
  },
  emptyText: {
    color: '#666',
    marginBottom: 24,
  },
  shopButton: {
    borderColor: '#ff6347',
  },
  list: {
    padding: 16,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontWeight: 'bold',
    color: '#333',
  },
  itemPrice: {
    color: '#ff6347',
    marginTop: 4,
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  totalText: {
    fontWeight: 'bold',
    color: '#333',
  },
  totalAmount: {
    fontWeight: 'bold',
    color: '#ff6347',
  },
  checkoutButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 8,
    borderRadius: 8,
  }
});
