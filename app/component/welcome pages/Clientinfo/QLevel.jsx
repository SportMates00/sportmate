import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

 

  const QLevel = ({step, setStep, userInfo, setUserInfo}) => {

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);
    const levels = ['Beginner','Intermediate','Professional']

  return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={prevStep}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        {step === 2 && (
        <View style={styles.centerContent}>
          <Text style={styles.questionText}>What is your level?</Text>
            <View style={styles.optionsContainer}>
              {levels.map(val => {
                return (
                  <TouchableOpacity key={val} style={styles.optionButton} onPress={() => {
                    setUserInfo({...userInfo,profileInfo:{...userInfo.profileInfo,level:val}}) 
                    nextStep(); 
                    }}>
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
              flex: 1,
              width:'100%',
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