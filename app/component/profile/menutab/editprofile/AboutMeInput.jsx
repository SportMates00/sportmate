import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useTheme } from '@/src/theme/themeContext';

const AboutMeInput = ({ editUser, setEditUser }) => {
  const handleTextChange = (text) => {
    setEditUser((prev) => ({
      ...prev,
      profileInfo: { ...prev.profileInfo, aboutMe: text },
    }));
  };

  // ✅ THEME
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={6}
        maxLength={1200}
        value={editUser.profileInfo.aboutMe}
        onChangeText={handleTextChange}
        placeholder="Write something about yourself..."
        placeholderTextColor={theme.colors.text}
        textAlignVertical="top"
      />
      <Text style={styles.charCount}>
        {editUser.profileInfo.aboutMe.length}/1200
      </Text>
    </View>
  );
};

export default AboutMeInput;

const getStyles = (theme) => StyleSheet.create({
  container: {
    marginVertical: 12,
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: theme.colors.text,
    fontFamily: theme.fonts.family,
  },

  input: {
    borderWidth: 1,
    borderColor: theme.colors.text,
    borderRadius: 8,
    padding: 10,
    minHeight: 120,
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
    fontFamily: theme.fonts.family,
  },

  charCount: {
    fontSize: 12,
    color: theme.colors.text,
    textAlign: 'right',
    marginTop: 4,
    fontFamily: theme.fonts.family,
  },
});
