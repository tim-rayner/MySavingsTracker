import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { BrandButton } from "@/src/components/atoms/BrandButton";
import { theme } from "@/theme";
import { useUserStore } from "@/src/stores/userStore";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";

export default function NewOnboardingScreen() {
  const router = useRouter();
  const toggleHasOnboarded = useUserStore((state) => state.toggleHasOnboarded);

  const handlePress = () => {
    toggleHasOnboarded();
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.pageContent}>
        <FontAwesome5 name="people-arrows" size={100} style={styles.image} />
      </View>
      <View style={styles.footer}>
        <Text style={styles.title}>Track every transaction</Text>
        <Text style={styles.subTitle}>
          Keep track of every transaction with our easy to use app
        </Text>

        <View style={styles.buttons}>
          <Text style={styles.buttonText}> Skip </Text>
          <BrandButton
            title="Continue"
            onPress={handlePress}
            style={styles.button}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    //alignItems: "center",
    flex: 1,
    justifyContent: "center",
    backgroundColor: theme.background,
    padding: 20,
  },
  title: {
    color: theme.colorWhite,
    fontSize: 50,
    fontWeight: "bold",
    letterSpacing: 1.1,
    marginVertical: 10,
  },
  subTitle: { color: "grey", fontSize: 20, lineHeight: 28 },
  image: {
    alignSelf: "center",
    margin: 20,
    color: theme.colorBlue,
  },
  buttons: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  button: {
    flex: 1,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "semibold",
    padding: 15,
  },
  footer: {
    marginTop: "auto",
    padding: 20,
  },
  pageContent: {
    padding: 20,
    flex: 1, //take everything available to you
  },
});
