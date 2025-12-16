import { setUserInfo } from '@/src/store/userSlice';
import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import StepBar from './StepBar';

const { width } = Dimensions.get('window');
const BUTTON_WIDTH = width * 0.42;

const QLevel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userInfo = useSelector(state => state.user);

  const { mainSport, sportsList } = userInfo.profileInfo;

  const [selectedLevel, setSelectedLevel] = useState('');

  /* ================= FIND MAIN SPORT ================= */
  const mainSportObject = useMemo(() => {
    return sportsList.find(
      item => item.sportName === mainSport
    );
  }, [sportsList, mainSport]);

  /* ================= LEVELS ================= */
  const levels = [
    { id: 'Starter', label: t('Starter') },
    { id: 'Beginner', label: t('Beginner') },
    { id: 'LowerIntermediate', label: t('LowerIntermediate') },
    { id: 'Intermediate', label: t('Intermediate') },
    { id: 'Advanced', label: t('Advanced') },
    { id: 'Professional', label: t('Professional') },
  ];

  const levelDescription = {
    Starter: t('StarterDescription'),
    Beginner: t('BeginnerDescription'),
    LowerIntermediate: t('LowerIntermediateDescription'),
    Intermediate: t('IntermediateDescription'),
    Advanced: t('AdvancedDescription'),
    Professional: t('ProfessionalDescription'),
  };

  /* ================= HANDLE SELECTION ================= */
  const handleSelect = (item) => {
    setSelectedLevel(item.id);

    const updatedSportsList = sportsList.map(sport =>
      sport.sportName === mainSport
        ? { ...sport, sportLevel: item.id }
        : sport
    );

    dispatch(
      setUserInfo({
        profileInfo: {
          ...userInfo.profileInfo,
          sportsList: updatedSportsList,
        },
      })
    );
  };

  const isNextEnabled = selectedLevel !== '';

  /* ================= HEADER ================= */
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerShadowVisible: false,
      headerBackButtonDisplayMode: 'minimal',
      headerBackTitleVisible: false,
      headerBackTitle: '',
      headerStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
      },
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StepBar step={2} />

      <View style={styles.centerContent}>
        <Text style={styles.questionText}>{t('yourLevel')}</Text>
        <Text style={styles.subText}>{t('scrollLevel')}</Text>

        {/* MAIN SPORT DISPLAY */}
        {mainSportObject && (
          <View style={styles.sportDetails}>
            <Image
              source={mainSportObject.sportIcon}
              style={{ width: 40, height: 40 }}
            />
            <Text style={styles.sportName}>
              {t(mainSportObject.sportName)}
            </Text>
          </View>
        )}

        {/* LEVEL OPTIONS */}
        <View style={styles.buttonsWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          >
            {levels.map(item => {
              const isSelected = selectedLevel === item.id;

              return (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.optionButton,
                    { backgroundColor: isSelected ? '#4CAF50' : 'white' },
                  ]}
                  onPress={() => handleSelect(item)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      { color: isSelected ? 'white' : '#000' },
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* DESCRIPTION */}
        {selectedLevel !== '' && (
          <View style={styles.descriptionBox}>
            <Text style={styles.descriptionText}>
              {levelDescription[selectedLevel]}
            </Text>
          </View>
        )}
      </View>

      {/* NEXT BUTTON */}
      <TouchableOpacity
        disabled={!isNextEnabled}
        style={[
          styles.nextButton,
          { backgroundColor: isNextEnabled ? '#4CAF50' : '#A5D6A7' },
        ]}
        onPress={() => isNextEnabled && navigation.navigate('QSchedule')}
      >
        <Text style={styles.nextText}>{t('next')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QLevel;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: 'white',
  },
  centerContent: {
    padding: 20,
  },
  scrollContainer: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 16,
  },
  questionText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    color: '#333',
  },
  subText: {
    fontSize: 14,
    marginBottom: 20,
  },
  buttonsWrapper: {
    marginBottom: 20,
  },
  optionButton: {
    width: BUTTON_WIDTH,
    paddingVertical: 14,
    borderRadius: 8,
    borderColor: 'silver',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 14,
    textAlign: 'center',
  },
  descriptionBox: {
    marginTop: 10,
    backgroundColor: '#F2F2F2',
    padding: 14,
    borderRadius: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: '#333',
  },
  nextButton: {
    position: 'absolute',
    bottom: 60,
    borderRadius: 5,
    borderColor: 'silver',
    borderWidth: 1,
    height: 55,
    width: '90%',
    marginLeft: '5%',
    justifyContent: 'center',
  },
  nextText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 2,
  },
  sportDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
    marginTop: 40,
  },
  sportName: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1,
  },
});
