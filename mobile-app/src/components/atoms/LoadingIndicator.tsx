import { ActivityIndicator, ActivityIndicatorProps } from "react-native";

export function LoadingIndicator({ color, ...rest }: ActivityIndicatorProps) {
  return <ActivityIndicator size="large" color={color} {...rest} />;
}
