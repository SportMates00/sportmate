
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Entypo size={28} name="game-controller" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="games"
        options={{
          title: "Games",
          tabBarIcon: ({ color }) => (
            <Entypo size={28} name="game-controller" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: "Activity",
          tabBarIcon: ({ color }) => (
            <Entypo size={28} name="game-controller" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}