// Games.jsx
import React, { useLayoutEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import AllGames from './AllGames';
import MyGames from './MyGames';
import { useSelector } from 'react-redux';
import { useTheme } from '@/src/theme/themeContext';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';


const Games = () => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const navigation = useNavigation();
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState('AllGames');
  const loggedUser = useSelector(user => user.user);


  const games = useSelector(state => state.gameEvents.events);

  const addGame = (newGame) => {
  setGames(prev => [newGame, ...prev]);
};



  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerShadowVisible: false,
      headerBackButtonDisplayMode: 'minimal',
      headerBackTitleVisible: false,
      headerBackTitle: '',

      headerStyle: {
        backgroundColor: theme.colors.background,
        borderBottomWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
      },

      headerTitleStyle: {
        color: theme.colors.text,
        fontFamily: theme.fonts.family,
      },

      headerTintColor: theme.colors.text,
    });
  }, [navigation, theme]);

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        {['AllGames', 'MyGames'].map((tab, index) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab,
              index === 1 && { marginLeft: 12 },
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={
                activeTab === tab
                  ? styles.activeText
                  : styles.inactiveText
              }
            >
              {tab === 'AllGames'
                ? t('AllGames')
                : t('MyGames')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'AllGames' ? (
        <AllGames loggedUser={loggedUser} games={games} addGame={addGame}/>
      ) : (
        
        <MyGames loggedUser={loggedUser} games={games} />

      )}
    </View>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
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
