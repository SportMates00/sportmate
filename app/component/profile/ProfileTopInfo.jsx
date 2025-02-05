import { View, Text, StyleSheet, Image } from "react-native";
import favicon from "@/assets/images/favicon.png";
import ProgressBarbar from "./ProgressBar";

const TOTAL_STEPS = 8; // Total steps for 100% profile completion

const ProfileTopInfo = ({ loggedUser = {} }) => {
  const profileInfo = loggedUser.profileInfo || {}; // Ensure profileInfo exists
  const progressPercentage = (profileInfo.profileCompletePer || 0) / TOTAL_STEPS;
  
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
      {!isCompleted && (
                    <TouchableOpacity onPress={handleProgressBar}
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
                )};
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