import React, { useState, useMemo } from 'react';
import {
  basketballSportIcon,
  footballSportIcon,
  hikingSportIcon,
  pingPongSportIcon,
  tennisSportIcon,
} from '@/assets/sportIcons/sportIcons';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/src/theme/themeContext';
import { useDispatch } from 'react-redux';
import { editUserInfo } from '@/src/store/authSlice';

const MODAL_HEIGHT = Dimensions.get('window').height * 0.5;

const AddSportModal = ({ visible, onClose, userInfo, setUserInfo }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const dispatch = useDispatch();

  /* ---------------- STATE ---------------- */
  const [step, setStep] = useState(1); // 1 = sport, 2 = level
  const [selectedSport, setSelectedSport] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);

  /* ---------------- DATA ---------------- */
  const sports = [
    { sportName: 'Football', sportIcon: footballSportIcon },
    { sportName: 'Basketball', sportIcon: basketballSportIcon },
    { sportName: 'Tennis', sportIcon: tennisSportIcon },
    { sportName: 'PingPong', sportIcon: pingPongSportIcon },
    { sportName: 'Hiking', sportIcon: hikingSportIcon },
  ];

  const levels = [
    'Starter',
    'Beginner',
    'LowerIntermediate',
    'Intermediate',
    'Advanced',
    'Professional',
  ];

  /* ---------------- FILTER EXISTING SPORTS ---------------- */
  const existingSports = useMemo(() => {
    return [
      userInfo.profileInfo.mainSport,
      ...userInfo.profileInfo.sportsList.map(s => s.sportName),
    ];
  }, [userInfo]);

  const availableSports = useMemo(() => {
    return sports.filter(
      sport => !existingSports.includes(sport.sportName)
    );
  }, [sports, existingSports]);

  /* ---------------- HELPERS ---------------- */
  const resetState = () => {
    setStep(1);
    setSelectedSport(null);
    setSelectedLevel(null);
  };

  const handleCancel = () => {
    resetState();
    onClose();
  };

  const canSave = selectedSport && selectedLevel;

  const handleSave = () => {
    if (!canSave) return;

    const updatedProfile = {
      ...userInfo.profileInfo,
      sportsList: [
        ...userInfo.profileInfo.sportsList,
        {
          sportName: selectedSport,
          sportLevel: selectedLevel,
        },
      ],
    };

    dispatch(editUserInfo({ profileInfo: updatedProfile }));
    setUserInfo(prev => ({ ...prev, profileInfo: updatedProfile }));

    resetState();
    onClose();
  };

  /* ---------------- UI ---------------- */
  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* TITLE */}
          <Text style={styles.title}>
            {step === 1 ? t('ChooseSport') : t('ChooseLevel')}
          </Text>

          {/* STEP INDICATOR */}
          <View style={styles.stepIndicator}>
            <View
              style={[
                styles.stepDot,
                { backgroundColor: step === 1 ? theme.colors.primary : '#ccc' },
              ]}
            />
            <View
              style={[
                styles.stepDot,
                { backgroundColor: step === 2 ? theme.colors.primary : '#ccc' },
              ]}
            />
          </View>

          {/* CONTENT */}
          <ScrollView style={styles.list}>
            {step === 1 &&
              availableSports.map(item => (
                <TouchableOpacity
                  key={item.sportName}
                  style={styles.item}
                  onPress={() => {
                    setSelectedSport(item.sportName);
                    setStep(2);
                  }}
                >
                  <Image source={item.sportIcon} style={styles.sportIcon} />
                  <Text style={styles.itemText}>
                    {t(item.sportName)}
                  </Text>
                </TouchableOpacity>
              ))}

            {step === 2 &&
              levels.map(level => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.item,
                    selectedLevel === level && {
                      borderColor: theme.colors.primary,
                      borderWidth: 1,
                    },
                  ]}
                  onPress={() => setSelectedLevel(level)}
                >
                  <Text style={styles.itemText}>
                    {t(level)}
                  </Text>
                </TouchableOpacity>
              ))}
          </ScrollView>

          {/* FOOTER */}
          {step === 1 && (
            <View style={styles.footer}>
              <TouchableOpacity
                onPress={handleCancel}
                style={styles.cancelBtn}
              >
                <Text style={styles.cancelText}>{t('Cancel')}</Text>
              </TouchableOpacity>
            </View>
          )}

          {step === 2 && (
            <View style={styles.footerSecond}>
              <TouchableOpacity
                onPress={resetState}
                style={styles.cancelBtn}
              >
                <Text style={styles.backText}>{t('back')}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSave}
                disabled={!canSave}
                style={[
                  styles.saveBtn,
                  {
                    backgroundColor: canSave
                      ? theme.colors.primary
                      : 'rgba(36,163,76,0.4)', // light green (locked)
                  },
                ]}
              >
                <Text style={styles.saveText}>
                  {t('saveEditProfile')}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default AddSportModal;

/* ---------------- STYLES ---------------- */
const getStyles = (theme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
      justifyContent: 'flex-end',
    },
    modal: {
      height: MODAL_HEIGHT,
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
    },
    title: {
      fontSize: theme.fonts.size.large,
      fontWeight: 'bold',
      textAlign: 'center',
      color: theme.colors.text,
    },
    stepIndicator: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 12,
      gap: 8,
    },
    stepDot: {
      width: 30,
      height: 4,
      borderRadius: 4,
    },
    list: {
      flex: 1,
    },
    item: {
      paddingVertical: 14,
      paddingHorizontal: 10,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    itemText: {
      fontSize: 16,
      color: theme.colors.text,
    },
    footer: {
      marginTop: 12,
    },
    footerSecond: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    backText: {
      color: theme.colors.primary,
      fontSize: 16,
      textAlign: 'center',
      paddingVertical: 10,
      paddingHorizontal: 30,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: theme.colors.primary,
    },
    cancelBtn: {
      alignItems: 'center',
    },
    cancelText: {
      color: theme.colors.primary,
      fontSize: 16,
      textAlign: 'center',
      paddingVertical: 10,
      paddingHorizontal: 30,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: theme.colors.primary,
      width: '60%',
    },
    saveBtn: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
    },
    saveText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    sportIcon: {
      width: 30,
      height: 30,
    },
  });
