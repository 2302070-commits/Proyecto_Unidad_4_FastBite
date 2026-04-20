import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Text, Card, Searchbar } from 'react-native-paper';
import { translateBulkTexts } from '../utils/translator';

export default function MenuScreen({ navigation }) {
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

  const fetchMeals = async (query = 'chicken') => {
    setLoading(true);
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await response.json();
      
      const rawMeals = data.meals || [];
      const mealNames = rawMeals.map(m => m.strMeal);
      const translatedNames = await translateBulkTexts(mealNames);

      const translatedMeals = rawMeals.map((meal, index) => {
        const price = Math.floor(Math.random() * 80) + 100; // 100 - 180
        
        return {
          ...meal,
          strMealOriginal: meal.strMeal,
          strMeal: translatedNames[index] || meal.strMeal,
          strCategory: translateCategory(meal.strCategory),
          strInstructions: 'Delicioso platillo preparado al momento con los mejores ingredientes, listo para que lo disfrutes.',
          price,
          isNormal: true
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
          <Text style={styles.price}>${item.price}</Text>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.headerTitle}>Nuestro Menú</Text>
        <Searchbar
          placeholder="Busca por platillo..."
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchbar}
          iconColor="#ff9800"
        />
      </View>

      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#ff9800" />
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
    marginTop: 8,
  },
  price: {
    color: '#ff9800',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
