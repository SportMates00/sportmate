import { deleteAccount } from '@/src/store/userSlice';
import { useTheme } from '@/src/theme/themeContext';
import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const DeleteAccount = () => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.user);
  const { t } = useTranslation();

  const [confirmText, setConfirmText] = useState('');
  const [password, setPassword] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
      headerStyle:
        Platform.OS === 'web'
          ? { borderBottom: 'none', boxShadow: 'none' }
          : { borderBottomWidth: 0, elevation: 0, shadowOpacity: 0 },
      headerStyle: {
        backgroundColor: theme.colors.background,
      },
      headerTintColor: theme.colors.text,
      headerTitleStyle: {
        color: theme.colors.text,
        fontSize: theme.fonts.size.large,
      },
      headerTitleAlign: 'center',
      headerTitle: t('DeleteAccount'),
    });
  }, [navigation, t]);

  const handleDelete = () => {
    if (confirmText.toLowerCase() !== 'delete') {
      Alert.alert(t('Error'), t('DeleteConfirmTextError'));
      return;
    }

    if (loggedUser.password === password) {
      Alert.alert(
        t('DeleteAccountTitle'),
        t('DeleteAccountConfirmMessage'),
        [
          { text: t('Cancel'), style: 'cancel' },
          {
            text: t('Delete'),
            style: 'destructive',
            onPress: () => {
              dispatch(deleteAccount(loggedUser.email));

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
    } else {
      Alert.alert(t('Error'), t('IncorrectPassword'));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.warningText}>
        {t('DeleteAccountWarning')}
      </Text>

      <Text style={styles.subHeader}>
        {t('DeleteTypeConfirm')}
      </Text>

      <TextInput
        style={styles.input}
        placeholder={t('DeleteTypePlaceholder')}
        value={confirmText}
        onChangeText={setConfirmText}
      />

      <Text style={styles.subHeader}>
        {t('DeleteEnterPassword')}
      </Text>

      <TextInput
        style={styles.input}
        placeholder={t('Password')}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>
          {t('DeleteAccount')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelButtonText}>
          {t('Cancel')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
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
      color: theme.colors.text,
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
      color: theme.colors.primary,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default DeleteAccount;
