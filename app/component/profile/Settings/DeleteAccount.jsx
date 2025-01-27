import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const DeleteAccount = ({ onDelete }) => {
  const [confirmText, setConfirmText] = useState('');
  const [password, setPassword] = useState('');

  const handleDelete = () => {
    if (confirmText.toLowerCase() !== 'delete') {
      Alert.alert('Error', 'Please type "DELETE" to confirm.');
      return;
    }
    // Call your API or backend service to delete the account
    // Example: onDelete(password);
    Alert.alert('Success', 'Your account has been deleted.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Delete Your Account</Text>
      <Text style={styles.warningText}>
        Warning: Deleting your account will permanently remove all your data and cannot be undone.
      </Text>

      <Text style={styles.subHeader}>Please type "DELETE" to confirm:</Text>
      <TextInput
        style={styles.input}
        placeholder="Type DELETE to confirm"
        value={confirmText}
        onChangeText={setConfirmText}
      />

      <Text style={styles.subHeader}>Enter your password to continue:</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Delete Account</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={() => console.log('Cancel')}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  warningText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 5,
  },
  input: {
    width: '80%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginTop: 20,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginTop: 15,
  },
  cancelButtonText: {
    color: 'blue',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DeleteAccount;
