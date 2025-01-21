
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
        name="Games"
        options={{
          title: "Games",
          tabBarIcon: ({ color }) => (
            <Entypo size={28} name="game-controller" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Players"
        options={{
          title: "Players",
          tabBarIcon: ({ color }) => (
            <Entypo size={28} name="game-controller" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Activity"
        options={{
          title: "Activity",
          tabBarIcon: ({ color }) => (
            <Entypo size={28} name="game-controller" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Inbox"
        options={{
          title: "Inbox",
          tabBarIcon: ({ color }) => (
            <Entypo size={28} name="game-controller" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}