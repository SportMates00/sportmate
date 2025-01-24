import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import About from './About';
import Sports from './Sports';
import Activity from './Activity';
import Reviews from './Reviews';

export default function ProfileDetails({loggedUser}) {
  const [activeTab, setActiveTab] = useState('About'); // Default to "About"

  const tabs = ["About", "Sports", "Reviews", "Activity"];

  return (
    <View style={styles.container}>
      {/* Row of Buttons */}
      <View style={styles.tabRow}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={styles.tabButton}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Indicator Line */}
      <View style={styles.indicatorRow}>
        {tabs.map((tab) => (
          <View
            key={tab}
            style={[
              styles.indicator,
              activeTab === tab && styles.activeIndicator,
            ]}
          />
        ))}
      </View>

      {/* Content Area Placeholder */}
      <View style={styles.contentArea}>
        {activeTab === 'About' ? <About /> 
        : activeTab === 'Sports' ? <Sports /> 
        : activeTab === 'Reviews' ? <Reviews /> : <Activity /> }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 8,
  },
  tabButton: {
    paddingVertical: 8,
  },
  tabText: {
    fontSize: 16,
    color: '#444',
  },
  activeTabText: {
    fontWeight: 'bold',
    color: '#007BFF', // Highlighted text color
  },
  indicatorRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 2,
    backgroundColor: '#D3D3D3', // Gray background
  },
  indicator: {
    flex: 1,
    backgroundColor: '#D3D3D3', // Gray for inactive
    marginHorizontal: 2,
  },
  activeIndicator: {
    backgroundColor: '#007BFF', // Light blue for active
  },
  contentArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    fontSize: 18,
    color: '#333',
  },
});
