import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import QLevel from './QLevel';


const QSport = ({step , setStep, userInfo, setUserInfo}) => {
  const [favoriteSport, setFavoriteSport] = useState(''); 
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const sports = ['Football','Basketball','Tennis','Ping Pong','Hiking']
    return (
      <View style={styles.container}>
        {step === 1 && (
          <View style={styles.centerContent}>
            <Text style={styles.questionText}>What is your favorite sport?</Text>
            <View style={styles.optionsContainer}>
              {sports.map(val => {
                return (
                  <TouchableOpacity key={val} style={styles.optionButton} onPress={() => {   
                    setUserInfo({...userInfo,profileInfo:{...userInfo.profileInfo,sport:val}})
                    nextStep();
                    }}
                    >
                    <Text style={styles.optionText}>{val}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          </View>)}
        </View>
        
        ) }

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