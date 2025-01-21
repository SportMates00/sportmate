import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import favicon from '@/assets/images/favicon.png'
export default function ProfileButton({ onPress }) {
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

const styles = StyleSheet.create({
  profileButton: {
    marginRight: 15,
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