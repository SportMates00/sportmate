import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const AboutMeInput = ({ editUser, setEditUser }) => {
  const handleTextChange = (text) => {
    setEditUser((prev) => ({
      ...prev,
      profileInfo: { ...prev.profileInfo, aboutMe: text }, // Save input
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>About Me</Text>
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={6} // Sets visible lines
        maxLength={1200} // Limits input length
        value={editUser.profileInfo.aboutMe} // Bind to state
        onChangeText={handleTextChange} // Update state on input
        placeholder="Write something about yourself..."
        textAlignVertical="top" // Aligns text to the top
      />
      <Text style={styles.charCount}>{editUser.profileInfo.aboutMe.length}/1200</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    minHeight: 120, // Ensures proper height for multiple lines
    backgroundColor: '#fff',
  },
  charCount: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'right',
    marginTop: 4,
  },
});

export default AboutMeInput;
