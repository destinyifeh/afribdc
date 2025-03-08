import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { useGlobalStore } from "@/stores/global-store";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

export default function TabLayout() {
  const { themeColor } = useGlobalStore((state) => state);

  const renderHomeIcon = (color: string) => {
    return <AntDesign name="home" size={20} color={color} />;
  };

  const renderFavIcon = (color: string) => {
    return <AntDesign size={20} name="heart" color={color} />;
  };

  const renderSettingsIcon = (color: string) => {
    return <MaterialIcons size={20} name="settings" color={color} />;
  };

  const renderProfileIcon = (color: string) => {
    return (
      <MaterialCommunityIcons
        name="credit-card-check-outline"
        size={20}
        color={color}
      />
    );
  };

  const renderSearchIcon = (color: string) => {
    return <Ionicons name="wallet-outline" size={20} color={color} />;
  };

  const renderChatIcon = (color: string) => {
    return <Ionicons name="bag-check-outline" size={20} color={color} />;
  };

  return (
    <Tabs
      screenOptions={{
        //tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarActiveTintColor: "#22A37C",
        tabBarInactiveTintColor: "#0C263A",

        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          android: {
            backgroundColor: "#f3f3f4",
            //borderRadius: 25,
            //  width: '80%',
            // alignSelf: 'center',
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "HOME",
          tabBarIcon: ({ color }) => renderHomeIcon(color),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "WALLET",
          tabBarIcon: ({ color }) => renderSearchIcon(color),
        }}
      />

      <Tabs.Screen
        name="chats"
        options={{
          title: "ORDERS",
          tabBarIcon: ({ color }) => renderChatIcon(color),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "CARDS",
          tabBarIcon: ({ color }) => renderProfileIcon(color),
        }}
      />
    </Tabs>
  );
}
