import { Text, View, StyleSheet } from "react-native";
import { theme } from "@/theme";

//stores
import { useUserStore } from "@/src/stores/userStore";
import { BrandButton } from "@/src/components/atoms/BrandButton";
import { Link } from "expo-router";

export default function ProfileScreen() {
  const toggleHasOnboarded = useUserStore((state) => state.toggleHasOnboarded);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile</Text>

      <Link href="/onboarding">
        <BrandButton title="Go to onboarding" onPress={toggleHasOnboarded} />
      </Link>
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

  button: {
    marginVertical: 10,
  },
});
