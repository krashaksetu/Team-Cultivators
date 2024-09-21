import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator 
} from 'react-native';

const OtpInput = ({ value, onChangeText, placeholder, maxLength, keyboardType }) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
    keyboardType={keyboardType}
    maxLength={maxLength}
    textAlign="center"
    fontSize={18}
  />
);

export default function OtpVerificationScreen({ navigation }) {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const handleVerifyOtp = () => {
    if (!mobileNumber || !otp) {
      alert('Please fill in both fields.');
      return;
    }

    setLoading(true); // Start loading

    // Simulating OTP verification function
    setTimeout(() => {
      setLoading(false); // Stop loading
      if (otp === '123456') { // Simulate OTP verification logic (replace with actual logic)
        navigation.replace('Main');
      } else {
        alert('Invalid OTP. Please try again.');
      }
    }, 1000); // Simulate network delay
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.description}>Enter the OTP sent to your mobile number.</Text>

      {/* Input for Mobile Number */}
      <OtpInput
        placeholder="Mobile Number"
        value={mobileNumber}
        onChangeText={setMobileNumber}
        keyboardType="phone-pad"
        maxLength={10}
      />

      {/* Input for OTP */}
      <OtpInput
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
        maxLength={6}
      />

      {/* Verify OTP Button */}
      <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOtp} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.verifyText}>Verify OTP</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  input: {
    width: '100%',
    padding: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  verifyButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    marginTop: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  verifyText: {
    color: '#fff',
    fontSize: 18,
  },
});