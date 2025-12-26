import React, { useEffect, useState } from 'react';
import { 
  View, Text, TouchableOpacity, StyleSheet, Modal 
} from 'react-native';
import ProgressBar from "react-native-progress/Bar";
import { useDispatch } from "react-redux";
import ProfileCompletion from './ProfileCompletion';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/src/theme/themeContext';
import { useTranslation } from 'react-i18next';
import { setProfileCompletion } from '@/src/store/usersSlice';

const TOTAL_STEPS = 8;

const ProgressBarbar = ({ loggedUser, progressPercentage }) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const {t} = useTranslation();

  /* 
    ALWAYS RECALCULATE COMPLETED STEPS 
    so Redux + UI always stay in sync
  */
  useEffect(() => {

    const count = [
      !!loggedUser.firstName?.trim(),
      !!loggedUser.lastName?.trim(),
      !!loggedUser.profileInfo.mainSport,
      true, // availability always valid
      !!loggedUser.profileInfo.age,
      !!loggedUser.profileInfo.location,
      !!loggedUser.profileInfo.gender,
      !!loggedUser.profileInfo.profileImageUrl,
    ].filter(Boolean).length;

    dispatch(
      setProfileCompletion({
        userId: loggedUser.id,
        percentage: count  // 🔥 STORED AS STEP COUNT (0–8)
      })
    );

  }, [
    loggedUser.firstName,
    loggedUser.lastName,
    loggedUser.profileInfo.mainSport,
    loggedUser.profileInfo.age,
    loggedUser.profileInfo.location,
    loggedUser.profileInfo.gender,
    loggedUser.profileInfo.profileImageUrl
  ]);


  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressTitle}>{t('completeProfileTitle')}</Text>
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

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={theme.colors.text} />
            </TouchableOpacity>

            <Text style={{color:theme.colors.text, fontSize:22, paddingInline:20}}>
              {t('profileCompletion')}
            </Text>

            <Text style={{color:theme.colors.text,paddingInline:20, marginBottom:20, marginTop:10}}>
              {t('profileCompletionCaption')}
            </Text>

            <TouchableOpacity style={styles.progressCard}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressTitle}>{t('completeProfileTitle')}</Text>
                <Text style={styles.progressPercentage}>{Math.round(progressPercentage * 100)}%</Text>
              </View>

              <ProgressBar
                progress={progressPercentage}
                width={null}
                height={10}
                borderRadius={theme.radius.semiCircle}
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

const getStyles = (theme) => StyleSheet.create({
  // 🔥 KEEPING YOUR ORIGINAL STYLES UNTOUCHED
  progressCard: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.semiCircle,
    padding: theme.spacing.medium,
    marginHorizontal: theme.spacing.medium,
    marginTop: theme.spacing.small,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.small,
  },
  progressTitle: {
    fontSize: theme.fonts.size.medium,
    fontWeight: "bold",
    color: theme.colors.buttonText,
  },
  progressPercentage: {
    fontSize: theme.fonts.size.medium,
    fontWeight: "bold",
    color: theme.colors.buttonText,
  },
  progressBar: {
    height: 10,
    borderRadius: theme.radius.semiCircle,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContainer: {
    height: "100%",
    backgroundColor: theme.colors.background,
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
