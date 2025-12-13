// GamesScreen.js
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import AllGames from './AllGames';
import MyGames from './MyGames';
import { useSelector } from 'react-redux';
import { useTheme } from '@/src/theme/themeContext';

const Games = () => {
  const { theme } = useTheme(); // Get current theme
  const styles = getStyles(theme);

  const [activeTab, setActiveTab] = useState('AllGames');
  const loggedUser = useSelector(user => user.user);

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        {['AllGames', 'MyGames'].map((tab, index) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab,
              index === 1 && { marginLeft: 12 }
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={activeTab === tab ? styles.activeText : styles.inactiveText}>
              {tab === 'AllGames' ? 'All Games' : 'My Games'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'AllGames'
        ? <AllGames loggedUser={loggedUser} />
        : <MyGames />}
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    paddingBottom: 15,
    backgroundColor: theme.colors.background,
    elevation: 0,
    shadowColor: 'transparent',
  },

  tab: {
    paddingVertical: 8,
    paddingHorizontal: 15,
  },

  activeTab: {
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
  },

  activeText: {
    color: theme.colors.buttonText,
    fontWeight: 'bold',
    fontFamily: theme.fonts.family,
  },

  inactiveText: {
    color: theme.colors.text,
    fontFamily: theme.fonts.family,
  },
});

export default Games;
