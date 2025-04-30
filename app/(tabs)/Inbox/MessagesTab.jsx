import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const messages = [
  {
    id: '1',
    name: 'Aram Petrosyan',
    profilePic: 'https://randomuser.me/api/portraits/men/10.jpg',
    lastMessage: 'Hey, ready for the game tomorrow?',
    time: '10:45 AM',
  },
  {
    id: '2',
    name: 'Ani Sargsyan',
    profilePic: 'https://randomuser.me/api/portraits/women/22.jpg',
    lastMessage: 'Let’s warm up 15 mins earlier.',
    time: 'Yesterday',
  },
  // Add more mock messages or leave empty for empty state test
];

const MessagesTab = () => {
    const navigation = useNavigation();

  if (messages.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>You have no messages yet.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {messages.map((msg) => (
        <TouchableOpacity
          key={msg.id}
          style={styles.messageRow}
          onPress={() =>
            navigation.navigate('ChatScreen', {
              name: msg.name,
              profilePic: msg.profilePic,
            })
          }
          
        >
          <Image source={{ uri: msg.profilePic }} style={styles.avatar} />
          <View style={styles.textContainer}>
            <Text style={styles.name}>{msg.name}</Text>
            <Text style={styles.lastMessage} numberOfLines={1}>{msg.lastMessage}</Text>
          </View>
          <Text style={styles.time}>{msg.time}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingHorizontal: 5,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
  },
  lastMessage: {
    color: '#666',
    fontSize: 14,
  },
  time: {
    color: '#aaa',
    fontSize: 12,
  },
  emptyContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
  },
});

export default MessagesTab;
