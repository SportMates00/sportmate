import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const mockInvites = [
  {
    id: '1',
    senderName: 'Levon Hovhannisyan',
    profilePic: 'https://randomuser.me/api/portraits/men/45.jpg',
    sport: 'Football',
    dateTime: 'Sat, May 4 • 17:00',
    location: 'Cascade Arena, Yerevan',
    message: 'Join our 5v5 match this weekend!',
  },
  {
    id: '2',
    senderName: 'Lilit Hakobyan',
    profilePic: 'https://randomuser.me/api/portraits/women/30.jpg',
    sport: 'Basketball',
    dateTime: 'Sun, May 5 • 19:30',
    location: 'Komitas Court',
    message: 'We need 1 more player tonight!',
  },
];

const GameInvitesTab = () => {
  const navigation = useNavigation();
  const [invites, setInvites] = useState(mockInvites);

  const handleAccept = (id) => {
    Alert.alert('Accepted', 'You joined the game!');
    setInvites(invites.filter((invite) => invite.id !== id));
  };

  const handleDecline = (id) => {
    Alert.alert('Declined', 'Invite removed.');
    setInvites(invites.filter((invite) => invite.id !== id));
  };

  const handleCardTap = (invite) => {
    // Placeholder — later you'll navigate to CardView.jsx
    Alert.alert('Card Tapped', `Navigate to detailed view of ${invite.sport}`);
    // navigation.navigate('CardView', { invite });
  };

  if (invites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No game invites yet.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {invites.map((invite) => (
        <TouchableOpacity
          key={invite.id}
          style={styles.card}
          onPress={() => handleCardTap(invite)}
        >
          <View style={styles.header}>
            <Image source={{ uri: invite.profilePic }} style={styles.avatar} />
            <View>
              <Text style={styles.name}>{invite.senderName}</Text>
              <Text style={styles.sport}>{invite.sport}</Text>
            </View>
          </View>

          <Text style={styles.date}>{invite.dateTime}</Text>
          <Text style={styles.location}>{invite.location}</Text>

          <Text style={styles.message} numberOfLines={2}>
            {invite.message}
          </Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.accept]}
              onPress={() => handleAccept(invite.id)}
            >
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.decline]}
              onPress={() => handleDecline(invite.id)}
            >
              <Text style={styles.buttonText}>Decline</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    marginHorizontal: 5,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 999,
    marginRight: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  sport: {
    fontSize: 14,
    color: '#007bff',
  },
  date: {
    fontSize: 13,
    color: '#333',
    marginTop: 5,
  },
  location: {
    fontSize: 13,
    color: '#666',
    marginBottom: 10,
  },
  message: {
    fontSize: 14,
    color: '#444',
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  accept: {
    backgroundColor: '#28a745',
  },
  decline: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
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

export default GameInvitesTab;
