import React, { useState } from "react";
import { BrandButton } from "@/src/components/atoms/BrandButton";
import TextInput from "@/src/components/atoms/formFields/TextInput";
import { StyleSheet, View, Alert } from "react-native";
import { Link } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://your-api-endpoint.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful login
        Alert.alert("Success", "Logged in successfully");
      } else {
        // Handle server errors
        Alert.alert("Error", data.message || "Something went wrong");
      }
    } catch (error) {
      // Handle network errors
      Alert.alert("Error", "Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

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
          title={loading ? "Logging in..." : "Log in"}
          onPress={handleLogin}
          style={styles.button}
          disabled={loading}
        />
      </View>

      <Link href="/passwordReset" style={styles.pwReset}>
        Forgot password?
      </Link>

      <Link href="/register" style={styles.createAccount}>
        Create Account
      </Link>
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
