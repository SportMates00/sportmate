import { setUserInfo } from '@/src/store/userSlice';
import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Image, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import StepBar from './StepBar';

const QLevel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userInfo = useSelector((state) => state.user);

  // 🔥 selected level
  const [selectedLevel, setSelectedLevel] = useState('');

  const levels = [t('Beginner'), t('Intermediate'), t('Professional')];

  const handleSelect = (val) => {
    setSelectedLevel(val);

    dispatch(
      setUserInfo({
        profileInfo: { ...userInfo.profileInfo, level: val },
      })
    );
  };

  const isNextEnabled = selectedLevel !== '';

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

  return (
    <View style={styles.container}>
      <StepBar step={2} />
      <ScrollView>
        <View style={styles.centerContent}>

        <Text style={styles.questionText}>{t('yourLevel')}</Text>

        <TouchableOpacity style={styles.sportDetails}>
          <Image source={userInfo.profileInfo.sport.sportIcon}/>
          <Text style={{fontSize:18, fontWeight:800, letterSpacing:1}}>{userInfo.profileInfo.sport.sport}</Text>
        </TouchableOpacity>

        <View style={styles.optionsContainer}>
          {levels.map((val) => {
            const isSelected = selectedLevel === val;

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

        {/* NEXT BUTTON */}

      </View>
      </ScrollView>

              <TouchableOpacity
          disabled={!isNextEnabled}
          style={[
            styles.nextButton,
            { backgroundColor: isNextEnabled ? '#4CAF50' : '#A5D6A7' },
          ]}
          onPress={() => {
            if (isNextEnabled) navigation.navigate('QAvailability');
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
  },
  questionText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 60,
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
    color: '#000000ff',
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
  sportDetails: {
    flexDirection:'row',
    alignItems:'center',
    gap:10,
    marginBottom:30
  }
});

export default QLevel;
