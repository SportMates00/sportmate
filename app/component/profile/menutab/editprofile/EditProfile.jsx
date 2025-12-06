import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import React, { useRef, useState } from 'react';
import LocationSelector from './LocationSelector';
import AgeGenderSelector from './AgeGenderSelector';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { editUserInfo } from '@/src/store/userSlice';
import AboutMeInput from './AboutMeInput';
import EditAvailabilityTable from './EditAvailability';
import * as ImagePicker from 'expo-image-picker';


import _ from 'lodash';  // Import lodash

const EditProfile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.user);
  const [editUser, setEditUser] = useState(loggedUser);
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [availabilityError, setAvailabilityError] = useState('');

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
        alert('Please select a PNG or JPEG image.');
      }
    }
  };
  
function saveUserInfo() {
  let isValid = true;

  // Validate first name
  if (editUser.firstName.trim() === '') {
    setFirstNameError('First name cannot be empty');
    isValid = false;
  } else {
    setFirstNameError('');
  }

  // Validate last name
  if (editUser.lastName.trim() === '') {
    setLastNameError('Last name cannot be empty');
    isValid = false;
  } else {
    setLastNameError('');
  }

  // Validate availability
  if (!isAvailabilityValid(editUser.profileInfo.availability)) {
    setAvailabilityError('At least one time slot must be selected');
    isValid = false;
    
    // Scroll to the availability section
    scrollViewRef.current?.scrollToEnd({ animated: true });
  } else {
    setAvailabilityError('');
  }

  // Save if all validations pass and there are changes
  if (isValid && hasChanges) {
    dispatch(editUserInfo(editUser));
    
    navigation.navigate('Profile');
  }
}
console.log('aaaaaaaaaaaaaaaaaaaaaaaaaa',editUser)
  return (
    <ScrollView ref={scrollViewRef} style={{ padding: 20, marginTop: 24, backgroundColor: 'white', flex: 1 }}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Edit Profile</Text>
        <TouchableOpacity onPress={saveUserInfo} disabled={!hasChanges}>
          <Text style={[styles.buttonText, !hasChanges && styles.disabledButton]}>Save</Text>
        </TouchableOpacity>
      </View>

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
        <Text style={styles.sectionHeading}>PERSONAL INFO</Text>
        <Text style={styles.label}>First Name</Text>
        <TextInput 
          style={styles.input} 
          placeholder='Write your name...' 
          value={editUser.firstName}
          onChangeText={(value) => setEditUser({ ...editUser, firstName: value })} 
        />
        {firstNameError ? <Text style={styles.errorText}>{firstNameError}</Text> : null}
        <Text style={styles.label}>Last Name</Text>
        <TextInput 
          style={styles.input} 
          placeholder='Write your last name...' 
          value={editUser.lastName}
          onChangeText={(value) => setEditUser({ ...editUser, lastName: value })} 
        />
        {lastNameError ? <Text style={styles.errorText}>{lastNameError}</Text> : null}
        <Text style={styles.label}>Location</Text>
        <LocationSelector setEditUser={setEditUser} editUser={editUser} />
      </View>

      {/* Age and Gender */}
      <Text style={styles.sectionHeading}>AGE AND GENDER</Text>
      <AgeGenderSelector editUser={editUser} setEditUser={setEditUser} />
      <View style={styles.genderContainer}>
        {['Male', 'Female', 'Other'].map((gender) => (
          <TouchableOpacity
            key={gender}
            style={[
              styles.genderButton,
              editUser.profileInfo.gender === gender && styles.selectedButton, // Dynamically highlight selected button
            ]}
            onPress={() => setEditUser((prev) => ({
              ...prev,
              profileInfo: { ...prev.profileInfo, gender },
            }))}
          >
            <Text style={styles.genderText}>{gender}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ABOUT ME */}
      <View>
        <Text style={styles.sectionHeading}>ABOUT ME</Text>
        <AboutMeInput editUser={editUser} setEditUser={setEditUser} />
      </View>

      {/* AVAILABILITY */}
      <View style={{ paddingBottom: 100, width: '100%' }}>
        <Text style={styles.sectionHeading}>AVAILABILITY</Text>
        <EditAvailabilityTable editUser={editUser} setEditUser={setEditUser} />
        {availabilityError ? <Text style={styles.errorText}>{availabilityError}</Text> : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky', // Sticky behavior
    top: 0,
    zIndex: 1000,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#007AFF', // iOS-style blue
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
