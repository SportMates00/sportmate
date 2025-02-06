import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const EmailVerification = ({ onVerify }) => {
  const [verificationCode, setVerificationCode] = useState('');

  const handleSubmit = () => {
    if (verificationCode === '123456') { // Example validation
      onVerify();
    } else {
      alert('Invalid code');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enter your email verification code</Text>
      <TextInput
        style={styles.input}
        placeholder="Verification code"
        keyboardType="numeric"
        value={verificationCode}
        onChangeText={setVerificationCode}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#6a11cb',
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default EmailVerification;
