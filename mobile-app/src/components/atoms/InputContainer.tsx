import { useEffect } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export interface InputContainerProps
  extends React.ComponentProps<typeof Pressable> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  active?: boolean;
  children: React.ReactNode;
}

/**
 * Input container
 * For stuff like text inputs, selects, etc.
 */
export function InputContainer({
  label,
  error,
  icon,
  active,
  children,
  ...rest
}: InputContainerProps) {
  const offset = useSharedValue(0);
  const containerRef = useAnimatedRef();

  useEffect(() => {
    offset.value = withTiming(active ? 1 : 0, { duration: 200 });
  }, [active]);

  const labelScale = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(offset.value, [0, 1], [1, 0.8]),
      },
      { translateY: interpolate(offset.value, [0, 1], [0, -12]) },
    ],
  }));

  return (
    <Pressable {...rest}>
      <View style={styles.container}>
        <View style={{ position: "relative", flex: 1, height: "100%" }}>
          <View style={styles.childContainer}>{children}</View>
          <Animated.View style={[styles.label, labelScale]}>
            <Text style={styles.labelText}>{label}</Text>
          </Animated.View>
        </View>
        {icon}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  label: {
    position: "absolute",
    opacity: 0.5,
    justifyContent: "center",
    height: 41,
    transformOrigin: "top left",
  },
  container: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "chrome300",
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  childContainer: {
    paddingTop: 8,
  },
  labelText: {
    fontSize: 16,
  },
});
