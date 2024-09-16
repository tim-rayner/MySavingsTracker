import React from "react";

import { Tabs, Redirect } from "expo-router";

//Stores
import { useUserStore } from "@/src/stores/userStore";

//icons
import Entypo from "@expo/vector-icons/Entypo";
import { FontAwesome5 } from "@expo/vector-icons";

// eslint-disable-next-line import/no-unresolved
import { theme } from "@/theme";
import { Pressable } from "react-native";
import { useAuth } from "@clerk/clerk-expo";

const LogoutButton = () => {
  const { signOut } = useAuth();

  function doLogout() {
    signOut();
  }
  return (
    <Pressable onPress={doLogout} style={{ marginRight: 10 }}>
      <FontAwesome5 name="user-slash" size={20} />
    </Pressable>
  );
};

export default function Layout() {
  const { isSignedIn } = useAuth();

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
        //protects the route from being accessed if the user is not signed in
        redirect={!isSignedIn}
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
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarShowLabel: false,
          tabBarIcon: ({ size, color }) => (
            <Entypo name="user" size={size} color={color} />
          ),
          headerRight: LogoutButton,
        }}
        redirect={!isSignedIn}
      />
    </Tabs>
  );
}
