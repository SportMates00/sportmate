import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import favicon from '@/assets/images/favicon.png'
import { useTheme } from '@/src/theme/themeContext';

export default function ProfileIcon({ onPress }) {

  const { theme } = useTheme(); // Get current theme and toggle (if needed)
  const styles = getStyles(theme); // Generate dynamic styles based on current theme

  return (
    <TouchableOpacity
      style={styles.profileButton}
      onPress={onPress}
    >
      <Image
        source={favicon} // Replace with user's profile image URL
        style={styles.profileImage}
      />
    </TouchableOpacity>
  );
}

const getStyles = (theme) => StyleSheet.create({
  profileButton: {
    marginRight: theme.spacing.medium,
    borderRadius: 25,
    width: 40,
    height: 40,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});