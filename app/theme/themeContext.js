import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { THEME } from './theme';

const THEME_MODE_KEY = 'app_theme_mode';

const ThemeContext = createContext({
  theme: THEME.light,
  mode: 'light',
  toggleTheme: () => {},
  setTheme: (mode) => {},
});

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  // Load the saved theme on app start
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedMode = await AsyncStorage.getItem(THEME_MODE_KEY);
        if (storedMode) {
          setMode(storedMode);
        } else {
          const colorScheme = Appearance.getColorScheme();
          setMode(colorScheme === 'dark' ? 'dark' : 'light');
        }
      } catch (error) {
        console.error('Failed to load theme mode:', error);
      }
    };
    loadTheme();
  }, []);

  // Toggle and persist the theme
  const toggleTheme = async () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    try {
      await AsyncStorage.setItem(THEME_MODE_KEY, newMode);
    } catch (error) {
      console.error('Failed to save theme mode:', error);
    }
  };

  // Optionally allow directly setting a theme
  const setTheme = async (newMode) => {
    setMode(newMode);
    try {
      await AsyncStorage.setItem(THEME_MODE_KEY, newMode);
    } catch (error) {
      console.error('Failed to save theme mode:', error);
    }
  };

  const value = useMemo(() => ({
    theme: mode === 'light' ? THEME.light : THEME.dark,
    mode,
    toggleTheme,
    setTheme,
  }), [mode]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
