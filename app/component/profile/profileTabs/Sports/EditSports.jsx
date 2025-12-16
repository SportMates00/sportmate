import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { editUserInfo } from '@/src/store/userSlice';
import { useDispatch } from 'react-redux';
import { useTheme } from '@/src/theme/themeContext';
import { useTranslation } from 'react-i18next';

const EditSports = ({
  openEditSport,
  setOpenEditSport,
  sport,
  userInfo,
  setUserInfo,
}) => {
  // Safety guard
  if (!sport) return null;

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const [openLevelModal, setOpenLevelModal] = useState(false);

  const isMainSport =
    sport.sportName === userInfo.profileInfo.mainSport;

  const levels = [
    { id: 'Starter', label: t('Starter') },
    { id: 'Beginner', label: t('Beginner') },
    { id: 'LowerIntermediate', label: t('LowerIntermediate') },
    { id: 'Intermediate', label: t('Intermediate') },
    { id: 'Advanced', label: t('Advanced') },
    { id: 'Professional', label: t('Professional') },
  ];

  /* ================= SET AS MAIN SPORT ================= */
  const setAsMainSport = () => {
    const updatedProfileInfo = {
      ...userInfo.profileInfo,
      mainSport: sport.sportName,
    };

    dispatch(editUserInfo({ profileInfo: updatedProfileInfo }));
    setUserInfo(prev => ({ ...prev, profileInfo: updatedProfileInfo }));

    setOpenEditSport(false);
  };

  /* ================= CHANGE LEVEL ================= */
  const changeLevel = (newLevel) => {
    const updatedSportsList = userInfo.profileInfo.sportsList.map(item =>
      item.id === sport.id
        ? { ...item, sportLevel: newLevel }
        : item
    );

    const updatedProfileInfo = {
      ...userInfo.profileInfo,
      sportsList: updatedSportsList,
    };

    dispatch(editUserInfo({ profileInfo: updatedProfileInfo }));
    setUserInfo(prev => ({ ...prev, profileInfo: updatedProfileInfo }));

    setOpenLevelModal(false);
    setOpenEditSport(false);
  };

  /* ================= REMOVE SPORT ================= */
  const removeSport = () => {
    if (isMainSport) return;

    const updatedProfileInfo = {
      ...userInfo.profileInfo,
      sportsList: userInfo.profileInfo.sportsList.filter(
        item => item.id !== sport.id
      ),
    };

    dispatch(editUserInfo({ profileInfo: updatedProfileInfo }));
    setUserInfo(prev => ({ ...prev, profileInfo: updatedProfileInfo }));

    setOpenEditSport(false);
  };

  return (
    <View>
      {openEditSport && (
        <Modal transparent animationType="slide">
          <TouchableOpacity
            style={styles.modalOverlay}
            onPress={() => setOpenEditSport(false)}
          />

          <View style={styles.modalContent}>
            {!isMainSport && (
              <TouchableOpacity
                style={styles.modalButton}
                onPress={setAsMainSport}
              >
                <Text style={styles.modalButtonText}>
                  {t('setMainSport')}
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setOpenLevelModal(true)}
            >
              <Text style={styles.modalButtonText}>
                {t('changeLevel')}
              </Text>
            </TouchableOpacity>

            {!isMainSport && (
              <TouchableOpacity
                style={styles.modalButton}
                onPress={removeSport}
              >
                <Text style={styles.modalButtonText}>
                  {t('removeSport')}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.cancelContent}>
            <TouchableOpacity onPress={() => setOpenEditSport(false)}>
              <Text style={styles.closeButton}>
                {t('cancelEditProfile')}
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}

      {openLevelModal && (
        <Modal transparent animationType="fade">
          <TouchableOpacity
            style={styles.modalOverlay}
            onPress={() => setOpenLevelModal(false)}
          />
          <View style={styles.modalContent}>
            {levels.map(level => (
              <TouchableOpacity
                key={level.id}
                style={styles.modalButton}
                onPress={() => changeLevel(level.id)}
              >
                <Text style={styles.modalButtonText}>
                  {level.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>
      )}
    </View>
  );
};

export default EditSports;

/* ================= STYLES (UNCHANGED) ================= */

const getStyles = (theme) =>
  StyleSheet.create({
    modalOverlay: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: theme.colors.text,
      opacity: 0.5,
    },
    modalContent: {
      position: 'absolute',
      bottom: 70,
      width: '80%',
      alignSelf: 'center',
      backgroundColor: theme.colors.background,
      borderRadius: theme.radius.semiCircle,
      padding: theme.spacing.large,
      alignItems: 'center',
    },
    modalButton: {
      width: '100%',
      padding: 15,
      alignItems: 'center',
      marginVertical: 10,
    },
    modalButtonText: {
      color: theme.colors.primary,
      fontSize: theme.fonts.size.medium,
    },
    cancelContent: {
      position: 'absolute',
      bottom: 20,
      width: '80%',
      height: 40,
      alignSelf: 'center',
      backgroundColor: theme.colors.primary,
      borderRadius: theme.radius.semiCircle,
      justifyContent: 'center',
      alignItems: 'center',
    },
    closeButton: {
      color: theme.colors.buttonText,
    },
  });
