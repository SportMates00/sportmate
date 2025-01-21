import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import QLevel from './QLevel';



  const QSport = ({step , setStep}) => {
  const [favoriteSport, setFavoriteSport] = useState(''); 

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
   return (
      <View style={styles.container}>
        {step === 1 && (
          <View style={styles.centerContent}>
            <Text style={styles.questionText}>What is your favorite sport?</Text>
            <View style={styles.optionsContainer}>
              <TouchableOpacity style={styles.optionButton} onPress={() => { setFavoriteSport('football'); nextStep(); }}>
                <Text style={styles.optionText}>Football</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionButton} onPress={() => { setFavoriteSport('basketball'); nextStep(); }}>
                <Text style={styles.optionText}>Basketball</Text>
              </TouchableOpacity>
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