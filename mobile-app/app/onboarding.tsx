import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { BrandButton } from "@/src/components/atoms/BrandButton";
import { theme } from "@/theme";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";

//store
import { useUserStore } from "@/src/stores/userStore";
import { useState } from "react";

type OnboardingStep = {
  title: string;
  subTitle: string;
  icon: string;
};

const onboardingSteps: OnboardingStep[] = [
  {
    title: "Welcome to My Savings Tracker",
    subTitle:
      "Save better and track your expenses. All your expenses in one place.",
    icon: "wallet",
  },
  {
    title: "Track every transaction",
    subTitle: "Keep track of every transaction with our easy to use app",
    icon: "people-arrows",
  },
  {
    title: "Gamify your finances",
    subTitle: " Gamify your finances and save more",
    icon: "gamepad",
  },
];

export default function NewOnboardingScreen() {
  const router = useRouter();

  const toggleHasOnboarded = useUserStore((state) => state.toggleHasOnboarded);

  const onboardingPageNext = useUserStore((state) => state.onboardingPageNext);
  const onboardingPagePrev = useUserStore((state) => state.onboardingPagePrev);

  const [onboardingPageIndex, setOnboardingPageIndex] = useState(
    useUserStore((state) => state.onboardingPageIndex),
  );

  const data = onboardingSteps[onboardingPageIndex] || onboardingSteps[0];

  const onContinue = () => {
    console.log("onContinue", onboardingPageIndex);
    if (onboardingPageIndex < onboardingSteps.length - 1) {
      onboardingPageNext(onboardingSteps.length);
      setOnboardingPageIndex(onboardingPageIndex + 1);
      return;
    }
    endOnboarding();
  };

  const endOnboarding = () => {
    if (onboardingPageIndex === onboardingSteps.length - 1) {
      return;
    }
    toggleHasOnboarded();
    //@todo: replace with the start of the auth flow (login or register)
    router.replace("/profile");
  };

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.pageContent}>
        <FontAwesome5 name={data.icon} size={100} style={styles.icon} />
      </View>
      <View style={styles.footer}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.subTitle}>{data.subTitle}</Text>

        <View style={styles.buttons}>
          <Text style={styles.buttonText} onPress={endOnboarding}>
            Skip
          </Text>
          <BrandButton
            title="Continue"
            onPress={onContinue}
            style={styles.button}
          />
        </View>
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
    padding: 20,
    flex: 1, //take everything available to you
    justifyContent: "center",
  },
  title: {
    color: theme.colorWhite,
    fontSize: 50,
    fontWeight: "bold",
    letterSpacing: 1.1,
    marginVertical: 10,
  },
  subTitle: { color: "grey", fontSize: 20, lineHeight: 28 },
  icon: {
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
});
