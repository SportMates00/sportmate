import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import QSport from './QSport';
import QLevel from './QLevel';
import QSchedule from './QSchedule';
import { setUserInfo } from '@/app/store/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const ClientInfo = () => {
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user); // Get user data from Redux

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={prevStep}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      {/* Render the appropriate component based on the current step */}
      {step === 1 && (
        <QSport
          step={step}
          setStep={setStep}
          userInfo={userInfo}
          setUserInfo={(updatedInfo) => dispatch(setUserInfo(updatedInfo))}
        />
      )}
      {step === 2 && (
        <QLevel
          step={step}
          setStep={setStep}
          userInfo={userInfo}
          setUserInfo={(updatedInfo) => dispatch(setUserInfo(updatedInfo))}
        />
      )}
      {step === 3 && (
        <QSchedule
          step={step}
          setStep={setStep}
          userInfo={userInfo}
          setUserInfo={(updatedInfo) => dispatch(setUserInfo(updatedInfo))}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ClientInfo;
