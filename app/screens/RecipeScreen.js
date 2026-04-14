import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Text, Card, Searchbar, Chip } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function RecipeScreen({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Auto load some common recipes on start
  useEffect(() => {
    fetchRecipes('chicken');
  }, []);

  const translateSearchToEnglish = (query) => {
    const q = query.toLowerCase().trim();
    const map = {
      'pollo': 'chicken',
      'carne': 'beef',
      'res': 'beef',
      'arroz': 'rice',
      'pescado': 'fish',
      'cerdo': 'pork',
      'queso': 'cheese',
      'sopa': 'soup',
      'frijoles': 'beans',
      'torta': 'cake',
      'postre': 'dessert',
      'papas': 'potato',
      'ensalada': 'salad'
    };
    return map[q] || q; // If found in map, use english word. Else use the original.
  };

  const translateMealName = (name) => {
    let n = name.toLowerCase();
    if (n.includes('burger')) return 'Hamburguesa Casera';
    if (n.includes('chicken') || n.includes('pollo')) return 'Pollo Preparado';
    if (n.includes('pizza')) return 'Pizza Casera';
    if (n.includes('beef') || n.includes('steak')) return 'Guiso de Res';
    if (n.includes('pork') || n.includes('ribs')) return 'Platillo con Cerdo';
    if (n.includes('salmon') || n.includes('fish') || n.includes('seafood')) return 'Preparación de Mariscos';
    if (n.includes('pasta') || n.includes('spaghetti') || n.includes('penne')) return 'Pasta Tradicional';
    if (n.includes('salad')) return 'Ensalada Nutritiva';
    if (n.includes('soup') || n.includes('stew')) return 'Sopa/Crema Casera';
    if (n.includes('taco') || n.includes('fajita')) return 'Tacos/Fajitas Caseras';
    if (n.includes('rice')) return 'Platillo en base a Arroz';
    if (n.includes('cake') || n.includes('dessert') || n.includes('pie')) return 'Postre Hecho en Casa';
    
    return name; // En modo receta, está bien mostrar a veces el nombre original si no sabemos.
  };

  const fetchRecipes = async (queryParam) => {
    if (!queryParam) return;
    setLoading(true);
    const englishQuery = translateSearchToEnglish(queryParam);
    
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${englishQuery}`);
      const data = await response.json();
      
      const mappedRecipes = (data.meals || []).map(meal => ({
        ...meal,
        strMealOriginal: meal.strMeal,
        strMeal: translateMealName(meal.strMeal),
        isRecipe: true, // Flag to show ingredients in details
        recipeCost: Math.floor(Math.random() * 50) + 70 // Fake price for buying ingredients
      }));

      setRecipes(mappedRecipes);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmitSearch = () => {
    fetchRecipes(searchQuery);
  };

  const renderItem = ({ item }) => (
    <Card 
      style={styles.card} 
      onPress={() => navigation.navigate('FoodDetail', { food: item })}
    >
      <Card.Cover source={{ uri: item.strMealThumb }} style={styles.cardImage}/>
      <Card.Content style={styles.cardContent}>
        <Text variant="titleSmall" style={styles.title} numberOfLines={2}>
          {item.strMeal}
        </Text>
        <Text variant="bodySmall" style={styles.subtitle} numberOfLines={1}>
          ({item.strMealOriginal})
        </Text>
        <View style={styles.badgeContainer}>
            <Ionicons name="restaurant" size={12} color="#0288d1" style={{marginRight: 4}}/>
            <Text variant="bodySmall" style={styles.category}>Ver Receta</Text>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.headerTitle}>Cocina en Casa</Text>
        <Text variant="bodyMedium" style={{color: '#666', marginBottom: 12}}>
          Busca ingredientes principales (ej. Pollo, Arroz, Res)
        </Text>
        <Searchbar
          placeholder="¿Qué quieres cocinar hoy?"
          onChangeText={setSearchQuery}
          value={searchQuery}
          onSubmitEditing={onSubmitSearch}
          style={styles.searchbar}
          iconColor="#0288d1"
        />
        <View style={styles.chipRow}>
            <Chip style={styles.chip} onPress={() => fetchRecipes('pollo')} textStyle={styles.chipText}>Pollo</Chip>
            <Chip style={styles.chip} onPress={() => fetchRecipes('arroz')} textStyle={styles.chipText}>Arroz</Chip>
            <Chip style={styles.chip} onPress={() => fetchRecipes('pasta')} textStyle={styles.chipText}>Pasta</Chip>
            <Chip style={styles.chip} onPress={() => fetchRecipes('postre')} textStyle={styles.chipText}>Postre</Chip>
        </View>
      </View>

      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0288d1" />
        </View>
      ) : recipes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="search-outline" size={48} color="#ccc" />
          <Text variant="bodyLarge" style={{color: '#888', marginTop: 12}}>No se encontraron recetas.</Text>
        </View>
      ) : (
        <FlatList
          data={recipes}
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
  container: { flex: 1, backgroundColor: '#f0f4f8' },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 3,
    marginBottom: 8,
  },
  headerTitle: { fontWeight: 'bold', color: '#0288d1' },
  searchbar: { backgroundColor: '#f9f9f9', borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#eee' },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { backgroundColor: '#e1f5fe' },
  chipText: { color: '#0288d1', fontWeight: 'bold' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  list: { paddingHorizontal: 12, paddingBottom: 20, paddingTop: 10 },
  row: { justifyContent: 'space-between' },
  card: { width: '47%', marginBottom: 16, borderRadius: 16, backgroundColor: '#fff', elevation: 2 },
  cardImage: { height: 110 },
  cardContent: { padding: 12 },
  title: { fontWeight: 'bold', color: '#333' },
  subtitle: { color: '#999', fontSize: 10, marginBottom: 6 },
  badgeContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  category: { color: '#0288d1', fontWeight: '600' }
});
