import { setUserInfo } from '@/src/store/userSlice';
import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const QSport = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userInfo = useSelector((state) => state.user);

  // 🔥 Track selected sport value only (string)
  const [selectedSport, setSelectedSport] = useState('');

  const sports = [
    t('Football'),
    t('Basketball'),
    t('Tennis'),
    t('PingPong'),
    t('Hiking'),
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "",
      headerShadowVisible: false,
      headerBackButtonDisplayMode: "minimal",
      headerBackTitleVisible: false,
      headerBackTitle: "",
      headerStyle: {
        borderBottomWidth: 1,
        borderColor: 'white',
      },
    });
  }, [navigation]);

  // 🔥 Handle selection
  const handleSelect = (val) => {
    setSelectedSport(val);

    dispatch(setUserInfo({
      profileInfo: { ...userInfo.profileInfo, sport: val },
    }));
  };

  const isNextEnabled = selectedSport !== '';

  return (
    <View style={styles.container}>
      <View style={styles.centerContent}>
        <Text style={styles.questionText}>{t('favorSport')}</Text>
        

        <View style={styles.optionsContainer}>
          {sports.map((val) => {
            const isSelected = selectedSport === val;

            return (
              <TouchableOpacity
                key={val}
                style={[
                  styles.optionButton,
                  { backgroundColor: isSelected ? '#4CAF50' : 'white' },
                ]}
                onPress={() => handleSelect(val)}
              >
                <Text
                  style={[
                    styles.optionText,
                    { color: isSelected ? 'white' : '#000000ff' },
                  ]}
                >
                  {val}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* 🔥 NEXT BUTTON */}
        <TouchableOpacity
          disabled={!isNextEnabled}
          style={[
            styles.nextButton,
            {
              backgroundColor: isNextEnabled ? '#4CAF50' : '#A5D6A7', // lighter green when locked
            },
          ]}
          onPress={() => {
            if (isNextEnabled) navigation.navigate('QLevel');
          }}
        >
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: 'white',
  },
  centerContent: {
    padding: 20,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    color: '#333',
  },
  optionsContainer: {
    marginBottom: 30,
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
    fontSize: 16,
    marginLeft: 60,
  },
  nextButton: {
    borderRadius: 5,
    marginBottom: 10,
    borderColor: 'silver',
    borderWidth: 1,
    height: 55,
    width: '100%',
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
