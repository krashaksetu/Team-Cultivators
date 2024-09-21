import React, { useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from './UserContext'; // Import UserContext

const Profile = () => {
  const navigation = useNavigation();
  const { user } = useContext(UserContext); // Get user data from context

  const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "OK", 
          onPress: () => {
            // Reset navigation stack to prevent navigating back to the profile screen
            navigation.reset({
              index: 0,
              routes: [{ name: 'Welcome' }],
            });
          } 
        }
      ]
    );
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>No user data available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/2804327/pexels-photo-2804327.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }} // Replace with your profile image path
          style={styles.profileImageLarge}
          accessibilityLabel="Profile Image"
        />
        <Text style={styles.profileNameLarge}>{user.name}</Text>
      </View>

      {/* Profile Information */}
      <View style={styles.profileInfo}>
        <View>
          <Text style={styles.profileLabel}>Email:</Text>
          <Text style={styles.profileValue}>{user.email}</Text>
        </View>

        <View>
          <Text style={styles.profileLabel}>Phone:</Text>
          <Text style={styles.profileValue}>{user.mobile}</Text>
        </View>

        <View>
          <Text style={styles.profileLabel}>Address:</Text>
          <Text style={styles.profileValue}>{user.address}, {user.district}, {user.state}, {user.pincode}</Text>
        </View>

        <View>
          <Text style={styles.profileLabel}>Date of Birth:</Text>
          <Text style={styles.profileValue}>{new Date(user.dob).toDateString()}</Text>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity 
        style={[styles.button, styles.logoutButton]} 
        onPress={handleLogout}
        accessibilityLabel="Logout"
        accessibilityHint="Log out from your account."
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 20,
  },
  profileHeader: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  profileImageLarge: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileNameLarge: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  profileInfo: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  profileLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  profileValue: {
    fontSize: 16,
    color: '#555',
    fontWeight: 'bold', // Moved fontWeight here for consistency
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#F44336', // Red color for logout button
  },
});

export default Profile;
