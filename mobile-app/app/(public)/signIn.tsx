import { BrandButton } from "@/src/components/atoms/BrandButton";
import { theme } from "@/theme";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInSplashScreen() {
  return (
    <SafeAreaView style={styles.page}>
      <View>
        <Text style={styles.subTitle}>My Savings Tracker</Text>
        <Text style={styles.title}>Sign in </Text>
      </View>

      <View style={styles.buttonContainer}>
        <BrandButton
          title="Register"
          onPress={() => router.push("/sign-up/register")}
          style={styles.button}
        />
        <BrandButton
          title="Log in"
          onPress={() => router.push("/auth/logIn")}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: theme.background,
    padding: 20,
  },
  pageContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    letterSpacing: 1.1,
    marginVertical: 10,
    color: theme.colorWhite,
  },
  subTitle: {
    color: "grey",
    fontSize: 20,
    lineHeight: 28,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  button: {
    flex: 1,
  },
});
