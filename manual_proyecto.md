# 📱 MANUAL DE PROCESO DE CREACIÓN — FastBite

---

## PORTADA

**Nombre del Proyecto:** FastBite  
**Materia:** Desarrollo Móvil  
**Unidades:** 3 y 4  
**Fecha de Entrega:** 14 de Abril de 2026  
**Alumno:** Henrique  
**Número de Matrícula:** 2302070  
**Repositorio GitHub:** https://github.com/2302070-commits/Proyecto_Unidad_4_FastBite

---

## ÍNDICE

1. Introducción
2. Problemática detectada
3. Propuesta de solución (la App)
4. Diseño en Figma — Colores y Tipografía
5. Diagrama de Base de Datos
6. Arquitectura del Proyecto
7. Tecnologías y librerías utilizadas
8. Navegación (Stacks y Tabs)
9. Funcionalidades implementadas
10. Proceso de creación del APK
11. Conclusión

---

## 1. INTRODUCCIÓN

FastBite es una aplicación móvil desarrollada en **React Native** con **Expo** que busca atacar dos problemáticas sociales urgentes: el desperdicio alimentario en restaurantes locales y la dificultad que tienen personas con dietas especiales (veganos, vegetarianos, intolerantes) para encontrar información confiable sobre la comida que consumen. 

La aplicación integra consumo de API externa en tiempo real, un sistema de recetas con traducción automática al español, un carrito de compras persistente y autenticación local de usuarios mediante AsyncStorage.

---

## 2. PROBLEMÁTICA DETECTADA

### Problemática 1 — Despercidio de Alimentos
Según la FAO (Organización de las Naciones Unidas para la Alimentación y la Agricultura), México desperdicia aproximadamente **20.4 millones de toneladas de alimentos al año**, muchos de los cuales provienen de restaurantes y panaderías que no logran vender toda su producción diaria.  

Las plataformas comerciales como Rappi o UberEats no ofrecen ningún mecanismo para que los negocios puedan ofrecer esa comida excedente a menor precio. Los negocios pequeños prefieren tirar la comida antes de regalarla porque no tienen una plataforma accesible.

### Problemática 2 — Alimentación con Dietas Especiales
Las personas con intolerancias alimentarias (gluten, lactosa), veganos o personas en búsqueda de recetas saludables tienen grandes dificultades para encontrar información detallada, confiable y en español sobre los valores nutricionales y la preparación de sus alimentos.

---

## 3. PROPUESTA DE SOLUCIÓN

**FastBite** resuelve ambas problemáticas en una sola aplicación con tres pilares:

| Módulo | Descripción |
|---|---|
| 🌱 **Rescate** | Platillos excedentes de restaurantes locales a precios reducidos (hasta 65% de descuento), con información del impacto ambiental al elegir un platillo "rescatado". |
| ❤️ **Dietas** | Catálogo de platillos Veganos y Vegetarianos con valor nutricional estimado y etiquetas especializadas ("Bajo en sodio", "Alto en fibra"). |
| 📖 **Recetas** | Buscador inteligente con traducción al español. El usuario busca un ingrediente en español y la app muestra recetas con ingredientes detallados e instrucciones paso a paso. |

---

## 4. DISEÑO — COLORES Y TIPOGRAFÍA

### Paleta de Colores

| Nombre | Uso | Hexadecimal |
|---|---|---|
| Verde Bosque | Color principal (Rescate/Dietas) | `#2e7d32` |
| Azul Oceáno | Sección de Recetas | `#0288d1` |
| Naranja Rescate | Chips y badges de descuento | `#f57c00` |
| Naranja Rojo | Login y Carrito | `#ff6347` |
| Negro Profundo | Botones principales | `#111111` |
| Gris Claro | Fondo de pantallas | `#f5f5f5` |
| Blanco | Tarjetas y headers | `#ffffff` |
| Gris Texto | Texto secundario | `#666666` |

### Tipografía
- **Familia:** System default / Roboto (React Native Paper)
- **Tamaños:** headlineMedium (22px), titleMedium (16px), bodySmall (12px)
- **Pesos:** Bold `800` para títulos, Regular para cuerpo

---

## 5. DIAGRAMA DE BASE DE DATOS

La aplicación utiliza **dos mecanismos de datos**:

### API Externa (TheMealDB)
```
TheMealDB API
├── /search.php?s={query}   → Búsqueda de platillos por nombre
└── /filter.php?c={cat}     → Filtrado por categoría (Vegan, Vegetarian)

Respuesta por platillo:
├── idMeal          → ID único
├── strMeal         → Nombre
├── strMealThumb    → URL de imagen
├── strCategory     → Categoría
├── strInstructions → Instrucciones de preparación
├── strIngredient1..20 → Ingredientes
└── strMeasure1..20    → Medidas por ingrediente
```

### Base de Datos Local (AsyncStorage)
```
AsyncStorage (Almacenamiento Local del Dispositivo)
├── "users"         → Array JSON de usuarios registrados
│   └── { username: string, password: string }
├── "currentUser"   → Objeto JSON del usuario activo
│   └── { username: string, password: string }
└── "cart"          → Array JSON del carrito de compras
    └── { idMeal, strMeal, strMealThumb, quantity, price, 
          isRescue?, isDiet?, isRecipe?, originalPrice?, rescuePrice? }
```

---

## 6. ARQUITECTURA DEL PROYECTO

