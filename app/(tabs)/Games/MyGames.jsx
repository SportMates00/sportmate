// MyGames.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Events from './GameEvents';

const MyGames = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Games</Text>
      <Events myGames={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default MyGames;
