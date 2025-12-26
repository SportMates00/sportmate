import React, { useLayoutEffect, useMemo, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import LangChanger from '../LangChanger';
import { useSelector, useDispatch } from 'react-redux';

import { usersSelectors, upsertUser } from '@/src/store/usersSlice';
import { setCurrentUser } from '@/src/store/authSlice';

const SignUpScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // 🌱 local form state (correct pattern)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [emailExist, setEmailExist] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [fieldError, setFieldError] = useState(false);

  // 👥 all users from Redux
  const users = useSelector(usersSelectors.selectAll);

  // ⚡ fast lookup map
  const userMap = useMemo(() => {
    const map = new Map();
    users.forEach(u => map.set(u.email.toLowerCase(), u));
    return map;
  }, [users]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <LangChanger text={''} />,

    });
  }, [navigation]);

  const handleSignUp = () => {
    setEmailExist(false);
    setPasswordError(false);
    setFieldError(false);

    const { firstName, lastName, email, password, confirmPassword } = form;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setFieldError(true);
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError(true);
      return;
    }

    const existing = userMap.get(email.toLowerCase());
    if (existing) {
      setEmailExist(true);
      return;
    }

    // 🆕 create a new user id
    const newUserId = `u_${Date.now()}`;

    // 🧑 full user object (simple base — extend later in onboarding)
    const newUser = {
      id: newUserId,
      firstName,
      lastName,
      email,
      password,
      profileInfo: {
        mainSport: '',
        location: '',
        age: '',
        gender: '',
        aboutMe: '',
        sportsList: [],
        reviews: [],
        profileImageUrl: '',
        profileCompletePer: 0,
        userVerification: false,
        friendsList: [],
        completedEvents: [],
        availability: {},
      },
    };

    // 💾 store user in Redux
    dispatch(upsertUser(newUser));

    // 🔐 optionally set them as logged-in
    dispatch(setCurrentUser(newUserId));

    // 🎯 continue onboarding
    navigation.navigate('QSport');
  };
return (
    <View style={styles.container}>
      <View style={{ marginBottom: 60 }}>
        <Text style={styles.title}>{t('signupPage')}</Text>

        {emailExist && <Text style={styles.error}>{t('emailInUse')}</Text>}
        {passwordError && <Text style={styles.error}>{t('passwordDoNotMatch')}</Text>}
        {fieldError && <Text style={styles.error}>{t('allFieldsRequired')}</Text>}
      </View>

      <TextInput
        style={styles.input}
        placeholder={t('firstName')}
        onChangeText={(value) => setForm({ ...form, firstName: value })}
      />
      <TextInput
        style={styles.input}
        placeholder={t('lastName')}
        onChangeText={(value) => setForm({ ...form, lastName: value })}
      />
      <TextInput
        style={styles.input}
        placeholder={t('email')}
        onChangeText={(value) => setForm({ ...form, email: value.trim() })}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder={t('password')}
        onChangeText={(value) => setForm({ ...form, password: value })}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder={t('confirmPassword')}
        onChangeText={(value) => setForm({ ...form, confirmPassword: value })}
        secureTextEntry
      />

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.signInText}>{t('alreadyHaveAnAccount')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>{t('signupBtn')}</Text>
      </TouchableOpacity>
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
  backButtonText: {
    fontSize: 18,
    color: '#4CAF50',
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
  signInText: {
    color: '#4CAF50',
    fontSize: 16,
    marginTop: 20,
  },  
  error: {
    color: 'red',
    marginTop: 20,
  },
});

export default SignUpScreen;
