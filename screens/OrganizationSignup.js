import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';

export default function OrganizationSignup({ navigation }) {
  const [orgName, setOrgName] = useState('');
  const [gstin, setGstin] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [location, setLocation] = useState(null);
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    let fieldErrors = {};
    if (!orgName) fieldErrors.orgName = 'Organization name is required.';
    if (!gstin) fieldErrors.gstin = 'GSTIN number is required.';
    if (!address) fieldErrors.address = 'Address is required.';
    if (!landmark) fieldErrors.landmark = 'Landmark is required.';
    if (!mobileNumber) fieldErrors.mobileNumber = 'Mobile number is required.';
    setErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateFields()) {
      navigation.navigate('OtpVerification');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Organization Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Organization Name"
        value={orgName}
        onChangeText={setOrgName}
      />
      {errors.orgName && <Text style={styles.errorText}>{errors.orgName}</Text>}

      <TextInput
        style={styles.input}
        placeholder="GSTIN Number"
        value={gstin}
        onChangeText={setGstin}
      />
      {errors.gstin && <Text style={styles.errorText}>{errors.gstin}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Landmark"
        value={landmark}
        onChangeText={setLandmark}
      />
      {errors.landmark && <Text style={styles.errorText}>{errors.landmark}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        value={mobileNumber}
        keyboardType="numeric"
        onChangeText={setMobileNumber}
      />
      {errors.mobileNumber && <Text style={styles.errorText}>{errors.mobileNumber}</Text>}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15,
    padding: 10,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
  },
});