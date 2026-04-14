import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { CartContext } from '../context/CartContext';

export default function CheckoutScreen({ navigation }) {
  const { total, clearCart } = useContext(CartContext);

  const handleCheckout = () => {
    clearCart();
    alert('¡Pedido confirmado! Tu comida está en camino.');
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.title}>Confirmar Pedido</Text>
          <Text variant="bodyLarge" style={styles.amount}>
            Total a pagar: ${total.toFixed(2)}
          </Text>
          
          <Text variant="bodyMedium" style={styles.info}>
            El pago se realizará contra entrega en efectivo o tarjeta. Tiempo estimado: 25 - 35 minutos.
          </Text>

          <Button 
            mode="contained" 
            onPress={handleCheckout} 
            style={styles.button}
            icon="check-circle"
          >
            Confirmar Pedido
          </Button>

          <Button 
            mode="outlined" 
            onPress={() => navigation.goBack()} 
            style={styles.backButton}
          >
            Volver al Carrito
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 20,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  amount: {
    textAlign: 'center',
    fontSize: 24,
    color: '#ff6347',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  info: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#ff6347',
    marginBottom: 12,
    borderRadius: 8,
  },
  backButton: {
    borderRadius: 8,
    borderColor: '#ff6347',
  }
});
