import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import LocationSelector from './LocationSelector';
import AgeGenderSelector from './AgeGenderSelector';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { editUserInfo } from '@/app/store/userSlice';
import AboutMeInput from './AboutMeInput';
import EditAvailabilityTable from './EditAvailability';
import _ from 'lodash';  // Import lodash

const EditProfile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.user);
  const [editUser, setEditUser] = useState(loggedUser);

  // Check if there are any changes to enable/disable the save button
  const hasChanges = !_.isEqual(loggedUser, editUser);

  // Save user information
  function saveUserInfo() {
    if (hasChanges) {
      console.time('S')
      dispatch(editUserInfo(editUser));
      navigation.navigate('Profile');
      console.timeEnd('S')
    }
  }


  return (
    <ScrollView style={{ padding: 20, marginTop: 24, backgroundColor: 'white', flex: 1 }}>
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
          <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.profilePicture} />
          <TouchableOpacity style={styles.editButton} onPress={() => console.log('Edit Profile Picture')}>
            <Text style={styles.editButtonText}>✎</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Personal Info LOCATION */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeading}>PERSONAL INFO</Text>
        <Text style={styles.label}>First Name</Text>
        <TextInput style={styles.input} placeholder='Write your name...' value={editUser.firstName}
        onChangeText={(value) => setEditUser({ ...editUser, firstName: value })} />
        <Text style={styles.label}>Last Name</Text>
        <TextInput style={styles.input} placeholder='Write your last name...' value={editUser.lastName}
        onChangeText={(value) => setEditUser({ ...editUser, lastName: value })} />
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
});

export default EditProfile;
