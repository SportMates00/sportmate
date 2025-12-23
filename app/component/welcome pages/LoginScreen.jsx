// app/LoginScreen.js
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
  Platform,
  Keyboard,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { users_list } from '@/src/js files/users';
import LangChanger from '../LangChanger';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '@/src/store/userSlice';
const LoginScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState({
    email: '',
    password: '',
    general: '',
  });
  const [loading, setLoading] = useState(false);
  const [userMap, setUserMap] = useState(new Map());

  useEffect(() => {
    const map = new Map();
    users_list.forEach((u) => map.set(u.email.toLowerCase(), u));
    setUserMap(map);
  }, []);

  const handleLoginSuccess = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'CreateGameComponent' }],
      })
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "",                // ❗ fully removes title
      headerShadowVisible: false, 
      headerBackButtonDisplayMode: "minimal", // (new API)
      headerBackTitleVisible: false,          // (for older versions, harmless if ignored)
      headerBackTitle: "",
      headerRight: () => (
        <LangChanger text={""} iconContainer={styles.iconContainer} />
      ),
      headerStyle: {
      backgroundColor: "white",
      borderBottomWidth: 0, // remove line
      elevation: 0,         // Android
      shadowOpacity: 0,     // iOS
    },
    });
  }, [navigation]);


  const handleLogin = async () => {
    setError({ email: '', password: '', general: '' });

    if (!user.email) {
      setError((prev) => ({ ...prev, email: t('emailIsRequired') }));
      return;
    }
    if (!user.password) {
      setError((prev) => ({ ...prev, password: t('passwordIsRequired') }));
      return;
    }
    Keyboard.dismiss();
    setLoading(true);
    try {
      const foundUser = userMap.get(user.email.toLowerCase());

      if (!foundUser) {
        setError((prev) => ({ ...prev, general: t('userNotFound') }));
      } else if (foundUser.password !== user.password) {
        setError((prev) => ({ ...prev, general: t('incorrectPassword') }));
      } else {
        handleLoginSuccess();
        dispatch(setUserInfo(foundUser));
      }
    } catch (e) {
      console.error('Login error:', e);
      Alert.alert(t('Error'), t('An error occurred. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>

      <View style={{marginBottom: 60}}>
        <Text style={styles.title}>{t('loginPage')}</Text>
        {error.email && <Text style={styles.error}>{error.email}</Text>}
        {error.password && <Text style={styles.error}>{error.password}</Text>}
        {error.general && <Text style={styles.error}>{error.general}</Text>}
      </View>
      <TextInput
        style={styles.input}
        placeholder={t('email')}
        value={user.email}
        onChangeText={(value) => setUser({ ...user, email: value.trim() })}
        keyboardType="email-address"
        autoCapitalize="none"
        accessibilityLabel="Email input"
      />
      

      <TextInput
        style={styles.input}
        placeholder={t('password')}
        value={user.password}
        onChangeText={(value) => setUser({ ...user, password: value })}
        secureTextEntry
        accessibilityLabel="Password input"
      />
      <TouchableOpacity >
        <Text style={styles.signUpText}>{t('forgotPass')}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signUpText}>{t('doNotHaveAccount')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>{t('loginBtn')}</Text>
        )}
      </TouchableOpacity>

      {/* Sign-Up Link */}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:25,
    backgroundColor:'white'
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    letterSpacing:1,
  },
  input: {
    width: '100%',
    paddingVertical: 15,
    marginBottom: 15,
    borderBottomWidth:1,
    borderColor: '#ccc',
  },
  button: {
    marginTop:40,
    alignItems:'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    backgroundColor:'#4CAF50' ,
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 5,
    textAlign: 'center',
    width:'70%',
  },
  signUpText: {
    color: '#4CAF50',
    fontSize: 16,
    marginTop: 20,
  },
  error: {
    color: 'red',
    marginTop: 20,
  },
});

export default LoginScreen;
