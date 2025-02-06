import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from "react-native";
import favicon from "@/assets/images/favicon.png";
import ProgressBarbar from "./ProgressBar";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons"; // Icon for closing the modal
import reviewStar from "../../../../assets/images/reviewStar.png"
import FriendsList from "./FriendsList";

const TOTAL_STEPS = 8; // Total steps for 100% profile completion

const ProfileTopInfo = ({ loggedUser = {} }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const profileInfo = loggedUser.profileInfo || {}; // Ensure profileInfo exists
  const progressPercentage = (profileInfo.profileCompletePer || 0) / TOTAL_STEPS;
  const isCompleted = progressPercentage === 1;
  const [friendListModalVisible, setFriendListModalVisible] = useState(false);
  return (
    <View>
      {/* Profile Info Section */}
      <View style={styles.cardContainer}>
        {/* Profile Picture */}
        <View style={styles.profilePictureContainer}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View style={styles.profilePictureWrapper}>
              {profileInfo.profileImageUrl === "" ? (
                <View style={styles.profilePlaceholder}>
                  <Text style={styles.profileInitial}>
                    {loggedUser.firstName !== ""
                      ? loggedUser.firstName.charAt(0).toUpperCase()
                      : "?"}
                  </Text>
                </View>
              ) : (
                <Image source={{ uri: profileInfo.profileImageUrl }} style={styles.profilePicture} />
              )}
            </View>
          </TouchableOpacity>
        </View>
          {/* Profile First Name and Last name */}
        <View style={styles.profileDetails}>
          <Text style={styles.userName}>
            {loggedUser.firstName || "Unknown"} {loggedUser.lastName || "User"}
          </Text>
          {/* Friends list icon and review icon with rating*/}
          <View style={{display:'flex', flexDirection:'row', gap:10}}>
            <View style={styles.sportInfo}>
              <FriendsList loggedUser={loggedUser} setFriendListModalVisible={setFriendListModalVisible} friendListModalVisible={friendListModalVisible}/>
              <Text style={styles.sportText}>{profileInfo.friendsList.length == 0 ? '-' : profileInfo.friendsList.length}</Text>
            </View>
            <View style={styles.sportInfo}>
              <Text style={styles.sportLabel}><Image source={reviewStar}/></Text>
              <Text style={styles.levelText}>4.7</Text>
            </View>
          </View>

        </View>
      </View>

      {!isCompleted && <ProgressBarbar loggedUser={loggedUser} progressPercentage={progressPercentage} />}

      {/* Profile Picture Modal */}
      <Modal visible={modalVisible} transparent={true} animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.modalBackground} activeOpacity={1} onPress={() => setModalVisible(false)}>
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <Ionicons name="close" size={30} color="#fff" />
              </TouchableOpacity>
              {profileInfo.profileImageUrl !== "" ? (
                <Image source={{ uri: profileInfo.profileImageUrl }} style={styles.enlargedImage} />
              ) : (
                <View style={styles.enlargedPlaceholder}>
                  <Text style={styles.enlargedInitial}>
                    {loggedUser.firstName !== "" ? loggedUser.firstName.charAt(0).toUpperCase() : "?"}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    gap:40,
    paddingVertical: 15,
    paddingInline:35,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    margin: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky", // Sticky behavior
    top: 0,
    zIndex: 1000,
  },
  profilePictureContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  profilePictureWrapper: {
    position: "relative",
    width: 120,
    height: 120,
    borderRadius: 4000,
    overflow: "hidden",
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
  },
  profilePicture: {
    width: "100%",
    height: "100%",
  },
  profilePlaceholder: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007AFF",
  },
  profileInitial: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
  },
  profileDetails: {
    flex: 1,
    marginLeft: 15,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  sportInfo: {
    flexDirection: "row",
    marginVertical: 20,
  },
  sportLabel: {
    fontSize: 14,
    color: "#555",
    fontWeight: "bold",
    marginRight: 5,
  },
  sportText: {
    fontSize: 14,
    color: "#555",
  },
  levelText: {
    fontSize: 14,
    color: "#777",
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalBackground: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: -40,
    right: -40,
    padding: 10,
  },
  enlargedImage: {
    width: 300,
    height: 300,
    borderRadius: 1000,
    borderWidth: 3,
    borderColor: "#fff",
  },
  enlargedPlaceholder: {
    width: 300,
    height: 300,
    borderRadius: 1000,
    backgroundColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
  },
  enlargedInitial: {
    fontSize: 64,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ProfileTopInfo;
