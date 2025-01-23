import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import ShareLink from './ShareLink';
import Profile from './Profile';

const ShareProfile = ({ navigation }) => {

  const handleBackPress = () => {
    navigation.navigate(Profile);
  };

 
  return (
    <View style={styles.container}>
      {/* Header with back button */}
      <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      {/* Centered Content */}
      <View style={styles.contentContainer}>
        {/* Invite Text */}
        <Text style={styles.inviteText}>Invite your friends to get a promo code!</Text>

        {/* Steps section centered */}
        <View style={styles.stepsBox}>
          <Text style={styles.stepsTitle}>How It Works</Text>
          <Text style={styles.step}>1. Share your unique invite link with friends.</Text>
          <Text style={styles.step}>2. Your friend signs up and completes their first purchase.</Text>
          <Text style={styles.step}>3. You both get a promo code for your next purchase!</Text>
        </View>

        {/* Share link button */}
        <TouchableOpacity onPress={<ShareLink />} style={styles.shareButton}>
          <Text style={styles.shareButtonText}>Share Link</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    paddingVertical: 10,
  },
  backText: {
    fontSize: 16,
    color: '#007bff',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inviteText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  stepsBox: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  step: {
    fontSize: 14,
    marginBottom: 5,
    color: '#555',
  },
  shareButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    width: '80%',
  },
  shareButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default ShareProfile;
