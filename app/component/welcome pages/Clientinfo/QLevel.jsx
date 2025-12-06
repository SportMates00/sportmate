import { setUserInfo } from '@/src/store/userSlice';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

 

const QLevel = ({ step, setStep }) => {
  const {t} = useTranslation();
  const dispatch = useDispatch(); // Get Redux dispatch
  const levels = [t('Beginner'), t('Intermediate'), t('Professional')];
  const userInfo = useSelector((state) => state.user);
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <View style={styles.container}>

      {step === 2 && (
        <View style={styles.centerContent}>
          <Text style={styles.questionText}>{t('yourLevel')}</Text>
          <View style={styles.optionsContainer}>
            {levels.map((val) => (
              <TouchableOpacity
                key={val}
                style={styles.optionButton}
                onPress={() => {
                  dispatch(setUserInfo({ profileInfo: {...userInfo.profileInfo,  level: val } })); // Update Redux state
                  nextStep();
                }}
              >
                <Text style={styles.optionText}>{val}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  optionsContainer: {
    marginBottom: 30,
  },
  optionButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: 200,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: 'blue',
  },
});

export default QLevel;