import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Text, Card, Searchbar } from 'react-native-paper';

export default function HomeScreen({ navigation }) {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchMeals();
  }, []);

  const translateCategory = (cat) => {
    const map = {
      'Beef': 'Carne', 'Chicken': 'Pollo', 'Dessert': 'Postre', 'Lamb': 'Cordero', 'Miscellaneous': 'Varios', 
      'Pasta': 'Pasta', 'Pork': 'Cerdo', 'Seafood': 'Mariscos', 'Side': 'Acompañamiento', 'Starter': 'Entrada', 
      'Vegan': 'Vegano', 'Vegetarian': 'Vegetariano', 'Breakfast': 'Desayuno', 'Goat': 'Chivo'
    };
    return map[cat] || cat;
  };

  const translateMealName = (name) => {
    let n = name.toLowerCase();
    if (n.includes('burger')) return 'Hamburguesa Artesanal Gourmet';
    if (n.includes('chicken') || n.includes('pollo')) return 'Pechuga a la Parrilla';
    if (n.includes('pizza')) return 'Pizza Rústica Italiana';
    if (n.includes('beef') || n.includes('steak')) return 'Corte de Res Premium';
    if (n.includes('pork') || n.includes('ribs') || n.includes('cerdo')) return 'Costillas Horneadas';
    if (n.includes('salmon') || n.includes('fish') || n.includes('seafood')) return 'Filete Fresco del Día';
    if (n.includes('pasta') || n.includes('spaghetti') || n.includes('penne')) return 'Delicia Italiana Casera';
    if (n.includes('salad')) return 'Ensalada Fresca de Temporada';
    if (n.includes('soup') || n.includes('stew')) return 'Sopa Casera Tradicional';
    if (n.includes('taco') || n.includes('fajita')) return 'Tacos de Guisado Casero';
    if (n.includes('curry')) return 'Platillo Especiado Tradicional';
    if (n.includes('pie')) return 'Tarta Rústica Horneada';
    if (n.includes('cake') || n.includes('dessert') || n.includes('choco')) return 'Postre Especial del Chef';
    
    return 'Platillo Local Sorpresa';
  };

  const fetchMeals = async (query = 'burger') => {
    setLoading(true);
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await response.json();
      
      const translatedMeals = (data.meals || []).map(meal => {
        const originalPrice = Math.floor(Math.random() * 80) + 120; // 120 - 200
        const rescuePrice = Math.floor(originalPrice * 0.35); // Big discount
        
        return {
          ...meal,
          strMeal: translateMealName(meal.strMeal),
          strCategory: translateCategory(meal.strCategory),
          strInstructions: 'Porción excedente en perfecto estado rescatada de restaurantes o panaderías locales. ¡Sálvala antes de que cierre el local!',
          originalPrice,
          rescuePrice,
          isRescue: true
        };
      });

      setFoods(translatedMeals);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onChangeSearch = query => {
    setSearchQuery(query);
    fetchMeals(query);
  };

  const renderItem = ({ item }) => (
    <Card 
      style={styles.card} 
      onPress={() => navigation.navigate('FoodDetail', { food: item })}
    >
      <Card.Cover source={{ uri: item.strMealThumb }} style={styles.cardImage}/>
      <Card.Content style={styles.cardContent}>
        <Text variant="titleMedium" style={styles.title} numberOfLines={1}>{item.strMeal}</Text>
        <Text variant="bodySmall" style={styles.category}>{item.strCategory}</Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.originalPrice}>${item.originalPrice}</Text>
          <Text style={styles.rescuePrice}>${item.rescuePrice}</Text>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.headerTitle}>¿Qué comida salvarás hoy?</Text>
        <Searchbar
          placeholder="Busca por ingrediente..."
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchbar}
          iconColor="#2e7d32"
        />
      </View>

      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#2e7d32" />
        </View>
      ) : foods.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text variant="bodyLarge">No se encontraron comidas.</Text>
        </View>
      ) : (
        <FlatList
          data={foods}
          keyExtractor={(item) => item.idMeal}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          numColumns={2}
          columnWrapperStyle={styles.row}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 8,
  },
  headerTitle: {
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  searchbar: {
    backgroundColor: '#fafafa',
    borderRadius: 12,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    width: '47%',
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  cardImage: {
    height: 120,
  },
  cardContent: {
    padding: 12,
  },
  title: {
    fontWeight: 'bold',
    color: '#333',
  },
  category: {
    color: '#888',
    marginTop: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: '#aaa',
    fontSize: 12,
  },
  rescuePrice: {
    color: '#2e7d32',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
