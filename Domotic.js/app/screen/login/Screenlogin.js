import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';

export default function ScreenLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const login = () => {
  if (email === '' || password === '') {
    Alert.alert('Error', 'Por favor, ingresa tu email y contraseña.');
  } else {
    if (email === 'admin' && password === '123') {
      Alert.alert("Welcome", "Cargando...");
    } else {
      Alert.alert('Error', 'Email o contraseña incorrectos.');
    }
  }
}

  const crearCuenta = () => {
    Alert.alert('Crear cuenta', 'Función en construcción...');
  };

  return (
    <View style={styles.container}>
      <Text variant="displayMedium" style={styles.title}>HOLA</Text>
      <Text variant="displaySmall" style={styles.subtitle}>Login</Text>

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        mode="flat"
        keyboardType="email-address"
      />

      <TextInput
        label="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        right={<TextInput.Icon icon="eye" />}
        style={styles.input}
        mode="flat"
      />

      <Button 
        mode="contained" 
        icon="account" 
        onPress={login} 
        style={styles.button}
      >
        Login
      </Button>

      <Button 
        mode="outlined" 
        icon="account-plus" 
        onPress={crearCuenta} 
        style={styles.button}
      >
        Crear cuenta
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',     
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    marginVertical: 10,
  },
  button: {
    width: '90%',
    marginTop: 10,
  },
});