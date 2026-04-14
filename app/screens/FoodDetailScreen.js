import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, Button, Chip } from 'react-native-paper';
import { CartContext } from '../context/CartContext';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function FoodDetailScreen({ route, navigation }) {
  const { food } = route.params;
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(food);
    if(food.isRecipe) {
        alert('¡Ingredientes agregados al carrito de compra!');
    } else {
        alert('¡Agregado al pedido!');
    }
  };

  const [translatedInstructions, setTranslatedInstructions] = useState('');
  const [translatedIngredients, setTranslatedIngredients] = useState([]);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    const translateContent = async () => {
      setIsTranslating(true);
      try {
        // Translate Instructions
        const textToTranslate = food.isRecipe 
          ? food.strInstructions 
          : (food.strInstructions ? food.strInstructions.substring(0, 300) + '...' : 'Especialidad preparada y lista para comer.');
        
        const instRes = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=es&dt=t&q=${encodeURIComponent(textToTranslate)}`);
        const instData = await instRes.json();
        let finalInst = '';
        if (instData && instData[0]) {
            instData[0].forEach(item => { if(item[0]) finalInst += item[0]; });
        }
        setTranslatedInstructions(finalInst || textToTranslate);

        // Translate Ingredients if it's a recipe
        if (food.isRecipe) {
           const rawIngs = getRecipeIngredients();
           const transIngs = [];
           // We can translate all at once to save requests
           const combinedIngs = rawIngs.join('\n');
           const ingRes = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=es&dt=t&q=${encodeURIComponent(combinedIngs)}`);
           const ingData = await ingRes.json();
           
           if (ingData && ingData[0]) {
               let finalIngs = '';
               ingData[0].forEach(item => { if(item[0]) finalIngs += item[0]; });
               // Split back into array
               const splitIngs = finalIngs.split('\n').filter(i => i.trim() !== '');
               setTranslatedIngredients(splitIngs);
           } else {
               setTranslatedIngredients(rawIngs);
           }
        }
      } catch (e) {
        console.error("Translation fail", e);
        setTranslatedInstructions(food.strInstructions || 'Preparación lista. ¡Disfrútala!');
        setTranslatedIngredients(getRecipeIngredients());
      } finally {
        setIsTranslating(false);
      }
    };

    translateContent();
  }, [food.idMeal]);

  const getRecipeIngredients = () => {
    let ings = [];
    for(let i=1; i<=20; i++){
      const ingredient = food[`strIngredient${i}`];
      const measure = food[`strMeasure${i}`];
      if(ingredient && ingredient.trim() !== "") {
        ings.push(`• ${measure ? measure.trim() : ''} ${ingredient.trim()}`);
      }
    }
    return ings;
  };

  const ingredientsList = food.isRecipe ? translatedIngredients : [];

  return (
    <View style={styles.container}>
      <ScrollView bounces={false} style={styles.scroll}>
        <Image source={{ uri: food.strMealThumb }} style={styles.image} />
        <View style={styles.content}>
          <Text variant="headlineLarge" style={styles.title}>{food.strMeal}</Text>
          {food.strMealOriginal && (
              <Text variant="bodyMedium" style={styles.originalNameText}>({food.strMealOriginal})</Text>
          )}
          
          <View style={styles.badgeRow}>
              {food.isRescue ? (
                <Chip icon="leaf" style={styles.rescueChip} textStyle={{color: '#fff', fontWeight: 'bold'}}>Opción de Rescate</Chip>
              ) : food.isRecipe ? (
                <Chip icon="restaurant" style={styles.recipeChip} textStyle={{color: '#fff', fontWeight: 'bold'}}>Receta para Cocinar</Chip>
              ) : food.isDiet ? (
                <Chip icon="heart" style={styles.dietChip} textStyle={{color: '#fff', fontWeight: 'bold'}}>Ideal para Dieta {food.strCategory}</Chip>
              ) : (
                <Text variant="titleMedium" style={styles.categoryBadge}>{food.strCategory}</Text>
              )}
          </View>

          {/* MODO RESCATE */}
          {food.isRescue && (
            <View style={styles.priceContainer}>
                <Text style={styles.originalPrice}>Precio original: ${food.originalPrice}</Text>
                <Text style={styles.rescuePrice}>Precio de rescate: ${food.rescuePrice}</Text>
                <Text style={styles.ecoMessage}>🌱 Estás ahorrando dinero y previniendo la emisión de 2.5kg de CO2 al evitar el desperdicio de esta comida.</Text>
            </View>
          )}

          {/* MODO DIETA */}
          {food.isDiet && !food.isRecipe && (
            <View style={styles.nutritionContainer}>
                <Text variant="titleSmall" style={styles.sectionTitle}>VALOR NUTRICIONAL (Aprox.)</Text>
                <View style={styles.nutritionRow}>
                    <View style={styles.nutritionBox}><Text style={styles.nValue}>350</Text><Text style={styles.nLabel}>kcal</Text></View>
                    <View style={styles.nutritionBox}><Text style={styles.nValue}>15g</Text><Text style={styles.nLabel}>Grasas</Text></View>
                    <View style={styles.nutritionBox}><Text style={styles.nValue}>45g</Text><Text style={styles.nLabel}>Carbs</Text></View>
                    <View style={styles.nutritionBox}><Text style={styles.nValue}>20g</Text><Text style={styles.nLabel}>Proteína</Text></View>
                </View>
                <View style={styles.dietTags}>
                    <Chip style={{marginRight: 8}}>Alto en fibra</Chip>
                    <Chip>Bajo en sodio</Chip>
                </View>
            </View>
          )}

          {/* MODO RECETA */}
          {food.isRecipe && (
            <View style={styles.recipeIngredientsContainer}>
                <Text variant="titleSmall" style={styles.sectionTitle}>INGREDIENTES NECESARIOS</Text>
                {isTranslating ? (
                  <Text style={{color: '#0288d1'}}>Traduciendo ingredientes al español...</Text>
                ) : (
                  <View style={styles.ingredientsBox}>
                      {ingredientsList.map((ing, idx) => (
                          <Text key={idx} style={styles.ingredientText}>{ing}</Text>
                      ))}
                  </View>
                )}
            </View>
          )}

          {(!food.isDiet && !food.isRecipe) && (
            <View style={styles.section}>
              <Text variant="titleSmall" style={styles.sectionTitle}>INGREDIENTES / TAGS</Text>
              <Text variant="bodyLarge" style={styles.tags}>
                {food.strTags ? food.strTags.split(',').join(' • ') : 'Delicioso y fresco'}
              </Text>
            </View>
          )}

          <View style={styles.section}>
            <Text variant="titleSmall" style={styles.sectionTitle}>{food.isRecipe ? 'INSTRUCCIONES DE PREPARACIÓN' : 'PREPARACIÓN'}</Text>
            {isTranslating ? (
                <Text style={{color: '#888', fontStyle: 'italic'}}>Traduciendo receta...</Text>
            ) : (
                <Text variant="bodyLarge" style={styles.instructions}>
                  {translatedInstructions}
                </Text>
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button 
          mode="contained" 
          onPress={handleAddToCart} 
          style={[
            styles.addButton, 
            (food.isRescue || food.isDiet) && !food.isRecipe && {backgroundColor: '#2e7d32'},
            food.isRecipe && {backgroundColor: '#0288d1'}
          ]}
          contentStyle={styles.addButtonContent}
          labelStyle={styles.addButtonLabel}
        >
          {food.isRescue ? `Añadir Platillo ($${food.rescuePrice})` 
            : food.isRecipe ? `Comprar Ingredientes ($${food.recipeCost})` 
            : 'Añadir al Pedido'}
        </Button>
        <Button 
          mode="outlined" 
          onPress={() => navigation.navigate('MainTabs', { screen: 'Carrito' })} 
          style={styles.cartButton}
          contentStyle={styles.cartButtonContent}
          labelStyle={[
              styles.cartButtonLabel, 
              (food.isRescue || food.isDiet) && !food.isRecipe && {color: '#2e7d32'},
              food.isRecipe && {color: '#0288d1', borderColor: '#0288d1'}
          ]}
        >
          Ver el Carrito
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  scroll: { flex: 1 },
  image: { width: '100%', height: 380, borderBottomLeftRadius: 32, borderBottomRightRadius: 32 },
  content: { paddingHorizontal: 24, paddingTop: 32, paddingBottom: 40 },
  title: { fontWeight: '800', color: '#111', marginBottom: 4, letterSpacing: -0.5 },
  originalNameText: { color: '#888', fontStyle: 'italic', marginBottom: 12 },
  badgeRow: { marginBottom: 24, marginTop: 8 },
  rescueChip: { backgroundColor: '#f57c00' },
  dietChip: { backgroundColor: '#2e7d32' },
  recipeChip: { backgroundColor: '#0288d1' },
  categoryBadge: { color: '#ff6347', fontWeight: '600', marginBottom: 32 },
  section: { marginBottom: 28 },
  sectionTitle: { fontWeight: '700', color: '#888', letterSpacing: 1.2, marginBottom: 12 },
  tags: { color: '#333', lineHeight: 24 },
  instructions: { color: '#444', lineHeight: 26 },
  priceContainer: { backgroundColor: '#fff3e0', padding: 16, borderRadius: 16, marginBottom: 28 },
  originalPrice: { textDecorationLine: 'line-through', color: '#888', fontSize: 14, marginBottom: 4 },
  rescuePrice: { fontSize: 24, fontWeight: 'bold', color: '#e65100', marginBottom: 8 },
  ecoMessage: { color: '#666', fontStyle: 'italic', fontSize: 13, lineHeight: 18 },
  nutritionContainer: { backgroundColor: '#e8f5e9', padding: 16, borderRadius: 16, marginBottom: 28 },
  nutritionRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  nutritionBox: { alignItems: 'center' },
  nValue: { fontSize: 18, fontWeight: 'bold', color: '#2e7d32' },
  nLabel: { fontSize: 12, color: '#555' },
  dietTags: { flexDirection: 'row' },
  recipeIngredientsContainer: { backgroundColor: '#e1f5fe', padding: 16, borderRadius: 16, marginBottom: 28 },
  ingredientsBox: { marginLeft: 8 },
  ingredientText: { color: '#01579b', fontSize: 16, marginBottom: 6, lineHeight: 22 },
  footer: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 36, backgroundColor: '#ffffff' },
  addButton: { backgroundColor: '#111', borderRadius: 30, elevation: 0, marginBottom: 12 },
  addButtonContent: { paddingVertical: 10 },
  addButtonLabel: { fontSize: 16, fontWeight: '700', letterSpacing: 0.5 },
  cartButton: { borderColor: '#111', borderWidth: 2, borderRadius: 30, elevation: 0 },
  cartButtonContent: { paddingVertical: 10 },
  cartButtonLabel: { fontSize: 16, fontWeight: '700', letterSpacing: 0.5, color: '#111' }
});
