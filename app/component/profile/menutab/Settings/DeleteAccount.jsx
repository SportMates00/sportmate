import { deleteAccount } from '@/app/store/userSlice';
import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const DeleteAccount = () => {
  const [confirmText, setConfirmText] = useState('');
  const [password, setPassword] = useState('');
  const loggedUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleDelete = () => {
    if (confirmText.toLowerCase() !== 'delete') {
      Alert.alert('Error', 'Please type "DELETE" to confirm.');
      return;
    }
    if(confirmText.toLowerCase() === 'delete' && loggedUser.password === password){
      Alert.alert(
        "Delete Account",
        "Are you sure you want to permanently delete your account? This action cannot be undone.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: () => {
              // Dispatch Redux action with user ID
              dispatch(deleteAccount(loggedUser.email));
    
              // Navigate to Welcome page
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'Welcome' }],
                })
              );
            },
          },
        ]
      );
    }else {
      Alert.alert('Error','Password is not correct')
    }
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
