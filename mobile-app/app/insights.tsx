import { Text, View, StyleSheet } from "react-native";
import { theme } from "@/theme";

export default function InsightsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Saving Insights</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colorWhite,
  },
  text: {
    fontSize: 24,
  },
});
