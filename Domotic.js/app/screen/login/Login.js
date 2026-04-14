import { ImageBackground } from 'react-native';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Login() {
  const fondo = require('../../../assets/images/fondo.png');

  return (
    <View style={styles.contenedorp}>
      <ImageBackground source={fondo} style={styles.fondo}>
        <Text style={styles.txthola}>HOLA</Text>
        <Text style={styles.txtlogin}>Iniciar sesión</Text>
        <View style={{ padding: 20 }}>
          <TextInput
            placeholder='Usuario'
            style={styles.input}
            keyboardType='default' />
          <TextInput
            placeholder='Contraseña'
            secureTextEntry
            style={styles.input}
            keyboardType='numeric' />

        </View>

        <View style={styles.contenedorbutton}>
          <View style={{ padding: 10 }}>
            <TouchableOpacity style={styles.btn1}>
              <Text style={styles.textobtn}>Login</Text></TouchableOpacity>
          </View>

          <View style={{ padding: 10 }}>
            <TouchableOpacity style={styles.btncre}>
              <Text style={styles.textobtn}>Crear cuenta</Text></TouchableOpacity>
          </View>

        </View>

      </ImageBackground>

    </View>

  )
}

const styles = StyleSheet.create({
  contenedorp: {
    backgroundColor: '#efeeee',
    flex: 1,
  },
  input: {
    backgroundColor: '#fff',
    marginTop: 15,
    borderRadius: 10,
    height: 39,
    padding: 9,
  },
  contenedorbutton: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  btn1: {
    backgroundColor: '#C469D8',
    padding: 13,
    borderRadius: 10,
    width: 140,
  },

  btncre: {
    backgroundColor: '#C469D8',
    padding: 13,
    borderRadius: 10,
    width: 140,
  },

  textobtn: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },

  txthola: {
    textAlign: 'center',
    fontSize: 50,
    fontWeight: 'bold',
    marginTop: 60,
    marginBottom: 20,
  },

  txtlogin: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20,
  },

  fondo: {
    flex: 1,
    justifyContent: 'center',
  }

})