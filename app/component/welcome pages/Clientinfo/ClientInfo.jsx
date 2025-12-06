import React, { useLayoutEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import QSport from './QSport';
import QLevel from './QLevel';
import QSchedule from './QSchedule';
import { setUserInfo } from '@/src/store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

const ClientInfo = () => {
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user); // Get user data from Redux
  const { t } = useTranslation();
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
   const navigation = useNavigation();

    useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "",                // ❗ fully removes title
      headerShadowVisible: false, 
      headerBackButtonDisplayMode: "minimal", // (new API)
      headerBackTitleVisible: false,          // (for older versions, harmless if ignored)
      headerBackTitle: "",
      headerStyle: Platform.OS === "web"
        ? {
            borderBottomWidth: 1,
            borderColor:'white'
          }
        : {
            borderBottomWidth: 1,
            borderColor:'white'
          },
    });
  }, [navigation]);

  return (
    <View style={styles.container}>

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
    backgroundColor: 'white',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ClientInfo;
