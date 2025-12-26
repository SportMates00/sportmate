import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import React, { useLayoutEffect, useRef, useState } from 'react';
import LocationSelector from './LocationSelector';
import AgeGenderSelector from './AgeGenderSelector';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { editUserInfo } from '@/src/store/authSlice';
import AboutMeInput from './AboutMeInput';
import EditAvailabilityTable from './EditAvailability';
import * as ImagePicker from 'expo-image-picker';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/src/theme/themeContext';
import { selectCurrentUser } from '@/src/store/selectors';

const EditProfile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loggedUser = useSelector(selectCurrentUser);
  const [editUser, setEditUser] = useState(loggedUser);
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [availabilityError, setAvailabilityError] = useState('');
  const { t } = useTranslation();

  // ✅ THEME
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const genders = [
    { key: 'Male', label: t('Male') },
    { key: 'Female', label: t('Female') },
    { key: 'Other', label: t('Other') }
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: t('editProfile'),
      headerShadowVisible: false,
      headerBackButtonDisplayMode: "minimal",
      headerBackTitleVisible: false,
      headerBackTitle: "",

      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>{t('cancelEditProfile')}</Text>
        </TouchableOpacity>
      ),

      headerRight: () => (
        <TouchableOpacity onPress={saveUserInfo} disabled={!hasChanges}>
          <Text style={[styles.buttonText, !hasChanges && styles.disabledButton]}>
            {t('saveEditProfile')}
          </Text>
        </TouchableOpacity>
      ),

      headerStyle: {
        backgroundColor: theme.colors.background,
        borderBottomWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
      },
          headerTitleStyle: {
      color: theme.colors.text,
    },

    // ✅ Back arrow & icons color
    headerTintColor: theme.colors.text,
    });
  }, [navigation, editUser, theme]);

  const hasChanges = !_.isEqual(loggedUser, editUser);

  const isAvailabilityValid = (availability) => {
    return Object.values(availability).some((day) =>
      Object.values(day).some((time) => time === true)
    );
  };

  const scrollViewRef = useRef(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      if (uri.endsWith('.png') || uri.endsWith('.jpeg') || uri.endsWith('.jpg')) {
        setEditUser({ ...editUser, profileInfo: { ...editUser.profileInfo, profileImageUrl: uri } });
      } else {
        alert(t('imageError'));
      }
    }
  };

  function saveUserInfo() {
    let isValid = true;

    if (editUser.firstName.trim() === '') {
      setFirstNameError(t('firstNameError'));
      isValid = false;
    } else setFirstNameError('');

    if (editUser.lastName.trim() === '') {
      setLastNameError(t('lastNameError'));
      isValid = false;
    } else setLastNameError('');

    if (!isAvailabilityValid(editUser.profileInfo.availability)) {
      setAvailabilityError();
      isValid = false;
      scrollViewRef.current?.scrollToEnd({ animated: true });
    } else {
      setAvailabilityError(t('oneTimeSlotError'));
    }

    if (isValid && hasChanges) {
      dispatch(editUserInfo(editUser));
      navigation.navigate('Profile');
    }
  }

  return (
    <ScrollView
      ref={scrollViewRef}
      style={{ padding: 20, backgroundColor: theme.colors.background, flex: 1 }}
    >
      <View style={styles.profilePictureContainer}>
        <View style={styles.profilePictureWrapper}>
          {editUser.profileInfo.profileImageUrl === '' ? (
            <View style={styles.profilePlaceholder}>
              <Text style={styles.profileInitial}>
                {editUser.firstName !== '' ? editUser.firstName.charAt(0).toUpperCase() : '?'}
              </Text>
            </View>
          ) : (
            <Image source={{ uri: editUser.profileInfo.profileImageUrl }} style={styles.profilePicture} />
          )}
          <TouchableOpacity style={styles.editButton} onPress={pickImage}>
            <Text style={styles.editButtonText}>✎</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeading}>{t('personalInfo')}</Text>

        <Text style={styles.label}>{t('firstNameEditProfile')}</Text>
        <TextInput
          style={styles.input}
          placeholder={t('namePlaceHolder')}
          value={editUser.firstName}
          onChangeText={(value) => setEditUser({ ...editUser, firstName: value })}
        />
        {firstNameError ? <Text style={styles.errorText}>{firstNameError}</Text> : null}

        <Text style={styles.label}>{t('lastNameEditProfile')}</Text>
        <TextInput
          style={styles.input}
          placeholder={t('lastNamePlaceHolder')}
          value={editUser.lastName}
          onChangeText={(value) => setEditUser({ ...editUser, lastName: value })}
        />
        {lastNameError ? <Text style={styles.errorText}>{lastNameError}</Text> : null}

        <Text style={styles.label}>{t('locationEditProfile')}</Text>
        <LocationSelector setEditUser={setEditUser} editUser={editUser} />
      </View>

      <Text style={styles.sectionHeading}>{t('ageAndGender')}</Text>

      <AgeGenderSelector editUser={editUser} setEditUser={setEditUser} />

      <View style={styles.genderContainer}>
        {genders.map((gender) => (
          <TouchableOpacity
            key={gender.key}
            style={[
              styles.genderButton,
              editUser.profileInfo.gender === gender.key && styles.selectedButton,
            ]}
            onPress={() =>
              setEditUser((prev) => ({
                ...prev,
                profileInfo: { ...prev.profileInfo, gender: gender.key },
              }))
            }
          >
            <Text style={styles.genderText}>{gender.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View>
        <Text style={styles.sectionHeading}>{t('profileAboutTab')}</Text>
        <AboutMeInput editUser={editUser} setEditUser={setEditUser} />
      </View>

      <View style={{ paddingBottom: 100, width: '100%' }}>
        <Text style={styles.sectionHeading}>{t('myFreeTimeProfile')}</Text>
        <EditAvailabilityTable editUser={editUser} setEditUser={setEditUser} />
        {availabilityError ? <Text style={styles.errorText}>{availabilityError}</Text> : null}
      </View>
    </ScrollView>
  );
};

const getStyles = (theme) => StyleSheet.create({
  errorText: {
    color: theme.colors.error,
    fontSize: 12,
    marginTop: 5,
    fontFamily: theme.fonts.family,
  },

  buttonText: {
    fontSize: 16,
    color: theme.colors.text,
    paddingInline: 20,
    fontFamily: theme.fonts.family,
  },

  disabledButton: {
    color: theme.colors.text,
  },

  profilePictureContainer: {
    alignItems: 'center',
    marginTop: 20,
  },

  profilePictureWrapper: {
    position: 'relative',
    width: 120,
    height: 120,
  },

  profilePicture: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    borderWidth: 2,
    borderColor: theme.colors.text,
  },

  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: theme.colors.primary,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.background,
  },

  editButtonText: {
    color: theme.colors.buttonText,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: theme.fonts.family,
  },

  sectionContainer: {
    marginTop: 24,
  },

  sectionHeading: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 16,
    marginTop: 16,
    color: theme.colors.text,
    fontFamily: theme.fonts.family,
  },

  label: {
    fontSize: 14,
    marginBottom: 8,
    color: theme.colors.text,
    fontFamily: theme.fonts.family,
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.text,
    marginBottom: 16,
    fontSize: 16,
    paddingVertical: 4,
    color: theme.colors.text,
    fontFamily: theme.fonts.family,
  },

  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },

  genderButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.text,
    width: 100,
  },

  selectedButton: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },

  genderText: {
    fontSize: 14,
    color: theme.colors.text,
    textAlign: 'center',
    fontFamily: theme.fonts.family,
  },

  profilePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor:theme.colors.primary,
    borderWidth:1
  },

  profileInitial: {
    fontSize: 40,
    color: theme.colors.text,
    fontWeight: 'bold',
    fontFamily: theme.fonts.family,
  },
});

export default EditProfile;
