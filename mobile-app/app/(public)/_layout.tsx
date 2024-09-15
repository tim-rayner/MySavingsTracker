import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="onboarding"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="login"
        options={{
          headerTitle: "Login",
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          headerTitle: "Create Account",
        }}
      />
      <Stack.Screen
        name="passwordReset"
        options={{
          headerTitle: "Reset Password",
        }}
      />
    </Stack>
  );
}
