import React from "react";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { theme } from "@/theme";
import { useUser } from "@clerk/clerk-expo";

export default function HomeScreen() {
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <Text>
        Welcome {user?.emailAddresses[0].emailAddress} to My Savings Tracker!
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
