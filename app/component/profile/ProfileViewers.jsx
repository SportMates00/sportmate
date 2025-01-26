import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ProfileViewers = ({ navigation }) => {
  // Sample viewer data (In a real app, this would come from an API or backend)
  const [viewers, setViewers] = useState([
    {
      id: '1',
      name: 'John Doe',
      profilePicture: 'https://www.example.com/john.jpg',
      timestamp: '5 minutes ago',
    },
    {
      id: '2',
      name: 'Jane Smith',
      profilePicture: 'https://www.example.com/jane.jpg',
      timestamp: '1 hour ago',
    },
    {
      id: '3',
      name: 'Sarah Lee',
      profilePicture: 'https://www.example.com/sarah.jpg',
      timestamp: '2 hours ago',
    },
  ]);

  // Handle navigating to viewer's profile page
  const handleNavigateToViewerProfile = (viewerId) => {
    navigation.navigate('ViewerProfile', { viewerId });
  };

  // Render each viewer's data
  const renderViewerItem = ({ item }) => (
    <TouchableOpacity
      style={styles.viewerItem}
      onPress={() => handleNavigateToViewerProfile(item.id)}
    >
      <LinearGradient
        colors={['#6a11cb', '#2575fc']}
        style={styles.cardBackground}
      >
        <View style={styles.cardContent}>
          <Image source={{ uri: item.profilePicture }} style={styles.viewerImage} />
          <View style={styles.viewerInfo}>
            <Text style={styles.viewerName}>{item.name}</Text>
            <Text style={styles.viewerTimestamp}>{item.timestamp}</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  // Handle empty state (when there are no viewers)
  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateText}>No one has viewed your profile yet.</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile Viewers</Text>
      {viewers.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={viewers}
          renderItem={renderViewerItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  viewerItem: {
    marginBottom: 20,
  },
  cardBackground: {
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  viewerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  viewerInfo: {
    flex: 1,
  },
  viewerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  viewerTimestamp: {
    fontSize: 14,
    color: '#ddd',
    marginTop: 5,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#aaa',
  },
});

export default ProfileViewers;
