import { theme } from "@/theme";
import { StyleSheet, Text, Pressable, Platform, ViewStyle } from "react-native";
import * as Haptics from "expo-haptics";

interface BrandButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle; // Add style prop
  disabled?: boolean;
}

export function BrandButton({
  title,
  onPress,
  style,
  disabled,
}: BrandButtonProps) {
  const handlePressed = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress();
  };

  return (
    <Pressable
      onPress={handlePressed}
      style={(state) => {
        if (state.pressed) {
          return [styles.button, styles.buttonPressed, style];
        }
        if (disabled) {
          return [styles.button, styles.buttonDisabled, style];
        }
        return [styles.button, style];
      }}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "semibold",
  },
  button: {
    paddingHorizontal: 18,
    paddingVertical: 12,

    backgroundColor: theme.primary,
    alignItems: "center",
    borderRadius: 50,
  },
  buttonPressed: {
    backgroundColor: theme.colorDeepBlue,
  },
  buttonDisabled: {
    backgroundColor: theme.colorGrey,
  },
});
