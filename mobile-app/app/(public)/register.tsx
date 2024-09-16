import React, { useState } from "react";
import { BrandButton } from "@/src/components/atoms/BrandButton";
import TextInput from "@/src/components/atoms/formFields/TextInput";
import { StyleSheet, View, Alert } from "react-native";
import { Link } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";

export default function RegisterScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");

  const [pendingVerification, setPendingVerification] = useState(false);

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    setLoading(true);

    try {
      //Create the user on Clerk
      await signUp.create({
        emailAddress: email,
        password,
      });

      //send verification email
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      //change ui to verify the email address
      setPendingVerification(true);
    } catch (error: any) {
      console.log(error);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;

    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      //set active session
      await setActive({ session: completeSignUp.createdSessionId });
    } catch (error: any) {
      console.log(error);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (pendingVerification) {
    return (
      <View style={styles.page}>
        <View style={styles.inputGroup}>
          <View style={styles.inputField}>
            <TextInput
              label="Verification code"
              value={code}
              onChangeText={setCode}
              style={styles.inputField}
            />
          </View>

          <BrandButton
            title={loading ? "Verifying..." : "Verify"}
            onPress={onPressVerify}
            style={styles.button}
            disabled={loading}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <View style={styles.inputGroup}>
        <View style={styles.inputField}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={handleEmailChange}
            style={styles.inputField}
          />
        </View>
        <View style={styles.inputField}>
          <TextInput
            label="Password"
            value={password}
            onChangeText={handlePasswordChange}
            style={styles.inputField}
            secureTextEntry
          />
        </View>

        <BrandButton
          title={loading ? "Signing up..." : "Sign up"}
          onPress={onSignUpPress}
          style={styles.button}
          disabled={loading}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputGroup: {
    width: "80%",
  },
  inputField: {
    marginBottom: 20,
  },
  button: {
    // Add your button styles here
  },
  pwReset: {
    marginTop: 20,
  },
  createAccount: {
    marginTop: 20,
  },
});
