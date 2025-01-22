import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import ProfilePicture from '../../../assets/images/profile-picture.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from '@expo/vector-icons/AntDesign';
import Players from '@/app/(tabs)/Players';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import EditProfile from './EditProfile';
import ProgressBar from 'react-native-progress/Bar'; // New import

const Profile = ({ navigation }) => {
  const [loggedUser, setLoggedUser] = useState(
    { firstName: '', lastName: '', email: '', password: '', profileInfo: { game: '', sport: '', availibility: {} } }
  );
  const [completionPercentage, setCompletionPercentage] = useState(0);

  const handleBackPress = () => {
    navigation.navigate('HomeTabs'); // Navigates back to the previous screen
  };

  const handleProfilePress = () => {
    navigation.navigate(Players);
  };

  const handleEditProfile = () => {
    navigation.navigate(EditProfile);
  };

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('loggedInUser');
        if (savedUser) {
          setLoggedUser(JSON.parse(savedUser));
        }
      } catch (e) {
        console.error('Failed to load user info:', e);
      }
    };

    const calculateCompletion = () => {
      let percentage = 0;
      if (loggedUser.firstName) percentage += 25;
      if (loggedUser.lastName) percentage += 25;
      if (loggedUser.profileInfo.game) percentage += 25;
      if (loggedUser.profileInfo.sport) percentage += 25;
      setCompletionPercentage(percentage);
    };

    loadUserInfo();
    calculateCompletion();
  }, [loggedUser]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity onPress={handleProfilePress} style={styles.profileButton}>
          <AntDesign name="adduser" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Profile picture under the header */}
      <View style={styles.profilePictureSection}>
        <View style={styles.profilePictureContainer}>
          <Image
            source={ProfilePicture}
            style={styles.profilePicture}
          />
          <TouchableOpacity onPress={handleEditProfile} style={styles.editIconContainer}>
            <MaterialIcons name="edit" size={16} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* User's name */}
      <Text style={styles.userName}>{loggedUser.firstName} {loggedUser.lastName}</Text>

      {/* Profile completion progress bar */}
      <View style={styles.progressBar}>
        <ProgressBar
          progress={completionPercentage / 100}
          width={null}
          height={10}
          color="#007aff"
          unfilledColor="#e0e0e0"
        />
      </View>

      {/* Add the rest of the profile content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    padding: 10,
    backgroundColor: '#f8f8f8',
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
    flex: 1,
    textAlign: 'center',
  },
  profileButton: {
    padding: 8,
  },
  profilePictureSection: {
    alignItems: 'flex-start',
    marginTop: 20,
    paddingLeft: 10,
  },
  profilePictureContainer: {
    position: 'relative',
    width: 60,
    height: 60,
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 2,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  progressBar: {
    marginTop: 20,
    paddingHorizontal: 30,
  },
});

export default Profile;
