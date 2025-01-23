import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import favicon from '@/assets/images/favicon.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AvailabilityTable from './Availibility';
import MenuTab from './MenuTab';
// import { launchImageLibrary } from 'react-native-image-picker'; // For image selection

const Profile = ({ navigation }) => {

  const [loggedUser, setLoggedUser] = useState(
    {firstName:'', lastName: '', email:'', password:'', profileInfo:{ game:'', sport:'', availibility:{
      days:["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      times:["Morning", "Afternoon", "Evening"]
    }}}
  );
  const handleBackPress = () => {
    navigation.navigate('HomeTabs'); // Navigates back to the previous screen
  };

  const handleProfilePress = () => {
    // Function to close the profile tab or perform other actions
    navigation.navigate('HomeTabs');
  };

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('loggedUser');
        if (savedUser) {
          setLoggedUser(JSON.parse(savedUser));
        }
      } catch (e) {
        console.error('Failed to load user info:', e);
      }
    };

    loadUserInfo();
console.log(loggedUser)
  },[])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
        <MenuTab />
      </View>
      
      <View style={styles.profilePictureSection}>
        <View style={styles.profilePictureContainer}>
          <Image
            source={favicon} // Replace with your default profile picture path
            style={styles.profilePicture}
          />
          <TouchableOpacity style={styles.editIconContainer}>
            <Image
              source={favicon} // Replace with your edit icon path
              style={styles.editIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Text>{loggedUser.firstName} {loggedUser.lastName}</Text>
      <Text>{loggedUser.profileInfo.level}</Text>
      {/* Add the rest of the profile content here */}
      <Text>{loggedUser.profileInfo.sport}</Text>
      <AvailabilityTable loggedUser={loggedUser} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    padding: 10,
    backgroundColor: '#f8f8f8', // Adjust as needed
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007aff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profileButton: {
    padding: 8,
  },
  profileImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  profilePictureSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profilePictureContainer: {
    position: 'relative',
    width: 100,
    height: 100,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 2,
  },
  editIcon: {
    width: 24,
    height: 24,
  },
});

export default Profile;
