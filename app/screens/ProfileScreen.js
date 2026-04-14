import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Text, List, Button } from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';

export default function ProfileScreen({ navigation }) {
  const { currentUser, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigation.replace('Login');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar.Image 
          size={100} 
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }} 
          style={styles.avatar}
        />
        <Text variant="headlineSmall" style={styles.name}>{currentUser ? currentUser.username : "Usuario"}</Text>
        <Text variant="bodyMedium" style={styles.email}>usuario@fastbite.com</Text>
      </View>

      <List.Section style={styles.section}>
        <List.Subheader>Cuenta</List.Subheader>
        <List.Item
          title="Mis Pedidos"
          left={(props) => <List.Icon {...props} icon="history" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => navigation.navigate('Carrito')}
        />
        <List.Item
          title="Métodos de Pago"
          left={(props) => <List.Icon {...props} icon="credit-card" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
        />
        <List.Item
          title="Direcciones Guardadas"
          left={(props) => <List.Icon {...props} icon="map-marker" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
        />
      </List.Section>

      <List.Section style={styles.section}>
        <List.Subheader>Ajustes</List.Subheader>
        <List.Item
          title="Notificaciones"
          left={(props) => <List.Icon {...props} icon="bell" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
        />
        <List.Item
          title="Ayuda y Soporte"
          left={(props) => <List.Icon {...props} icon="help-circle" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
        />
      </List.Section>

      <View style={styles.footer}>
        <Button 
          mode="outlined" 
          onPress={handleLogout} 
          style={styles.logoutButton}
          textColor="#ff6347"
        >
          Cerrar Sesión
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
  },
  avatar: {
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
  },
  name: {
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    color: '#666',
    marginTop: 4,
  },
  section: {
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 16,
    marginHorizontal: 12,
    overflow: 'hidden',
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
  },
  logoutButton: {
    borderColor: '#ff6347',
    borderRadius: 8,
  }
});
