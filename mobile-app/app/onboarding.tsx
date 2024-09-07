import { StyleSheet, Text } from "react-native";
import { BrandButton } from "@/src/components/atoms/BrandButton";
import { theme } from "@/theme";
import { useUserStore } from "@/src/stores/userStore";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function OnboardingScreen() {
  const router = useRouter();
  const toggleHasOnboarded = useUserStore((state) => state.toggleHasOnboarded);

  const handlePress = () => {
    toggleHasOnboarded();
    router.replace("/");
  };

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[theme.colorBlue, theme.colorBlue, theme.colorDeepBlue]}
      style={styles.container}
    >
      <Text style={styles.subtext}>Welcome to</Text>
      <Text style={styles.text}>My Savings Tracker</Text>

      <BrandButton title="Finish onboarding" onPress={handlePress} />
    </LinearGradient>
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
    fontSize: 36,
    marginBottom: 30,
  },
  subtext: {
    fontSize: 24,
    marginBottom: 10,
  },
});
