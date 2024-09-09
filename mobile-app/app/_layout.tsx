import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

/**
 *
 * @todo Implement fonts with @expo-google-fonts/inter
 */
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false, animation: "fade" }}
        />
        <Stack.Screen
          name="onboarding"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
