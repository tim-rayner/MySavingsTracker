import React from "react";

import { Tabs, Redirect } from "expo-router";

//Stores
import { useUserStore } from "@/src/stores/userStore";

//icons
import Entypo from "@expo/vector-icons/Entypo";

// eslint-disable-next-line import/no-unresolved
import { theme } from "@/theme";

export default function Layout() {
  const hasFinishedOnboarding = useUserStore(
    (state) => state.hasFinishedOnboarding,
  );

  if (!hasFinishedOnboarding) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: theme.colorLightBlue }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "My Savings Tracker",
          tabBarShowLabel: false,
          tabBarIcon: ({ size, color }) => (
            <Entypo name="wallet" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: "Insights",
          tabBarShowLabel: false,
          tabBarIcon: ({ size, color }) => (
            <Entypo name="line-graph" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarShowLabel: false,
          tabBarIcon: ({ size, color }) => (
            <Entypo name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
