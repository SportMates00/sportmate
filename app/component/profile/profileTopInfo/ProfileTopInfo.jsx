import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from "react-native";
import ProgressBarbar from "./ProgressBar";
import { useState } from "react";
import reviewStar from "../../../../assets/images/reviewStar.png";
import FriendsList from "./FriendsList";
import { useTheme } from "@/src/theme/themeContext";
import { useTranslation } from "react-i18next";

const TOTAL_STEPS = 8;
const ABOUT_LIMIT = 30;

const ProfileTopInfo = ({ loggedUser = {} }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [aboutModalVisible, setAboutModalVisible] = useState(false);

  const profileInfo = loggedUser.profileInfo || {};
  const aboutText = profileInfo.aboutMe || "";
  const isLongAbout = aboutText.length > ABOUT_LIMIT;

  const progressPercentage = (profileInfo.profileCompletePer || 0) / TOTAL_STEPS;
  const isCompleted = progressPercentage === 1;
  const [friendListModalVisible, setFriendListModalVisible] = useState(false);

  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { t } = useTranslation();

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
                <Image
                  source={{ uri: profileInfo.profileImageUrl }}
                  style={styles.profilePicture}
                />
              )}
            </View>
          </TouchableOpacity>
        </View>

        {/* Profile Details */}
        <View style={styles.profileDetails}>
          <Text style={styles.userName}>
            {loggedUser.firstName || "Unknown"} {loggedUser.lastName || "User"}
          </Text>

          <View style={{ flexDirection: "row", gap: 10 }}>
            <View style={styles.sportInfo}>
              <FriendsList
                loggedUser={loggedUser}
                setFriendListModalVisible={setFriendListModalVisible}
                friendListModalVisible={friendListModalVisible}
              />
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

          {/* ABOUT ME */}
          {aboutText !== "" && (
            <View style={styles.aboutContainer}>
              <Text style={styles.aboutText}>
                {isLongAbout
                  ? `${aboutText.slice(0, ABOUT_LIMIT)}...`
                  : aboutText}
              </Text>

              {isLongAbout && (
                <TouchableOpacity onPress={() => setAboutModalVisible(true)}>
                  <Text style={styles.readMoreText}>
                    {t("ReadMore")}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </View>

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

      {/* ABOUT ME MODAL */}
      <Modal
        visible={aboutModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setAboutModalVisible(false)}
      >
        <View style={styles.aboutModalOverlay}>
          <View style={styles.aboutModalBox}>
            <Text style={styles.aboutModalText}>{aboutText}</Text>

            <TouchableOpacity
              style={styles.closeAboutButton}
              onPress={() => setAboutModalVisible(false)}
            >
              <Text style={styles.closeAboutText}>
                {t("Close")}
              </Text>
            </TouchableOpacity>
          </View>
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
      paddingVertical: theme.spacing.medium,
      paddingInline: theme.spacing.large,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      margin: theme.spacing.medium,
    },
    profilePictureContainer: {
      alignItems: "center",
      justifyContent: "center",
    },
    profilePictureWrapper: {
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

    aboutContainer: {
    },
    aboutText: {
      fontSize: 14,
      color: theme.colors.text,
    },
    readMoreText: {
      marginTop: 4,
      fontSize: 13,
      color: theme.colors.primary,
      fontWeight: "bold",
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

    aboutModalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      alignItems: "center",
      justifyContent: "center",
    },
    aboutModalBox: {
      width: "80%",
      height: "50%",
      backgroundColor: theme.colors.background,
      borderRadius: theme.radius.medium,
      padding: theme.spacing.large,
      justifyContent: "space-between",
    },
    aboutModalText: {
      fontSize: 14,
      color: theme.colors.text,
    },
    closeAboutButton: {
      alignSelf: "center",
      marginTop: theme.spacing.medium,
    },
    closeAboutText: {
      fontSize: 14,
      color: theme.colors.primary,
      fontWeight: "bold",
    },
  });

export default ProfileTopInfo;