```
Domotic.js/
├── App.js                          # Punto de entrada, Providers
├── app/
│   ├── context/
│   │   ├── AuthContext.js          # Autenticación con AsyncStorage
│   │   └── CartContext.js          # Carrito con AsyncStorage
│   ├── navigation/
│   │   ├── AppNavigator.js         # Stack Navigator principal
│   │   └── TabNavigator.js         # 5 Pestañas del menú inferior
│   └── screens/
│       ├── LoginScreen.js          # Login / Registro
│       ├── HomeScreen.js           # Módulo Rescate
│       ├── DietScreen.js           # Módulo Dietas
│       ├── RecipeScreen.js         # Módulo Recetas
│       ├── FoodDetailScreen.js     # Detalle dinámico (3 modos)
│       ├── CartScreen.js           # Carrito de compras
│       ├── CheckoutScreen.js       # Pantalla de pago
│       └── ProfileScreen.js        # Perfil de usuario
```

---

## 7. TECNOLOGÍAS Y LIBRERÍAS

| Librería | Versión | Uso |
|---|---|---|
| React Native | 0.81.5 | Framework base de la app |
| Expo | ~54.0.33 | Entorno de desarrollo |
| @react-navigation/stack | ^7.7.1 | Stack Navigation (4 pantallas) |
| @react-navigation/bottom-tabs | ^7.13.0 | Tab Navigation (5 pestañas) |
| react-native-paper | ^5.15.0 | Componentes UI Material Design |
| @react-native-async-storage | SDK 54 | Base de datos local persistente |
| TheMealDB API | v1 | API pública de recetas y comidas |
| Google Translate API | gtx | Traducción automática al español |

---

## 8. NAVEGACIÓN (STACKS Y TABS)

### Stack Navigator (AppNavigator.js)
```
Stack.Navigator (initialRoute: "Login")
├── Screen: Login          → LoginScreen.js
├── Screen: MainTabs       → TabNavigator (anidado)
├── Screen: FoodDetail     → FoodDetailScreen.js
└── Screen: Checkout       → CheckoutScreen.js
```

### Tab Navigator (TabNavigator.js)
```
Tab.Navigator (5 pestañas)
├── Tab: Rescate   🏷️  → HomeScreen.js
├── Tab: Dietas    ❤️  → DietScreen.js
├── Tab: Recetas   📖  → RecipeScreen.js
├── Tab: Carrito   🛒  → CartScreen.js
└── Tab: Perfil    👤  → ProfileScreen.js
```

> El proyecto cumple con el requisito de **mínimo 3 Tabs y 4 Stacks** del profesor.

---

## 9. FUNCIONALIDADES IMPLEMENTADAS

| Concepto | Dónde se aplica |
|---|---|
| **Props** | `navigation`, `route`, `food` pasados entre pantallas |
| **useState** | Manejo de estado local en búsquedas, filtros y formularios |
| **useEffect** | Carga de datos al montar pantalla (API calls) y persistencia |
| **useContext** | `CartContext` y `AuthContext` compartido en toda la app |
| **map()** | Renderizado de listas de platillos y ingredientes |
| **if/else / ternarios** | Renderizado condicional por tipo de platillo |
| **Imágenes** | Cargadas desde URL de la API en cada tarjeta y detalle |
| **Controles Input** | `TextInput`, `Searchbar`, `Chip` en Login y búsquedas |
| **UI/UX** | Tarjetas redondeadas, sombras, badges, colores por sección |
| **API REST** | Consumo de `TheMealDB` con `fetch()` y `useEffect` |
| **AsyncStorage** | Sesión persistente y carrito que sobrevive el cierre de la app |
| **Traducción** | Google Translate API integrada para ingredientes e instrucciones |

---

## 10. PROCESO DE CREACIÓN DEL APK

### Pre-requisitos
- Node.js instalado
- Expo CLI (`npm install -g expo-cli`)
- Cuenta en [expo.dev](https://expo.dev) (gratis)

### Pasos para generar el APK

**Paso 1 — Instalar EAS CLI:**
```bash
npm install -g eas-cli
```

**Paso 2 — Iniciar sesión en Expo:**
```bash
eas login
```
(Crea una cuenta gratuita en expo.dev si no tienes)

**Paso 3 — Configurar el proyecto:**
```bash
eas build:configure
```
Cuando te pregunte qué plataforma, escoge: `Android`

**Paso 4 — Compilar el APK:**
```bash
eas build -p android --profile preview
```
Este proceso tarda aproximadamente **10-20 minutos** en los servidores de Expo. Al terminar, te dará un link de descarga directa del `.apk`.

**Paso 5 — Descargar e instalar:**
Abre el link en tu navegador → Descarga el `.apk` → Instálalo en tu Android.

> ⚠️ **Nota:** Para instalar un APK manual en Android debes activar "Fuentes desconocidas" en Ajustes → Seguridad.

---

## 11. CONCLUSIÓN

FastBite demuestra que es posible crear una aplicación móvil completa, funcional y visualmente atractiva con React Native y Expo en un tiempo relativamente corto. El proyecto cubre todas las buenas prácticas de desarrollo móvil moderno: consumo de APIs externas, manejo de estado global mediante Context API, navegación compleja con Stacks y Tabs anidados, y persistencia de datos local mediante AsyncStorage.

La propuesta de valor es sólida y tiene potencial real de negocio: abordar el desperdicio de alimentos y apoyar estilos de vida saludables son problemáticas actuales y urgentes en nuestra sociedad.

---

*Proyecto desarrollado con ❤️ — FastBite 2026*
