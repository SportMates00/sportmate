import { basketballSportIcon, footballSportIcon, hikingSportIcon, pingPongSportIcon, tennisSportIcon } from '@/assets/sportIcons/sportIcons';
import { setUserInfo } from '@/src/store/userSlice';
import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import StepBar from './StepBar';

const QSport = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userInfo = useSelector((state) => state.user);

  const [selectedSport, setSelectedSport] = useState('');

const sports = [
  { key: "Football", label: t("Football"), sportIcon: footballSportIcon },
  { key: "Basketball", label: t("Basketball"), sportIcon: basketballSportIcon },
  { key: "Tennis", label: t("Tennis"), sportIcon: tennisSportIcon },
  { key: "PingPong", label: t("PingPong"), sportIcon: pingPongSportIcon },
  { key: "Hiking", label: t("Hiking"), sportIcon: hikingSportIcon },
  { key: "Tennis1", label: t("Tennis1"), sportIcon: tennisSportIcon },
  { key: "PingPong1", label: t("PingPong1"), sportIcon: pingPongSportIcon },
  { key: "Hiking1", label: t("Hiking1"), sportIcon: hikingSportIcon },
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
        borderBottomWidth: 1,
        borderColor: 'white',
      },
    });
  }, [navigation]);

const handleSelect = (val) => {
  setSelectedSport(val.key);

  dispatch(
    setUserInfo({
      profileInfo: {
        ...userInfo.profileInfo,
        sport: { key: val.key }
      },
    })
  );
};

  const isNextEnabled = selectedSport !== '';

  return (
    <View style={styles.container}>
      <StepBar step={1}/>
    <ScrollView>
      <View style={styles.centerContent}>
        <Text style={styles.questionText}>{t('favorSport')}</Text>
        <Text style={{ fontSize: 14, marginBottom: 20 }}>{t('selectSport')}</Text>

        <View style={styles.optionsContainer}>
          {sports.map((val) => {
            const isSelected = selectedSport === val.key;

            return (
              <TouchableOpacity
                key={val.sport}
                style={[
                  styles.optionButton,
                  { backgroundColor: isSelected ? '#4CAF50' : 'white' },
                ]}
                onPress={() => handleSelect(val)}
              >
                <View style={styles.row}>
                  <Image source={val.sportIcon} style={styles.sportIcon} />
                  <Text
                    style={[
                      styles.optionText,
                      { color: isSelected ? 'white' : '#000000ff' },
                    ]}
                  >
                    {val.label}
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
              backgroundColor: isNextEnabled ? 'rgba(36, 163, 76, 0.9)' : 'rgba(126, 219, 155, 0.9)',
            },
          ]}
          onPress={() => {
            if (isNextEnabled) navigation.navigate('QLevel');
          }}
        >
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: 'white',
    position:'relative',
    alignItems:'center'
  },
  centerContent: {
    padding: 20,
    marginBottom:80
  },
  questionText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    color: '#333',
  },
  optionsContainer: {
    marginBottom: 30,
  },

  // ⬇️ Perfect alignment row
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft:20
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
    marginLeft: 8, // ⬅️ Margin between icon and text EXACTLY as you wanted
  },

  sportIcon: {
    width: 30,
    height: 30,
  },

  nextButton: {
    position:'absolute',
    bottom:60,
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

export default QSport;
