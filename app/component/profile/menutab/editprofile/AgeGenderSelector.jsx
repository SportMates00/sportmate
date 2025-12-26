import React, { useState } from 'react';
import { Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '@/src/theme/themeContext';

const AgeGenderSelector = ({ editUser, setEditUser }) => {

  const selectedAge = editUser.profileInfo.age;   // <-- single source of truth
  const ages = Array.from({ length: 86 }, (_, i) => i + 14);

  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {ages.map((age) => (
        <TouchableOpacity
          key={age}
          style={[
            styles.ageItem,
            selectedAge == age && styles.selectedAgeItem,
          ]}
          onPress={() =>
            setEditUser(prev => ({
              ...prev,
              profileInfo: { ...prev.profileInfo, age },
            }))
          }
        >
          <Text
            style={[
              styles.ageText,
              selectedAge == age && styles.selectedAgeText,
            ]}
          >
            {age}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default AgeGenderSelector;

const getStyles = (theme) => StyleSheet.create({
  scrollContainer: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 16,
  },

  ageItem: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },

  selectedAgeItem: {
    backgroundColor: theme.colors.background,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },

  ageText: {
    fontSize: 14,
    color: theme.colors.text,
    fontFamily: theme.fonts.family,
  },

  selectedAgeText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontFamily: theme.fonts.family,
  },
});
