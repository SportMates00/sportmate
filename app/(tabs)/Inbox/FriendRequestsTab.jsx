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

const mockRequests = [
    {
        id: '1',
        name: 'Narek Mkrtchyan',
        profilePic: 'https://randomuser.me/api/portraits/men/15.jpg',
      },
      {
        id: '2',
        name: 'Tatev Grigoryan',
        profilePic: 'https://randomuser.me/api/portraits/women/42.jpg',
      },
];

const FriendRequestsTab = () => {
  const navigation = useNavigation();
  const [requests, setRequests] = useState(mockRequests);

  const handleAccept = (id) => {
    Alert.alert('Accepted', 'Friend request accepted.');
    setRequests(requests.filter((r) => r.id !== id));
  };

  const handleDecline = (id) => {
    Alert.alert('Declined', 'Friend request declined.');
    setRequests(requests.filter((r) => r.id !== id));
  };

  const handleNavigateProfile = (request) => {
    navigation.navigate('UserProfile', { userId: request.id });
  };

  if (requests.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No friend requests yet.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {requests.map((request) => (
        <TouchableOpacity
          key={request.id}
          style={styles.card}
          onPress={() => handleNavigateProfile(request)}
        >
          <View style={styles.header}>
            <Image source={{ uri: request.profilePic }} style={styles.avatar} />
            <Text style={styles.name}>{request.name}</Text>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.accept]}
              onPress={() => handleAccept(request.id)}
            >
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.decline]}
              onPress={() => handleDecline(request.id)}
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
    marginBottom: 15,
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

export default FriendRequestsTab;
