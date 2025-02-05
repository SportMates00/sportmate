import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native'
import React from 'react'
import ProgressBar from "react-native-progress/Bar";
import { profileCompletePer } from "@/app/store/userSlice";
import { useDispatch } from "react-redux";
import  { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import ProfileCompletion from './ProfileCompletion';


const ProgressBarbar = ({loggedUser, progressPercentage}) => {
      const dispatch = useDispatch();
      const navigation = useNavigation();
      const [modalVisible, setModalVisible] = useState(false);
      // Track which fields have already been counted
      const [countedFields, setCountedFields] = useState({
        age: loggedUser.profileInfo.age !== '',
        location: loggedUser.profileInfo.location !== '',
        gender: loggedUser.profileInfo.gender !== '',
        profileImageUrl: loggedUser.profileInfo.profileImageUrl !== '',
      });
    console.log('outside effect', loggedUser)
      useEffect(() => {
        let updatedFields = { ...countedFields };
        let countIncrement = 0;
    
        // Check if each field is filled for the first time
        if (!countedFields.age && loggedUser.profileInfo.age !== '') {
          updatedFields.age = true;
          countIncrement += 1;
        }
        if (!countedFields.location && loggedUser.profileInfo.location !== '') {
          updatedFields.location = true;
          countIncrement += 1;
        }
        if (!countedFields.gender && loggedUser.profileInfo.gender !== '') {
          updatedFields.gender = true;
          countIncrement += 1;
        }
        if (!countedFields.profileImageUrl && loggedUser.profileInfo.profileImageUrl !== '') {
          updatedFields.profileImageUrl = true;
          countIncrement += 1;
        }
    
        // Dispatch update only if there's an increment
        if (countIncrement > 0) {
          dispatch(profileCompletePer(loggedUser.profileInfo.profileCompletePer + countIncrement));
          setCountedFields(updatedFields); // Update the local state to prevent re-counting
        }
        console.log('inside effect', loggedUser)
      }, [
        loggedUser.profileInfo.age,
        loggedUser.profileInfo.location,
        loggedUser.profileInfo.gender,
        loggedUser.profileInfo.profileImageUrl
      ]);
  
  return (
    <View>
     
     <TouchableOpacity onPress={() => setModalVisible(true)}
                    style={styles.progressCard}>
                      <View style={styles.progressHeader}>
                        <Text style={styles.progressTitle}>Complete Your Profile</Text>
                        <Text style={styles.progressPercentage}>
                          {Math.round(progressPercentage * 100)}%
                        </Text>
                      </View>
                       <ProgressBar
                                         progress={progressPercentage}
                                         width={null}
                                         height={10}
                                         borderRadius={5}
                                         color="#fff"
                                         unfilledColor="rgba(255, 255, 255, 0.3)"
                                         borderWidth={0}
                                         style={styles.progressBar}
                                       />
                    </TouchableOpacity>
                
      <Modal
            visible={modalVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}
          >
          <ProfileCompletion />

      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
     /* Progress Card Styles */
   progressCard: {
    backgroundColor: "#00AEEF",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginTop: 10,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
  },
});
export default ProgressBarbar;