import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';


   const QSchedule = ({step, setStep}) => {
    const [availability, setAvailability] = useState({
       Monday: { Morning: false, Evening: false, Night: false },
       Tuesday: { Morning: false, Evening: false, Night: false },
       Wednesday: { Morning: false, Evening: false, Night: false },
       Thursday: { Morning: false, Evening: false, Night: false },
       Friday: { Morning: false, Evening: false, Night: false },
       Saturday: { Morning: false, Evening: false, Night: false },
       Sunday: { Morning: false, Evening: false, Night: false },
       // ...rest of the week
     }); 
   
     const nextStep = () => setStep(step + 1);
     const prevStep = () => setStep(step - 1);
   
     const handleAvailabilityChange = (day, time) => {
       setAvailability({
         ...availability,
         [day]: { ...availability[day], [time]: !availability[day][time] }
       });
     };
   
     const setAvailableAnytime = () => {
       const updatedAvailability = {};
       Object.keys(availability).forEach(day => {
         updatedAvailability[day] = { Morning: true, Evening: true, Night: true };
       });
       setAvailability(updatedAvailability);
     };
   
     const handleFinish = () => {
       navigation.navigate('HomeTabs');
     };
   
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={prevStep}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      {step === 3 && (
        <ScrollView contentContainerStyle={styles.centerContent}>
          <Text style={styles.questionText}>What are your available times?</Text>
          {Object.keys(availability).map(day => (
            <View key={day} style={styles.dayRow}>
              <Text style={styles.dayText}>{day}</Text>
              {['Morning', 'Evening', 'Night'].map(time => (
                <CheckBox
                  key={time}
                  value={availability[day][time]}
                  onValueChange={() => handleAvailabilityChange(day, time)}
                />
              ))}
            </View>
          ))}
          <TouchableOpacity onPress={setAvailableAnytime} style={styles.anytimeButton}>
            <Text style={styles.anytimeText}>Available at anytime</Text>
          </TouchableOpacity>
          <Button title="Finish" onPress={handleFinish} />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      padding: 20,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f8f8f8',
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
      backgroundColor: '#007BFF',
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
    dayRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
      width: '100%',
    },
    dayText: {
      fontSize: 16,
      color: '#333',
    },
    anytimeButton: {
      backgroundColor: '#28a745',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
      alignItems: 'center',
    },
    anytimeText: {
      fontSize: 16,
      color: '#fff',
    },
    backButton: {
      position: 'absolute',
      top: 10,
      left: 10,
    },
    backButtonText: {
      fontSize: 16,
      color: 'blue',
    },
  });
  

export default QSchedule;