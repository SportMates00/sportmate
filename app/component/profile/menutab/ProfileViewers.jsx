import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/src/theme/themeContext';
import { useNavigation } from '@react-navigation/native';

const ProfileViewers = () => {

  const { theme } = useTheme(); // Get current theme and toggle (if needed)
  const styles = getStyles(theme); // Generate dynamic styles based on current theme
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
  const navigation = useNavigation();
  // Handle navigating to viewer's profile page
  const handleNavigateToViewerProfile = (viewerId) => {
    navigation.navigate('ViewerProfile', { viewerId });
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: theme.colors.background,
      },
      headerTintColor: theme.colors.text,
      headerTitleStyle: {
        color: theme.colors.text,      
      },
      headerTitleAlign: 'center',
    });
  }, [navigation]);
  // Render each viewer's data
  const renderViewerItem = ({ item }) => (
    <TouchableOpacity
      style={styles.viewerItem}
      onPress={() => handleNavigateToViewerProfile(item.id)}
    >
      <LinearGradient
        colors={['#4CAF50', '#46C666']}
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

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.medium,
    paddingTop:theme.spacing.large
  },
  viewerItem: {
    marginBottom: theme.spacing.medium,
  },
  cardBackground: {
    borderRadius: theme.radius.semiCircle,
    overflow: 'hidden',
    shadowColor: theme.colors.text,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: theme.radius.semiCircle,
  },
  cardContent: {
    flexDirection: 'row',
    padding: theme.spacing.medium,
    alignItems: 'center',
  },
  viewerImage: {
    width: 60,
    height: 60,
    borderRadius: theme.radius.circle,
    marginRight: theme.spacing.medium,
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
    fontSize: theme.fonts.size.large,
    fontWeight: '600',
    color: theme.colors.buttonText,
  },
  viewerTimestamp: {
    fontSize: theme.fonts.size.medium,
    color: theme.colors.buttonText,
    marginTop: 5,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.large,
  },
  emptyStateText: {
    fontSize: theme.fonts.size.medium,
    color: theme.colors.text,
  },
});

export default ProfileViewers;
