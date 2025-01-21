import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import QSport from './QSport';
import QLevel from './QLevel';
import QSchedule from './QSchedule';

const ClientInfo = () => {
  const [step, setStep] = useState(1);
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={prevStep}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      {step === 1 && <QSport step={step} setStep={setStep} />}
      {step === 2 && <QLevel step={step} setStep={setStep}  />}

      {step === 3 && <QSchedule step={step} setStep={setStep}/>}
     
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
