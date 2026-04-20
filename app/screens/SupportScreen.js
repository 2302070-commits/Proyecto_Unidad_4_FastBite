import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, List, Button } from 'react-native-paper';

export default function SupportScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Text variant="titleLarge" style={styles.title}>¿En qué podemos ayudarte?</Text>
        
        <List.Section style={styles.section}>
          <List.Subheader>Preguntas Frecuentes</List.Subheader>
          <List.Accordion
            title="¿Cómo funciona el rescate de comida?"
            left={props => <List.Icon {...props} icon="help-circle-outline" />}>
            <List.Item 
                title="Consiste en comprar comida en perfecto estado a un precio menor antes de que el restaurante cierre." 
                titleNumberOfLines={4} 
            />
          </List.Accordion>

          <List.Accordion
            title="¿Cuánto tardan los envíos?"
            left={props => <List.Icon {...props} icon="clock-outline" />}>
            <List.Item 
                title="Generalmente los envíos tardan entre 25 y 45 minutos dependiendo de la distancia y el clima." 
                titleNumberOfLines={4} 
            />
          </List.Accordion>

          <List.Accordion
            title="Tuve un problema con mi pago"
            left={props => <List.Icon {...props} icon="credit-card-outline" />}>
            <List.Item 
                title="Por favor, contacta a soporte directamente usando el botón de abajo para revisar tu cobro de inmediato." 
                titleNumberOfLines={4} 
            />
          </List.Accordion>
        </List.Section>

        <View style={styles.contactCard}>
          <Text variant="titleMedium" style={{fontWeight: 'bold', marginBottom: 8}}>Contacto Directo</Text>
          <Text variant="bodyMedium" style={{marginBottom: 16, color: '#555'}}>Nuestro equipo de soporte está disponible 24/7 para ayudarte con cualquier inconveniente con tus pedidos.</Text>
          <Button icon="email" mode="contained" onPress={() => alert('Abriendo correo para soporte@fastbite.com...')} style={{backgroundColor: '#ff6347', marginBottom: 12}}>
            Enviar Correo
          </Button>
          <Button icon="phone" mode="outlined" onPress={() => alert('Llamando a atención al cliente (01-800-FASTBITE)...')} style={{borderColor: '#ff6347'}} textColor="#ff6347">
            Llamar a Soporte
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 8,
    color: '#333'
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
  },
  contactCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 40,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  }
});
