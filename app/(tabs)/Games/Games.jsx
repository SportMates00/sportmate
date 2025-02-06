// Games.jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AllGames from './AllGames';
import MyGames from './MyGames';

const Games = () => {
  const [activeTab, setActiveTab] = useState('AllGames');

  return (
    <View style={styles.container}>
      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => setActiveTab('AllGames')}
          style={[styles.tab, activeTab === 'AllGames' && styles.activeTab]}
        >
          <Text style={[styles.tabText, activeTab === 'AllGames' && styles.activeTabText]}>
            All Games
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('MyGames')}
          style={[styles.tab, activeTab === 'MyGames' && styles.activeTab]}
        >
          <Text style={[styles.tabText, activeTab === 'MyGames' && styles.activeTabText]}>
            My Games
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>
        {activeTab === 'AllGames' ? <AllGames /> : <MyGames />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFEF',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 50,
  },
  activeTab: {
    backgroundColor: '#1E90FF',
  },
  tabText: {
    fontSize: 16,
    color: '#1E90FF',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
});

export default Games;
