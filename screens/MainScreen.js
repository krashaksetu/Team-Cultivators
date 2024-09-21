import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions, ScrollView, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from './CartContext';
import { db } from '../config/FireBaseConfig';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore'; // Import Firestore methods

const { width } = Dimensions.get('window');

const categories = [
  { id: '1', image: 'https://images.pexels.com/photos/54084/wheat-grain-agriculture-seed-54084.jpeg', name: 'Wheat' },
  { id: '2', image: 'https://images.pexels.com/photos/16732706/pexels-photo-16732706/free-photo-of-fresh-corns-at-the-market.jpeg', name: 'Maize' },
  { id: '3', image: 'https://images.pexels.com/photos/3735174/pexels-photo-3735174.jpeg', name: 'Soyabean' },
  { id: '4', image: 'https://images.pexels.com/photos/2254097/pexels-photo-2254097.jpeg', name: 'Sugarcane' },
  { id: '5', image: 'https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg', name: 'Rice' },
  { id: '6', image: 'https://images.pexels.com/photos/13620783/pexels-photo-13620783.jpeg', name: 'Beans' }
];

const cropCards = [
  { id: '1', image: 'https://images.pexels.com/photos/54084/wheat-grain-agriculture-seed-54084.jpeg', name: 'Wheat', price: 30, description: 'High quality wheat grains from MP.' },
  { id: '2', image: 'https://images.pexels.com/photos/16732706/pexels-photo-16732706/free-photo-of-fresh-corns-at-the-market.jpeg', name: 'Maize', price: 25, description: 'Fresh maize from Karnataka.' },
  { id: '3', image: 'https://images.pexels.com/photos/3735174/pexels-photo-3735174.jpeg', name: 'Soyabean', price: 40, description: 'Nutrient-rich soyabean from Maharashtra.' },
  { id: '4', image: 'https://images.pexels.com/photos/2254097/pexels-photo-2254097.jpeg', name: 'Sugarcane', price: 20, description: 'Sweet and fresh sugarcane from UP.' }
];

const numColumns = 3;

export default function HomeScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [filteredCropCards, setFilteredCropCards] = useState(cropCards);

  // Fetch products from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const productList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    }, (error) => {
      console.error("Error fetching products: ", error);
    });

    return () => unsubscribe(); // Clean up the subscription on unmount
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredCropCards(cropCards);
    } else {
      setFilteredCropCards(
        cropCards.filter(card =>
          card.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery]);

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity style={styles.categoryItem} onPress={() => {
      navigation.navigate('FilteredCrops', { categoryId: item.id });
    }}>
      <Image source={{ uri: item.image }} style={styles.categoryImage} />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderCardItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardName}>{item.name}</Text>
        <Text style={styles.cardPrice}>₹{item.price.toFixed(2)}/kg</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
        <TouchableOpacity style={styles.addToCartButton} onPress={() => addToCart(item)}>
          <Ionicons name="cart" size={24} color="#fff" />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Top Navigation Bar */}
        <View style={styles.topNavBar}>
          <Text style={styles.appName}>Namaste 🙏</Text>
          <View style={styles.navBarRight}>
            <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart')}>
              <Image
                source={{ uri: 'https://thumbs.dreamstime.com/b/white-flat-shopping-cart-icon-green-background-ill-white-flat-shopping-cart-icon-green-background-illustration-100582536.jpg' }}
                style={styles.profileImage}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Profile')}>
              <Image
                source={{ uri: 'https://i.pinimg.com/736x/1c/c5/35/1cc535901e32f18db87fa5e340a18aff.jpg' }}
                style={styles.profileImage}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Navigation Bar */}
        <View style={styles.searchNavBar}>
          <View style={styles.searchBarContainer}>
            <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search the category"
              placeholderTextColor="#888"
              value={searchQuery}
              onChangeText={text => setSearchQuery(text)}
            />
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#888" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.id}
            numColumns={numColumns}
            columnWrapperStyle={styles.columnWrapper}
          />
        </View>

        {/* Cards */}
        <View style={styles.cardsContainer}>
          <FlatList
            data={products}
            renderItem={renderCardItem}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={styles.cardColumnWrapper}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  topNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: '#4CAF50',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  cartButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchNavBar: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: '#f0f0f0',
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  searchIcon: {
    marginRight: 10,
  },
  categoriesContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  categoryItem: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
  },
  categoryImage: {
    width: width / 4,
    height: width / 4,
    borderRadius: 50,
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  cardsContainer: {
    paddingHorizontal: 10,
  },
  cardColumnWrapper: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    width: width / 2 - 20,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    padding: 10,
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardPrice: {
    fontSize: 16,
    color: '#4CAF50',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    borderRadius: 5,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});
