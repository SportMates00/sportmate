import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import React from 'react';
import favicon from '@/assets/images/favicon.png';
import { launchImageLibrary } from 'react-native-image-picker'; // For image selection

const Profile = ({ navigation }) => {
  const handleBackPress = () => {
    navigation.navigate('HomeTabs'); // Navigates back to the previous screen
  };

  const handleProfilePress = () => {
    // Function to close the profile tab or perform other actions
    navigation.navigate('HomeTabs');
  };

  const handleEditProfilePicture = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets) {
        const selectedImage = response.assets[0].uri;
        // Handle the selected image, e.g., upload or display
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity onPress={handleProfilePress} style={styles.profileButton}>
          <Image
            source={favicon} // Replace with your profile logo path
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.profilePictureSection}>
        <View style={styles.profilePictureContainer}>
          <Image
            source={favicon} // Replace with your default profile picture path
            style={styles.profilePicture}
          />
          <TouchableOpacity onPress={handleEditProfilePicture} style={styles.editIconContainer}>
            <Image
              source={favicon} // Replace with your edit icon path
              style={styles.editIcon}
            />
          </TouchableOpacity>
        </View>
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
