import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import React, { useLayoutEffect, useRef, useState } from 'react';
import LocationSelector from './LocationSelector';
import AgeGenderSelector from './AgeGenderSelector';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { editUserInfo } from '@/src/store/userSlice';
import AboutMeInput from './AboutMeInput';
import EditAvailabilityTable from './EditAvailability';
import * as ImagePicker from 'expo-image-picker';


import _ from 'lodash';  // Import lodash
import { useTranslation } from 'react-i18next';

const EditProfile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.user);
  const [editUser, setEditUser] = useState(loggedUser);
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [availabilityError, setAvailabilityError] = useState('');
  const {t} = useTranslation();

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

    headerLeft : () =>      (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>{t('cancelEditProfile')}</Text>
        </TouchableOpacity>

    ),
    headerRight : () =>      (
        <TouchableOpacity onPress={saveUserInfo} disabled={!hasChanges}>
          <Text style={[styles.buttonText, !hasChanges && styles.disabledButton]}>{t('saveEditProfile')}</Text>
        </TouchableOpacity>
    ),
    // FIXED: No borders, no lines
    headerStyle: {
      backgroundColor: "white",
      borderBottomWidth: 0, // remove line
      elevation: 0,         // Android
      shadowOpacity: 0,     // iOS
    },
  });
}, [navigation, editUser]);

  // Check if there are any changes to enable/disable the save button
  const hasChanges = !_.isEqual(loggedUser, editUser);
  
  // Function to check if at least one time slot is selected
  const isAvailabilityValid = (availability) => {
    return Object.values(availability).some((day) =>
      Object.values(day).some((time) => time === true)
    );
  };

  // Save user information
  const scrollViewRef = useRef(null);
  const pickImage = async () => {
  
    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      // Check file type
      const uri = result.assets[0].uri;
      if (uri.endsWith('.png') || uri.endsWith('.jpeg') || uri.endsWith('.jpg')) {
        setEditUser({ ...editUser, profileInfo: { ...editUser.profileInfo, profileImageUrl: uri } });
        console.log(loggedUser)
      } else {
        alert(t('imageError'));
      }
    }
  };
  
function saveUserInfo() {
  let isValid = true;

  // Validate first name
  if (editUser.firstName.trim() === '') {
    setFirstNameError(t('firstNameError'));
    isValid = false;
  } else {
    setFirstNameError('');
  }

  // Validate last name
  if (editUser.lastName.trim() === '') {
    setLastNameError(t('lastNameError'));
    isValid = false;
  } else {
    setLastNameError('');
  }

  // Validate availability
  if (!isAvailabilityValid(editUser.profileInfo.availability)) {
    setAvailabilityError();
    isValid = false;
    
    // Scroll to the availability section
    scrollViewRef.current?.scrollToEnd({ animated: true });
  } else {
    setAvailabilityError(t('oneTimeSlotError'));
  }

  // Save if all validations pass and there are changes
  if (isValid && hasChanges) {
    dispatch(editUserInfo(editUser));
    
    navigation.navigate('Profile');
  }
}

  return (
    <ScrollView ref={scrollViewRef} style={{ padding: 20, backgroundColor: 'white', flex: 1 }}>
      {/* Header */}


      {/* Profile Picture */}
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
          <TouchableOpacity style={styles.editButton} onPress={(pickImage)}>
            <Text style={styles.editButtonText}>✎</Text>
          </TouchableOpacity>
        </View>
      </View>


      {/* Personal Info LOCATION */}
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

      {/* Age and Gender */}
      <Text style={styles.sectionHeading}>{t('ageAndGender')}</Text>
      <AgeGenderSelector editUser={editUser} setEditUser={setEditUser} />
      <View style={styles.genderContainer}>
        {genders.map((gender) => (
          <TouchableOpacity
            key={gender.key}
            style={[
              styles.genderButton,
              editUser.profileInfo.gender === gender.key && styles.selectedButton, // Dynamically highlight selected button
            ]}
            onPress={() => setEditUser((prev) => ({
              ...prev,
              profileInfo: { ...prev.profileInfo, gender:gender.key },
            }))}
          >
            <Text style={styles.genderText}>{gender.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ABOUT ME */}
      <View>
        <Text style={styles.sectionHeading}>{t('profileAboutTab')}</Text>
        <AboutMeInput editUser={editUser} setEditUser={setEditUser} />
      </View>

      {/* AVAILABILITY */}
      <View style={{ paddingBottom: 100, width: '100%' }}>
        <Text style={styles.sectionHeading}>{t('myFreeTimeProfile')}</Text>
        <EditAvailabilityTable editUser={editUser} setEditUser={setEditUser} />
        {availabilityError ? <Text style={styles.errorText}>{availabilityError}</Text> : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#007AFF', // iOS-style blue
    paddingInline:20
  },
  disabledButton: {
    color: 'gray', // Disabled color
  },
  title: {
    fontSize: 16,
    letterSpacing: 1,
    textAlign: 'center',
    flex: 1,
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
    borderColor: '#ccc',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#007AFF',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 16,
    fontSize: 16,
    paddingVertical: 4,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  genderButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    width: 100,
  },
  selectedButton: {
    backgroundColor: 'lightgray',
    borderColor: 'lightblue',
    borderWidth: 2,
  },
  genderText: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
  },
  profilePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#666', // Darker background for better visibility
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default EditProfile;
