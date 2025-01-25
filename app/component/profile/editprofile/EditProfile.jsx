import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import React, { useState } from 'react';
import LocationSelector from './LocationSelector';
import AgeGenderSelector from './AgeGenderSelector';
import { useNavigation } from '@react-navigation/native';

const EditProfile = () => {
  const navigation = useNavigation();

  // State to track selected gender
  const [selectedGender, setSelectedGender] = useState(null);

  // Function to handle gender selection
  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

  return (
    <ScrollView style={{ padding: 20, marginTop: 24, backgroundColor: 'white', flex: 1 }}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Edit Profile</Text>
        <TouchableOpacity>
          <Text style={styles.buttonText}>Save</Text>
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

      {/* Personal Info */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeading}>PERSONAL INFO</Text>
        <Text style={styles.label}>First Name</Text>
        <TextInput style={styles.input} placeholder="Enter first name" />
        <Text style={styles.label}>Last Name</Text>
        <TextInput style={styles.input} placeholder="Enter last name" />
        <Text style={styles.label}>Location</Text>
        <LocationSelector />
      </View>

      {/* Age and Gender */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeading}>AGE AND GENDER</Text>
        <AgeGenderSelector />

        {/* Gender Selection Buttons */}
        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={[styles.genderButton, selectedGender === 'Male' && styles.selectedButton]}
            onPress={() => handleGenderSelect('Male')}
          >
            <Text style={styles.genderText}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.genderButton, selectedGender === 'Female' && styles.selectedButton]}
            onPress={() => handleGenderSelect('Female')}
          >
            <Text style={styles.genderText}>Female</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.genderButton, selectedGender === 'Other' && styles.selectedButton]}
            onPress={() => handleGenderSelect('Other')}
          >
            <Text style={styles.genderText}>Other</Text>
          </TouchableOpacity>
        </View>
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
    borderWidth:2,
  },
  genderText: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
  },
});

export default EditProfile;
