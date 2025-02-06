// Events.jsx
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const dummyEvents = [
  { id: '1', title: 'Football Match', date: '2025-05-01', location: 'Stadium A' },
  { id: '2', title: 'Basketball Game', date: '2025-05-02', location: 'Arena B' },
  { id: '3', title: 'Tennis Tournament', date: '2025-05-03', location: 'Court C' },
];

const EventCard = ({ event }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{event.title}</Text>
    <Text style={styles.details}>{event.date} | {event.location}</Text>
  </View>
);

const Events = ({ myGames }) => {
  // Optionally filter events if myGames is true
  const eventsData = dummyEvents; // Replace with actual logic

  return (
    <FlatList
      data={eventsData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <EventCard event={item} />}
      contentContainerStyle={styles.listContainer}
    />
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

export default Events;
