import { setUserInfo } from '@/app/store/userSlice';
import React from 'react';
import { View, Text,TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';


const QSport = ({ step, setStep }) => {
  const dispatch = useDispatch(); // Get the dispatch function from Redux
  const sports = ['Football', 'Basketball', 'Tennis', 'Ping Pong', 'Hiking'];
  const userInfo = useSelector((state) => state.user);
  const nextStep = () => setStep(step + 1);
console.log('Sposssssssssssssssssssrt',userInfo)
  return (
    <View style={styles.container}>
      {step === 1 && (
        <View style={styles.centerContent}>
          <Text style={styles.questionText}>What is your favorite sport?</Text>
          <View style={styles.optionsContainer}>
            {sports.map((val) => (
              <TouchableOpacity
                key={val}
                style={styles.optionButton}
                onPress={() => {
                  dispatch(setUserInfo({ profileInfo: {...userInfo.profileInfo, sport: val } })); // Dispatch action to update Redux state
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
            padding: 20,
            width:'100%',
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
        });
          


 export default QSport;