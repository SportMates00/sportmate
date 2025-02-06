import React, { useEffect, useState } from 'react';
import { 
  View, Text, TouchableOpacity, StyleSheet, Modal 
} from 'react-native';
import ProgressBar from "react-native-progress/Bar";
import { useDispatch } from "react-redux";
import { profileCompletePer } from "@/app/store/userSlice";
import ProfileCompletion from './ProfileCompletion';
import { Ionicons } from '@expo/vector-icons';

const ProgressBarbar = ({ loggedUser, progressPercentage }) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  
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
      setCountedFields(updatedFields);
    }
  }, [
    loggedUser.profileInfo.age,
    loggedUser.profileInfo.location,
    loggedUser.profileInfo.gender,
    loggedUser.profileInfo.profileImageUrl
  ]);

  return (
    <View>
      {/* Progress Bar Card */}
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressTitle}>Complete Your Profile</Text>
          <Text style={styles.progressPercentage}>{Math.round(progressPercentage * 100)}%</Text>
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

      {/* Modal for Profile Completion */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          <Text style={{color:'black', fontSize:22, paddingInline:20}}>Profile Completion</Text>
          <Text style={{paddingInline:20, marginBottom:20, marginTop:10}}>Complete your profile to be able to join and create events</Text>
            {/* Close Button */}
          
            
            {/* Progress Bar Inside Modal */}
            <TouchableOpacity style={styles.progressCard}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressTitle}>Complete Your Profile</Text>
                <Text style={styles.progressPercentage}>{Math.round(progressPercentage * 100)}%</Text>
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
            
            <ProfileCompletion loggedUser={loggedUser} setModalVisible={setModalVisible} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    height: "100%",
    backgroundColor: "#fff",
    padding: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
  },
});

export default ProgressBarbar;
