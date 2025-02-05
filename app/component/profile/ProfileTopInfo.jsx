import { View, Text, StyleSheet, Image } from "react-native";
import favicon from "@/assets/images/favicon.png";
import ProgressBarbar from "./ProgressBar";
import { useState } from "react";

const TOTAL_STEPS = 8; // Total steps for 100% profile completion

const ProfileTopInfo = ({ loggedUser = {} }) => {
  const profileInfo = loggedUser.profileInfo || {}; // Ensure profileInfo exists
  const progressPercentage = (profileInfo.profileCompletePer || 0) / TOTAL_STEPS;
  const isCompleted = progressPercentage === 1;
  return (
    <View>
      {/* Profile Info Section */}
      <View style={styles.cardContainer}>
        <Image
          source={favicon} // Replace with actual profile picture
          style={styles.profilePicture}
        />
        <View style={styles.profileDetails}>
          <Text style={styles.userName}>
            {loggedUser.firstName || "Unknown"} {loggedUser.lastName || "User"}
          </Text>

          <View style={styles.sportInfo}>
            <Text style={styles.sportLabel}>Favorite Sport:</Text>
            <Text style={styles.sportText}>{profileInfo.sport || "N/A"}</Text>
          </View>
          <View style={styles.sportInfo}>
            <Text style={styles.sportLabel}>Level:</Text>
            <Text style={styles.levelText}>{profileInfo.level || "N/A"}</Text>
          </View>
        </View>
      </View>
      {!isCompleted && <ProgressBarbar loggedUser={loggedUser} progressPercentage={progressPercentage}/>};
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    margin: 20,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#ddd",
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
    marginVertical: 5,
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
  
});

export default ProfileTopInfo;