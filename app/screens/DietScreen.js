import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Text, Card, Chip } from 'react-native-paper';
import { translateBulkTexts } from '../utils/translator';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function DietScreen({ navigation }) {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('Vegan');

  useEffect(() => {
    fetchDietMeals(activeFilter);
  }, [activeFilter]);

  const fetchDietMeals = async (category) => {
    setLoading(true);
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const data = await response.json();
      
      const rawMeals = data.meals || [];
      const mealNames = rawMeals.map(m => m.strMeal);
      const translatedNames = await translateBulkTexts(mealNames);

      const translatedMeals = rawMeals.map((meal, index) => ({
        ...meal,
        strMealOriginal: meal.strMeal,
        strMeal: translatedNames[index] || meal.strMeal,
        strCategory: category === 'Vegan' ? 'Vegano' : 'Vegetariano',
        isDiet: true, // Flag to show diet info in detail screen
      }));

      setFoods(translatedMeals);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <Card 
      style={styles.card} 
      onPress={() => navigation.navigate('FoodDetail', { food: item })}
    >
      <Card.Cover source={{ uri: item.strMealThumb }} style={styles.cardImage}/>
      <Card.Content style={styles.cardContent}>
        <Text variant="titleMedium" style={styles.title} numberOfLines={1}>{item.strMeal}</Text>
        <View style={styles.badgeContainer}>
            <Ionicons name="leaf" size={12} color="#2e7d32" style={{marginRight: 4}}/>
            <Text variant="bodySmall" style={styles.category}>{item.strCategory}</Text>
        </View>
        <Text variant="bodySmall" style={styles.caloriesText}>≈ 350 kcal</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.headerTitle}>Alimentación Consciente</Text>
        <Text variant="bodyMedium" style={{color: '#666', marginBottom: 12}}>Pensado para tu estilo de vida</Text>
        <View style={styles.filterContainer}>
            <Chip 
                selected={activeFilter === 'Vegan'} 
                onPress={() => setActiveFilter('Vegan')}
                style={activeFilter === 'Vegan' ? styles.chipActive : styles.chipInactive}
                textStyle={activeFilter === 'Vegan' ? styles.chipTextActive : styles.chipTextInactive}
            >Vegano</Chip>
            <Chip 
                selected={activeFilter === 'Vegetarian'} 
                onPress={() => setActiveFilter('Vegetarian')}
                style={activeFilter === 'Vegetarian' ? styles.chipActive : styles.chipInactive}
                textStyle={activeFilter === 'Vegetarian' ? styles.chipTextActive : styles.chipTextInactive}
            >Vegetariano</Chip>
        </View>
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
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 8,
  },
  headerTitle: { fontWeight: 'bold', color: '#2e7d32' },
  filterContainer: { flexDirection: 'row', gap: 8 },
  chipActive: { backgroundColor: '#2e7d32' },
  chipInactive: { backgroundColor: '#e0e0e0' },
  chipTextActive: { color: '#fff', fontWeight: 'bold' },
  chipTextInactive: { color: '#555' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  list: { paddingHorizontal: 12, paddingBottom: 20, paddingTop: 10 },
  row: { justifyContent: 'space-between' },
  card: {
    width: '47%',
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: '#fff',
    elevation: 2,
  },
  cardImage: { height: 120 },
  cardContent: { padding: 12 },
  title: { fontWeight: 'bold', color: '#333', marginBottom: 4 },
  badgeContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  category: { color: '#2e7d32', fontWeight: '600' },
  caloriesText: { color: '#888', marginTop: 6, fontSize: 11, fontWeight: 'bold' }
});
