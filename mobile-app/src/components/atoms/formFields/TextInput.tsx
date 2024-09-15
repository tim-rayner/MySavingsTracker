import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputEndEditingEventData,
} from "react-native";
import { InputContainer } from "../InputContainer";
import { LoadingIndicator } from "../LoadingIndicator";

export interface TextInputProps extends RNTextInputProps {
  label: string;
  error?: string;
  loading?: boolean;
}

const TextInput = ({
  label,
  error,
  loading,
  style,
  value,
  onFocus,
  onEndEditing,
  ...rest
}: TextInputProps) => {
  const [active, setActive] = useState(false);
  const textInputRef = useRef<RNTextInput>(null);

  useEffect(() => {
    setActive(!!(value || rest.defaultValue));
  }, [value, rest.defaultValue]);

  const handleContainerPress = () => {
    textInputRef.current?.focus();
  };

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setActive(true);
    onFocus?.(e);
  };

  //@todo: or just blur?
  const handleEndEditing = (
    e: NativeSyntheticEvent<TextInputEndEditingEventData>,
  ) => {
    setActive(!!value);
    onEndEditing?.(e);
  };

  return (
    <InputContainer
      onPress={handleContainerPress}
      label={label}
      error={error}
      active={active}
      icon={loading && <LoadingIndicator size="small" />}
    >
      <RNTextInput
        ref={textInputRef}
        value={value}
        onFocus={handleFocus}
        onEndEditing={handleEndEditing}
        {...rest}
        style={[styles.input, style]}
      />
    </InputContainer>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    fontSize: 16,
    minHeight: 28, // min height that makes a difference on android. This is to normalise with iOS
    maxHeight: 110,
    verticalAlign: "top", // Android
  },
});

export default TextInput;
