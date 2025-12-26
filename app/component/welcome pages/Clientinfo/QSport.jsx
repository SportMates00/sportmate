import {
  basketballSportIcon,
  footballSportIcon,
  hikingSportIcon,
  pingPongSportIcon,
  tennisSportIcon,
} from '@/assets/sportIcons/sportIcons';
import { setUserInfo } from '@/src/store/authSlice';
import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import StepBar from './StepBar';

const QSport = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userInfo = useSelector(state => state.user);

  const [selectedSportId, setSelectedSportId] = useState(null);

  const sports = [
    { id: 'football', sportName: 'Football', label: t('Football'), sportIcon: footballSportIcon },
    { id: 'basketball', sportName: 'Basketball', label: t('Basketball'), sportIcon: basketballSportIcon },
    { id: 'tennis', sportName: 'Tennis', label: t('Tennis'), sportIcon: tennisSportIcon },
    { id: 'pingpong', sportName: 'PingPong', label: t('PingPong'), sportIcon: pingPongSportIcon },
    { id: 'hiking', sportName: 'Hiking', label: t('Hiking'), sportIcon: hikingSportIcon },
  ];

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

  const handleSelect = (sport) => {
    setSelectedSportId(sport.id);

    dispatch(
      setUserInfo({
        profileInfo: {
          ...userInfo.profileInfo,
          mainSport: sport.sportName,
          sportsList: [
            {
              id: sport.id,
              sportName: sport.sportName,
              sportLevel: '',
              sportIcon: sport.sportIcon,
            },
          ],
        },
      })
    );
  };

  const isNextEnabled = !!selectedSportId;

  return (
    <View style={styles.container}>
      <StepBar step={1} />

      <ScrollView>
        <View style={styles.centerContent}>
          <Text style={styles.questionText}>{t('favorSport')}</Text>
          <Text style={styles.subtitle}>{t('selectSport')}</Text>

          <View style={styles.optionsContainer}>
            {sports.map(sport => {
              const isSelected = selectedSportId === sport.id;

              return (
                <TouchableOpacity
                  key={sport.id}
                  style={[
                    styles.optionButton,
                    { backgroundColor: isSelected ? '#4CAF50' : 'white' },
                  ]}
                  onPress={() => handleSelect(sport)}
                >
                  <View style={styles.row}>
                    <Image source={sport.sportIcon} style={styles.sportIcon} />
                    <Text
                      style={[
                        styles.optionText,
                        { color: isSelected ? 'white' : '#000' },
                      ]}
                    >
                      {sport.label}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        disabled={!isNextEnabled}
        style={[
          styles.nextButton,
          {
            backgroundColor: isNextEnabled
              ? 'rgba(36, 163, 76, 0.9)'
              : 'rgba(126, 219, 155, 0.9)',
          },
        ]}
        onPress={() => isNextEnabled && navigation.navigate('QLevel')}
      >
        <Text style={styles.nextText}>{t('next')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QSport;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  centerContent: {
    padding: 20,
    marginBottom: 80,
  },
  questionText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
  },
  optionsContainer: {
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  optionButton: {
    borderRadius: 5,
    marginBottom: 10,
    borderColor: 'silver',
    borderWidth: 1,
    height: 55,
    width: '100%',
    justifyContent: 'center',
  },
  optionText: {
    fontSize: 18,
    marginLeft: 8,
  },
  sportIcon: {
    width: 30,
    height: 30,
  },
  nextButton: {
    position: 'absolute',
    bottom: 60,
    borderRadius: 5,
    borderColor: 'silver',
    borderWidth: 1,
    height: 55,
    width: '90%',
    justifyContent: 'center',
  },
  nextText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 2,
  },
});
