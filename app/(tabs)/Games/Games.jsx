// GamesScreen.js
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import AllGames from './AllGames';
import MyGames from './MyGames';
import { useSelector } from 'react-redux';
import { useTheme } from '@/app/theme/themeContext';
const Games = () => {

    const { theme } = useTheme(); // Get current theme and toggle (if needed) 
    const styles = getStyles(theme);

  const [activeTab, setActiveTab] = useState('AllGames');

  const loggedUser = useSelector(user => user.user);

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        {['AllGames', 'MyGames'].map((tab, index) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab, index === 1 && { marginLeft: 12 }]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={activeTab === tab ? styles.activeText : styles.inactiveText}>
              {tab === 'AllGames' ? 'All Games' : 'My Games'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {activeTab === 'AllGames' ? <AllGames loggedUser={loggedUser} /> : <MyGames />}
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f0' },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    paddingBottom: 15,
    backgroundColor: 'white',
    boxShadow:'none',
    elevation:0,
    shadowColor: 'transparent',
  },
  tab: { paddingVertical: 8, paddingHorizontal: 15 },
  activeTab: {
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
  },
  activeText: { color: 'white', fontWeight: 'bold' },
  inactiveText: { color: 'black' },
});

export default Games;
