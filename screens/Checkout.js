import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from './CartContext';

export default function Checkout() {
  const navigation = useNavigation();
  const { cartItems } = useContext(CartContext);

  // State for address and payment method
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Handle place order
  const handlePlaceOrder = () => {
    if (!address) {
      Alert.alert('Error', 'Please enter your address.');
      return;
    }

    // Simulate placing the order
    Alert.alert('Order Placed', 'Your order has been placed successfully!', [
      { text: 'OK', onPress: () => navigation.navigate('Main') } // Navigate to MainScreen
    ]);
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>{`$${item.price.toFixed(2)}`}</Text>
      <Text style={styles.itemQuantity}>{`x${item.quantity}`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Cart Items */}
      <View style={styles.cartSection}>
        <Text style={styles.sectionTitle}>Your Cart</Text>
        <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={item => item.id.toString()}
        />
        <Text style={styles.totalPrice}>Total: ${totalPrice.toFixed(2)}</Text>
      </View>

      {/* Address Input */}
      <View style={styles.inputSection}>
        <Text style={styles.inputLabel}>Address:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your address"
          value={address}
          onChangeText={setAddress}
        />
      </View>

      {/* Payment Method */}
      <View style={styles.inputSection}>
        <Text style={styles.inputLabel}>Payment Method:</Text>
        <View style={styles.paymentOptions}>
          <TouchableOpacity onPress={() => setPaymentMethod('Credit Card')} style={styles.paymentOption}>
            <Text style={paymentMethod === 'Credit Card' ? styles.selectedOption : styles.optionText}>Credit Card</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setPaymentMethod('PayPal')} style={styles.paymentOption}>
            <Text style={paymentMethod === 'PayPal' ? styles.selectedOption : styles.optionText}>PayPal</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setPaymentMethod('Bank Transfer')} style={styles.paymentOption}>
            <Text style={paymentMethod === 'Bank Transfer' ? styles.selectedOption : styles.optionText}>Bank Transfer</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Place Order Button */}
      <TouchableOpacity onPress={handlePlaceOrder} style={styles.placeOrderButton}>
        <Text style={styles.placeOrderButtonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  cartSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemName: {
    fontSize: 18,
    flex: 2,
  },
  itemPrice: {
    fontSize: 16,
    color: '#4CAF50',
    flex: 1,
  },
  itemQuantity: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    textAlign: 'right',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'right',
  },
  inputSection: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  textInput: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  paymentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  paymentOption: {
    padding: 10,
  },
  optionText: {
    fontSize: 16,
  },
  selectedOption: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  placeOrderButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'center',
  },
  placeOrderButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
