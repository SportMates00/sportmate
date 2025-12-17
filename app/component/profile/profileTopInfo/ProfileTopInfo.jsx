import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from "react-native";
import ProgressBarbar from "./ProgressBar";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons"; // Icon for closing the modal
import reviewStar from "../../../../assets/images/reviewStar.png"
import FriendsList from "./FriendsList";
import { useTheme } from "@/src/theme/themeContext";

const TOTAL_STEPS = 8; // Total steps for 100% profile completion

const ProfileTopInfo = ({ loggedUser = {} }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const profileInfo = loggedUser.profileInfo || {}; // Ensure profileInfo exists
  const progressPercentage = (profileInfo.profileCompletePer || 0) / TOTAL_STEPS;
  const isCompleted = progressPercentage === 1;
  const [friendListModalVisible, setFriendListModalVisible] = useState(false);
  const { theme } = useTheme(); // Get current theme and toggle (if needed)
  const styles = getStyles(theme); // Generate dynamic styles based on current theme
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
                <Ionicons name="close" size={30} color={theme.colors.text} />
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
const getStyles = (theme) => StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.background,
    gap:40,
    paddingVertical: theme.spacing.medium,
    paddingInline:theme.spacing.large,
    
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    margin: theme.spacing.medium,
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
    borderRadius: theme.radius.circle,
    overflow: "hidden",
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
    backgroundColor: theme.colors.primary,
  },
  profileInitial: {
    fontSize: theme.fonts.size.xLarge,
    color: theme.colors.buttonText,
    fontWeight: "bold",
  },
  profileDetails: {
    flex: 1,
    marginLeft: theme.spacing.medium,
  },
  userName: {
    fontSize: theme.fonts.size.medium,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  sportInfo: {
    flexDirection: "row",
    marginVertical: theme.spacing.medium,
  },
  sportLabel: {
    fontSize: theme.fonts.size.medium,
    color:theme.colors.text,
    fontWeight: "bold",
    marginRight: theme.spacing.small,
  },
  sportText: {
    fontSize: 14,
    color: theme.colors.text,
  },
  levelText: {
    fontSize: 14,
    color: theme.colors.text,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
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
    padding: theme.spacing.small,
  },
  enlargedImage: {
    width: 300,
    height: 300,
    borderRadius: theme.radius.circle,
    borderWidth: 3,
    borderColor: "#fff",
  },
  enlargedPlaceholder: {
    width: 300,
    height: 300,
    borderRadius: theme.radius.circle,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  enlargedInitial: {
    fontSize: 64,
    color: theme.colors.buttonText,
    fontWeight: "bold",
  },
});

export default ProfileTopInfo;
