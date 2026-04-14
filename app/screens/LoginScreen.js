import React, { useState, useContext } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Image, ActivityIndicator } from 'react-native';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';

import { AuthContext } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const { login, register, currentUser, isAuthLoaded } = useContext(AuthContext);
  const theme = useTheme();

  React.useEffect(() => {
    if (isAuthLoaded && currentUser) {
      navigation.replace('MainTabs');
    }
  }, [isAuthLoaded, currentUser, navigation]);

  const handleAuth = () => {
    if (username.trim() === '' || password.trim() === '') {
      setError('Por favor, ingresa tu usuario y contraseña.');
      return;
    }
    
    setError('');
    let result;
    if (isRegistering) {
      result = register(username.trim(), password.trim());
    } else {
      result = login(username.trim(), password.trim());
    }

    if (result.success) {
      navigation.replace('MainTabs');
    } else {
      setError(result.error);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {!isAuthLoaded ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#ff6347" />
          <Text style={{marginTop: 10, color: '#666'}}>Cargando sesión...</Text>
        </View>
      ) : (
      <View style={styles.content}>
        <Image 
          source={{uri: 'https://cdn-icons-png.flaticon.com/512/3014/3014498.png'}} 
          style={styles.logo}
        />
        <Text variant="headlineMedium" style={styles.title}>FastBite</Text>
        <Text variant="bodyMedium" style={styles.subtitle}>Comida rápida, sabor real.</Text>

        <TextInput
          label="Usuario"
          mode="outlined"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            setError('');
          }}
          style={styles.input}
          outlineColor={theme.colors.outline}
          activeOutlineColor={theme.colors.primary}
        />

        <TextInput
          label="Contraseña"
          mode="outlined"
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setError('');
          }}
          style={styles.input}
          outlineColor={theme.colors.outline}
          activeOutlineColor={theme.colors.primary}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Button 
          mode="contained" 
          onPress={handleAuth} 
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          {isRegistering ? "Crear Cuenta e Ingresar" : "Entrar al Menú"}
        </Button>
        
        <Button 
          mode="text" 
          onPress={() => {
            setIsRegistering(!isRegistering);
            setError('');
          }} 
          style={styles.toggleButton}
          textColor={theme.colors.primary}
        >
          {isRegistering ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Crea una aquí"}
        </Button>
      </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#ff6347',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 32,
    color: '#666',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fafafa',
  },
  button: {
    marginTop: 8,
    borderRadius: 8,
    backgroundColor: '#ff6347',
  },
  buttonContent: {
    paddingVertical: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  }
});
