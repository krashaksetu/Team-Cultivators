import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Appearance, Dimensions } from 'react-native';

const { width } = Dimensions.get('window'); // Get screen width for responsive design
const colorScheme = Appearance.getColorScheme(); // Get system color scheme (light/dark mode)

const SelectionScreen = ({ navigation }) => {
  const handleSelection = (type) => {
    if (type === 'customer') {
      navigation.navigate('CustomerSignup');
    } else if (type === 'organization') {
      navigation.navigate('OrganizationSignup');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Are you a Customer or an Organization?</Text>

      {/* Customer Button */}
      <TouchableOpacity
        style={[styles.button, colorScheme === 'dark' && styles.darkButton]}
        onPress={() => handleSelection('customer')}
      >
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/5521/5521371.png' }}
          style={styles.image}
        />
        <Text style={[styles.buttonText, colorScheme === 'dark' && styles.darkButtonText]}>
          Customer
        </Text>
      </TouchableOpacity>

      {/* Organization Button */}
      <TouchableOpacity
        style={[styles.button, colorScheme === 'dark' && styles.darkButton]}
        onPress={() => handleSelection('organization')}
      >
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/7486/7486692.png' }}
          style={styles.image}
        />
        <Text style={[styles.buttonText, colorScheme === 'dark' && styles.darkButtonText]}>
          Organization
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff', // White background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333', // Dark text for contrast
  },
  button: {
    width: '80%',
    padding: 16,
    marginVertical: 10,
    borderRadius: 12,
    backgroundColor: '#fff', // White button
    borderColor: '#ddd', // Light border for white button
    borderWidth: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  image: {
    width: width * 0.3, // Image is 30% of screen width
    height: width * 0.3, // Keep image square
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333', // Dark text for contrast
  },
});

export default SelectionScreen;
