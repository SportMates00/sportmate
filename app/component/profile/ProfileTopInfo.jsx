import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import ProgressBar from "react-native-progress/Bar";
import favicon from "@/assets/images/favicon.png";

const TOTAL_STEPS = 6; // Change this as needed

const ProfileTopInfo = ({ loggedUser }) => {
  const [completedSteps, setCompletedSteps] = useState(3); // Example: 3/6 steps completed
  const progressPercentage = completedSteps / TOTAL_STEPS;
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
            {loggedUser.firstName} {loggedUser.lastName}
          </Text>

          <View style={styles.sportInfo}>
            <Text style={styles.sportLabel}>Favorite Sport:</Text>
            <Text style={styles.sportText}>{loggedUser.profileInfo.sport}</Text>
          </View>
          <View style={styles.sportInfo}>
            <Text style={styles.sportLabel}>Level:</Text>
            <Text style={styles.levelText}>{loggedUser.profileInfo.level}</Text>
          </View>
        </View>
      </View>

      {/* Profile Completion Card (Progress Bar) */}
      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressTitle}>
            {isCompleted ? "Profile Completed" : "Complete Your Profile"}
          </Text>
          <Text style={styles.progressPercentage}>
            {Math.round(progressPercentage * 100)}%
          </Text>
        </View>

        {/* Progress Bar */}
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
      </View>
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

export default ProfileTopInfo;
