// components/Navbar.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Navbar({ navigation }) {
  return (
    <View style={styles.navbar}>
      <View style={styles.logo}>
        {/* Placeholder for the Logo */}
      </View>
      <View style={styles.navButtons}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    backgroundColor: '#ddd',
    position: 'absolute', // Make navbar fixed
    top: 0, // Pin it to the top
    left: 0,
    right: 0,
    zIndex: 1, // Ensure it is on top of other content
  },
  logo: {
    width: 50,
    height: 50,
    backgroundColor: '#ccc', // Placeholder for the logo
  },
  navButtons: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    marginLeft: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
