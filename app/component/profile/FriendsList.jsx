import { View, Text } from 'react-native'
import React from 'react'

const FriendsList = () => {
  return (
    <View>
      <Text>FriendsList</Text>
    </View>
  )
}

export default FriendsList




//

// import React, { useEffect, useState } from 'react';
// import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
// import ProfilePicture from '../../../assets/images/profile-picture.png';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import AntDesign from '@expo/vector-icons/AntDesign';
// import Players from '@/app/(tabs)/Players';
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// import EditProfile from './EditProfile';
// import ProgressBar from 'react-native-progress/Bar'; 
// import AvailabilityTable from './Availibility';
// // import { launchImageLibrary } from 'react-native-image-picker'; // For image selection

// const Profile = ({ navigation }) => {
//   const [completionPercentage, setCompletionPercentage] = useState(0);
//   const [loggedUser, setLoggedUser] = useState(
//     {firstName:'', lastName: '', email:'', password:'', profileInfo:{ game:'', sport:'',availibility: {
//       days: { Mon: false, Tue: false, Wed: false, Thu: false, Fri: false, Sat: false, Sun: false },
//       times: { Morning: false, Afternoon: false, Evening: false },
//     },}}
//   );
//   const handleBackPress = () => {
//     navigation.navigate('HomeTabs'); // Navigates back to the previous screen
//   };

//   const handleProfilePress = () => {
//     navigation.navigate(Players);
//   };

//   const handleEditProfile = () => {
//     navigation.navigate(EditProfile);
//   };

//   const handleFriendsPress = () => {
//     navigation.navigate(FriendsList); // Navigates to the Friends List screen
//   };

//   useEffect(() => {
//     // Load user info from AsyncStorage
//     const loadUserInfo = async () => {
//       try {
//         const savedUser = await AsyncStorage.getItem('loggedInUser');
//         if (savedUser) {
//           const user = JSON.parse(savedUser);
//           setLoggedUser(user);

//           // Calculate completion percentage once user info is loaded
         
         
//         }
//       } catch (e) {
//         console.error('Failed to load user info:', e);
//       }

//     };
//     const calculateCompletion = () => {
//       let percentage = 0;
//       if (loggedUser.firstName) percentage += 25;
//       if (loggedUser.lastName) percentage += 25;
//       if (loggedUser.profileInfo.game) percentage += 25;
//       if (loggedUser.profileInfo.sport) percentage += 25;
//       setCompletionPercentage(percentage);
//     }
//     calculateCompletion();
//     loadUserInfo();
//   }, []); // Empty dependency array means this effect runs only once, when the component mounts

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
//           <Text style={styles.backButtonText}>Back</Text>
//         </TouchableOpacity>
//         <Text style={styles.title}>Profile</Text>
//         <TouchableOpacity onPress={handleProfilePress} style={styles.profileButton}>
//           {/* <AntDesign name="adduser" size={24} color="black" /> */}
//         </TouchableOpacity>
//       </View>

//       {/* Profile picture under the header */}
//       <View style={styles.profilePictureSection}>
//         <View style={styles.profilePictureContainer}>
//           <Image
//             source={ProfilePicture}
//             style={styles.profilePicture}
//           />
//           <TouchableOpacity onPress={handleEditProfile} style={styles.editIconContainer}>
//             {/* <MaterialIcons name="edit" size={16} color="black" /> */}
//           </TouchableOpacity>
//         </View>

//         {/* Friends button and count */}
//         <TouchableOpacity onPress={handleFriendsPress} style={styles.friendsContainer}>
//           {/* <FontAwesome5 style={styles.friendsText} name="user-friends" size={24} color="black" /> */}
//           <Text style={styles.friendsCount}>Hello</Text>
//         </TouchableOpacity>

//         {/* Rating: One star and rating number */}
//         <View style={styles.ratingContainer}>
//           {/* <FontAwesome5 name="star" size={18} color={rating >= 1 ? "#FFD700" : "#ccc"} /> */}
//           <Text style={styles.ratingText}>{2}</Text> {/* Only show the rating value */}
//         </View>
//       </View>

//       {/* User's name */}
//       <Text style={styles.userName}>{loggedUser.firstName} {loggedUser.lastName}</Text>

//       {/* Profile completion progress bar */}
//       <View style={styles.progressBar}>
//         <ProgressBar
//           progress={completionPercentage / 100}
//           width={null}
//           height={10}
//           color="#007aff"
//           unfilledColor="#e0e0e0"
//         />
//       </View>

//       {/* Add the rest of the profile content here */}
     
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 40,
//     padding: 10,
//     backgroundColor: '#f8f8f8',
//   },
//   backButton: {
//     padding: 8,
//   },
//   backButtonText: {
//     fontSize: 16,
//     color: '#007aff',
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     flex: 1,
//     textAlign: 'center',
//   },
//   profileButton: {
//     padding: 8,
//   },
//   profilePictureSection: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 20,
//     paddingLeft: 10,
//   },
//   profilePictureContainer: {
//     position: 'relative',
//     width: 60,
//     height: 60,
//   },
//   profilePicture: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     borderWidth: 2,
//     borderColor: '#ccc',
//   },
//   editIconContainer: {
//     position: 'absolute',
//     bottom: 0,
//     right: 0,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 2,
//   },
//   friendsContainer: {
//     marginLeft: 15,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   friendsText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#007aff',
//   },
//   friendsCount: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#007aff',
//     marginLeft: 5,
//   },
//   ratingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginLeft: 15,
//   },
//   ratingText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginLeft: 5,
//     color: '#007aff',
//   },
//   userName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginTop: 20,
//   },
//   progressBar: {
//     marginTop: 20,
//     paddingHorizontal: 30,
//   },
// });

// export default Profile;


//