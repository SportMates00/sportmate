// Events.jsx
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';



const GameEvents = ({ gameEvents }) => {
  // Optionally filter events if myGames is true
  console.log('Game events rendering')
  return (
    <View>
      {gameEvents.length === 0 ? <Text>There are currently no events</Text>
      :
      gameEvents.map(game => {
        if(game !== undefined){
          return (
          <View key={game.id} style={styles.card}>
            <Text>{game.sport}</Text>
          </View>  
        )
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  details: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});

export default GameEvents;
