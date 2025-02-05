import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import ProgressBar from "react-native-progress/Bar";
import { profileCompletePer } from "@/app/store/userSlice";
import { useDispatch } from "react-redux";
import  { useEffect, useState } from "react";


const ProgressBarbar = ({loggedUser}) => {
      const dispatch = useDispatch();
    
      
      // Track which fields have already been counted
      const [countedFields, setCountedFields] = useState({
        age: loggedUser.profileInfo.age !== '',
        location: loggedUser.profileInfo.location !== '',
        gender: loggedUser.profileInfo.gender !== '',
        profileImageUrl: loggedUser.profileInfo.profileImageUrl !== '',
      });
    
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
      }, [
        loggedUser.profileInfo.age,
        loggedUser.profileInfo.location,
        loggedUser.profileInfo.gender,
        loggedUser.profileInfo.profileImageUrl
      ]);
    
      const handleProgressBar = () => {
        navigation.navigate('ProfileCompletion');
      };
  return (
    <View>
     
      
                {/* Progress Bar */}
                
             
    </View>
  )
}

const styles = StyleSheet.create({
    
});
export default ProgressBarbar;