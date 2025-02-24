import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ShareLink from './ShareLink';
import { useTheme } from '@/app/theme/themeContext';
import { useNavigation } from '@react-navigation/native';

const ShareProfile = ({  }) => {

  const { theme } = useTheme(); // Get current theme and toggle (if needed)
  const styles = getStyles(theme); // Generate dynamic styles based on current theme
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: theme.colors.background, // Change header background color
      },
      headerTintColor: theme.colors.text, // Change back arrow color
    });
  }, [navigation]);

  return (

      <View style={styles.contentContainer}>
        {/* Invite Section */}
        <Text style={styles.inviteText}>
          Invite your friends and get rewards!
        </Text>

        {/* Steps Section */}
        <View style={styles.stepsBox}>
          <Text style={styles.stepsTitle}>How It Works</Text>
          <View style={styles.step}>
            <Text style={styles.stepNumber}>1.</Text>
            <Text style={styles.stepText}>
              Share your unique invite link with friends.
            </Text>
          </View>
          <View style={styles.step}>
            <Text style={styles.stepNumber}>2.</Text>
            <Text style={styles.stepText}>
              Your friend signs up and makes their first purchase.
            </Text>
          </View>
          <View style={styles.step}>
            <Text style={styles.stepNumber}>3.</Text>
            <Text style={styles.stepText}>
              Both of you receive a promo code!
            </Text>
          </View>
        </View>

        {/* Share Link Button */}
        <ShareLink />
      </View>
      
  );
};

const getStyles = (theme) => StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:theme.spacing.medium,
    backgroundColor:theme.colors.background
  },
  inviteText: {
    fontSize: theme.fonts.size.xLarge,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.large,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  stepsBox: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.medium,
    borderRadius: theme.radius.semiCircle,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: theme.spacing.large,
  },
  stepsTitle: {
    fontSize: theme.fonts.size.large,
    fontWeight: 'bold',
    color: theme.colors.buttonText,
    textAlign: 'center',
    marginBottom: theme.spacing.large,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.medium,
  },
  stepNumber: {
    color: theme.colors.buttonText,
    fontSize: theme.fonts.size.medium,
    fontWeight: 'bold',
    marginRight: theme.spacing.small,
  },
  stepText: {
    fontSize: theme.fonts.size.medium,
    color: theme.colors.buttonText,
    flex: 1,
  }
});

export default ShareProfile;
