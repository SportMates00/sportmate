import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from "react-native";
import ProgressBarbar from "./ProgressBar";
import { useState } from "react";
import reviewStar from "../../../../assets/images/reviewStar.png";
import { useTheme } from "@/src/theme/themeContext";
import { useTranslation } from "react-i18next";
import { friendsB } from "@/assets/images/images";
import { useNavigation } from "@react-navigation/native";

const TOTAL_STEPS = 8;
const ABOUT_LIMIT = 70;

const ProfileTopInfo = ({ loggedUser = {} }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const navigation = useNavigation();
  const profileInfo = loggedUser.profileInfo || {};
  const aboutText = profileInfo.aboutMe || "";
  const isLongAbout = aboutText.length > ABOUT_LIMIT;
  const progressPercentage = (profileInfo.profileCompletePer || 0) / TOTAL_STEPS;
  const isCompleted = progressPercentage === 1;
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { t } = useTranslation();

  return (
    <View>
      {/* Profile Info Section */}
      <View style={styles.cardContainer}>
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
                <Image
                  source={{ uri: profileInfo.profileImageUrl }}
                  style={styles.profilePicture}
                />
              )}
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.profileDetails}>
          <Text style={styles.userName}>
            {loggedUser.firstName || "Unknown"}
          </Text>

          <View style={{ flexDirection: "row", gap: 10 }}>
            <View style={styles.sportInfo}>
              <TouchableOpacity onPress={() => navigation.navigate('FriendsList')}>
                <Image source={friendsB} />
              </TouchableOpacity>
              <Text style={styles.sportText}>
                {profileInfo.friendsList.length === 0
                  ? "-"
                  : profileInfo.friendsList.length}
              </Text>
            </View>

            <View style={styles.sportInfo}>
              <Text style={styles.sportLabel}>
                <Image source={reviewStar} />
              </Text>
              <Text style={styles.levelText}>4.7</Text>
            </View>
          </View>
        </View>
      </View>

      {/* ABOUT ME (INLINE EXPAND) */}
      {aboutText !== "" && (
        <View style={{ marginHorizontal: theme.spacing.large }}>
          <Text style={styles.aboutText}>
            {isAboutExpanded || !isLongAbout
              ? aboutText
              : `${aboutText.slice(0, ABOUT_LIMIT)}... `}
            {isLongAbout && (
              <Text
                style={styles.readMoreText}
                onPress={() => setIsAboutExpanded(prev => !prev)}
              >
                {isAboutExpanded ? ` ${t("ReadLess")}` : t("ReadMore")}
              </Text>
            )}
          </Text>
        </View>
      )}

      {!isCompleted && (
        <ProgressBarbar
          loggedUser={loggedUser}
          progressPercentage={progressPercentage}
        />
      )}

      {/* Profile Picture Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackground}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
          >
            <View style={styles.modalContent}>
              {profileInfo.profileImageUrl !== "" ? (
                <Image
                  source={{ uri: profileInfo.profileImageUrl }}
                  style={styles.enlargedImage}
                />
              ) : (
                <View style={styles.enlargedPlaceholder}>
                  <Text style={styles.enlargedInitial}>
                    {loggedUser.firstName !== ""
                      ? loggedUser.firstName.charAt(0).toUpperCase()
                      : "?"}
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

const getStyles = (theme) =>
  StyleSheet.create({
    cardContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.background,
      gap: 40,
      padding:30
    },
    modalOverlay: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(0,0,0,0.7)",
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
    profilePictureWrapper: { width: 140, height: 140, borderRadius: 4444, overflow: "hidden" },
    profilePicture: { width: "100%", height: "100%" },
    profilePlaceholder: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: theme.colors.primary },
    profileInitial: { fontSize: 40, color: theme.colors.buttonText, fontWeight: "bold" },
    profileDetails: { flex: 1, marginLeft: theme.spacing.medium },
    userName: { fontSize: 28, fontWeight: "bold", color: theme.colors.text },
    sportInfo: { flexDirection: "row", marginVertical: theme.spacing.medium },
    sportText: { fontSize: 14, color: theme.colors.text },
    levelText: { fontSize: 14, color: theme.colors.text },
    aboutText: { fontSize: 14, color: theme.colors.text },
    readMoreText: { color: theme.colors.primary, fontWeight: "bold" },
  });

export default ProfileTopInfo;
