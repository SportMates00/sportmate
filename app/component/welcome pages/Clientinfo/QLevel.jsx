import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

 

  const QLevel = ({step, setStep}) => {
    const [level, setLevel] = useState(''); 
  
    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);
  return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={prevStep}>
                  <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
        {step === 2 && (
          <View style={styles.centerContent}>
            <Text style={styles.questionText}>What is your level?</Text>
            <View style={styles.optionsContainer}>
              <TouchableOpacity style={styles.optionButton} onPress={() => { setLevel('beginner'); nextStep(); }}>
                <Text style={styles.optionText}>Beginner</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionButton} onPress={() => { setLevel('intermediate'); nextStep(); }}>
                <Text style={styles.optionText}>Intermediate</Text>
              </TouchableOpacity>
            </View>
          </View>)}
          </View>
        ) }

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


     export default QLevel;