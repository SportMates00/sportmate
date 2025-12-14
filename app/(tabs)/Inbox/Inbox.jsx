import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/src/theme/themeContext';
import { useTranslation } from 'react-i18next';

import MessagesTab from './MessagesTab';
import GameInvitesTab from './GameInvitesTab';
import FriendRequestsTab from './FriendRequestsTab';

const Inbox = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('messages');
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { t } = useTranslation();

  const renderTab = () => {
    switch (activeTab) {
      case 'messages':
        return <MessagesTab />;
      case 'invites':
        return <GameInvitesTab />;
      case 'friends':
        return <FriendRequestsTab />;
      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (activeTab) {
      case 'messages':
        return t('InboxTitleMessages');
      case 'invites':
        return t('InboxTitleGameInvites');
      case 'friends':
        return t('InboxTitleFriendRequests');
      default:
        return t('InboxTitle');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{getTitle()}</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/75.jpg' }}
            style={styles.profilePic}
          />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'messages' && styles.activeTab]}
          onPress={() => setActiveTab('messages')}
        >
          <Ionicons
            name="chatbubble-outline"
            size={20}
            color={activeTab === 'messages' ? theme.colors.primary : '#444'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'invites' && styles.activeTab]}
          onPress={() => setActiveTab('invites')}
        >
          <FontAwesome5
            name="gamepad"
            size={18}
            color={activeTab === 'invites' ? theme.colors.primary : '#444'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'friends' && styles.activeTab]}
          onPress={() => setActiveTab('friends')}
        >
          <MaterialIcons
            name="person-add-alt-1"
            size={22}
            color={activeTab === 'friends' ? theme.colors.primary : '#444'}
          />
        </TouchableOpacity>
      </View>

      {/* Body */}
      <View style={styles.bodyContainer}>
        {renderTab()}
      </View>
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profilePic: {
    width: 35,
    height: 35,
    borderRadius: 999,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    borderRadius: 15,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  tabButton: {
    padding: 8,
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: '#e0ecff',
  },
  bodyContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default Inbox;
