import { deleteAccount } from '@/src/store/userSlice';
import { useTheme } from '@/src/theme/themeContext';
import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const DeleteAccount = () => {
        const {theme} = useTheme();
        const styles = getStyles(theme);
        const navigation = useNavigation();
        useLayoutEffect(() => {
            navigation.setOptions({
              headerShadowVisible: false,
                  headerStyle: Platform.OS == 'web' ? {
                    borderBottom: 'none',
                    boxShadow: 'none',
                  } : {
                    borderBottomWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                  },
              headerStyle: {
                backgroundColor:theme.colors.background,
              },
              headerTintColor: theme.colors.text,
              headerTitleStyle: {
                color: theme.colors.text,
                fontSize:theme.fonts.size.large
              },
              headerTitleAlign: 'center',
              headerTitle:'Delete Account'
            });
          }, [navigation]);
  const [confirmText, setConfirmText] = useState('');
  const [password, setPassword] = useState('');
  const loggedUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
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

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
    color:theme.colors.text
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: theme.radius.semiCircle,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  deleteButton: {
    backgroundColor: theme.colors.primary,
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
    color:theme.colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DeleteAccount;
