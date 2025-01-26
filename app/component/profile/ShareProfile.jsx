import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // For gradient backgrounds
import ShareLink from './ShareLink';

const ShareProfile = ({ navigation }) => {

  const handleBackPress = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  return (
    <LinearGradient
      colors={['#4facfe', '#00f2fe']} // Gradient background
      style={styles.container}
    >
      {/* Header with Back Button */}
      <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      {/* Content */}
      <View style={styles.contentContainer}>
        {/* Invite Section */}
        <Text style={styles.inviteText}>
          Invite your friends and get rewards!
        </Text>

        {/* Steps Section */}
        <View style={styles.stepsBox}>
          <Text style={styles.stepsTitle}>How It Works</Text>
          <View style={styles.step}>
            <Text style={styles.stepNumber}>1</Text>
            <Text style={styles.stepText}>
              Share your unique invite link with friends.
            </Text>
          </View>
          <View style={styles.step}>
            <Text style={styles.stepNumber}>2</Text>
            <Text style={styles.stepText}>
              Your friend signs up and makes their first purchase.
            </Text>
          </View>
          <View style={styles.step}>
            <Text style={styles.stepNumber}>3</Text>
            <Text style={styles.stepText}>
              Both of you receive a promo code!
            </Text>
          </View>
        </View>

        {/* Share Link Button */}
        <ShareLink />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  backText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  inviteText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  stepsBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 30,
  },
  stepsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
    textAlign: 'center',
    marginBottom: 20,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  stepNumber: {
    backgroundColor: '#4facfe',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 20,
    padding: 8,
    marginRight: 10,
    textAlign: 'center',
  },
  stepText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  shareModalButton: {
    backgroundColor: '#2575fc',
  },
  shareButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ShareProfile;
