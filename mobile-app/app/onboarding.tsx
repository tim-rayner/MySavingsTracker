import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { BrandButton } from "@/src/components/atoms/BrandButton";
import { theme } from "@/theme";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  Directions,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";

//store
import { useUserStore } from "@/src/stores/userStore";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInRight,
  SlideOutLeft,
} from "react-native-reanimated";

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
    subTitle: "Gamify your finances and save more",
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
    if (onboardingPageIndex < onboardingSteps.length - 1) {
      onboardingPageNext(onboardingSteps.length);
      setOnboardingPageIndex(onboardingPageIndex + 1);
      return;
    }
    endOnboarding();
  };

  //For future use
  const onBack = () => {
    if (onboardingPageIndex <= 0) {
      return;
    }
    onboardingPagePrev();
    setOnboardingPageIndex(onboardingPageIndex - 1);
  };

  const endOnboarding = () => {
    toggleHasOnboarded();
    //@todo: replace with the start of the auth flow (login or register)
    router.replace("/profile");
  };

  //handle directional swipe gestures
  const swipes = Gesture.Simultaneous(
    Gesture.Fling().direction(Directions.LEFT).onEnd(onContinue),
    Gesture.Fling().direction(Directions.RIGHT).onEnd(onBack),
  );

  return (
    <SafeAreaView style={styles.page}>
      <StatusBar style="light" />
      <GestureDetector gesture={swipes}>
        <Animated.View key={onboardingPageIndex} style={styles.pageContent}>
          <View style={styles.stepIndicatorContainer}>
            {onboardingSteps.map((step, index) => (
              <View
                key={index}
                style={[
                  styles.stepIndicator,
                  index === onboardingPageIndex
                    ? styles.activeStepIndicator
                    : {},
                ]}
              />
            ))}
          </View>

          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            style={styles.iconContainer}
          >
            <FontAwesome5 name={data.icon} size={100} style={styles.icon} />
          </Animated.View>

          <View style={styles.footer}>
            <Animated.Text
              entering={SlideInRight}
              exiting={SlideOutLeft}
              style={styles.title}
            >
              {data.title}
            </Animated.Text>
            <Animated.Text
              entering={SlideInRight.delay(150)}
              exiting={SlideOutLeft.delay(150)}
              style={styles.subTitle}
            >
              {data.subTitle}
            </Animated.Text>

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
        </Animated.View>
      </GestureDetector>
    </SafeAreaView>
  );
}

/**
 * @todo: fix small UI bug with icon moving on initial render of the onboarding screen
 */
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
  },
  title: {
    color: theme.colorWhite,
    fontSize: 50,
    fontWeight: "bold",
    letterSpacing: 1.1,
    marginVertical: 10,
  },
  subTitle: { color: "grey", fontSize: 20, lineHeight: 28 },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  icon: {
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
  stepIndicatorContainer: {
    flex: 1,
    flexDirection: "row",
    top: 10,
    marginHorizontal: 15,
  },
  stepIndicator: {
    flex: 1, //eqally share the space with the other indicators
    height: 5,
    backgroundColor: "grey",
    margin: 5,
    borderRadius: 10,
  },
  activeStepIndicator: {
    backgroundColor: theme.colorBlue,
  },
  footer: {
    marginTop: "auto",
    padding: 20,
  },
});
