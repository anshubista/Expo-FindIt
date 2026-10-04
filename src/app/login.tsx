import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Check empty fields
    if (userId.trim() === "" || password === "") {
      Alert.alert("Error", "Please enter User ID and Password");
      return;
    }

    try {
      // Get saved users
      const savedUsers = await AsyncStorage.getItem("users");

      // No users found
      if (!savedUsers) {
        Alert.alert("Login Failed", "No account found. Please sign up first.");
        return;
      }

      // Convert saved JSON into array
      const users = JSON.parse(savedUsers);

      // Find the user
      const user = users.find(
        (user: any) =>
          user.userId.toLowerCase() === userId.trim().toLowerCase() &&
          user.password === password,
      );

      // User not found
      if (!user) {
        Alert.alert("Login Failed", "Invalid User ID or Password");
        return;
      }

      // Save login status
      await AsyncStorage.setItem("isLoggedIn", "true");

      // Save current logged-in user
      await AsyncStorage.setItem("currentUser", JSON.stringify(user));

      // Login successful
      Alert.alert("Success", "Login successful", [
        {
          text: "OK",
          onPress: () => router.replace("/"),
        },
      ]);
    } catch (error) {
      console.log("Login error:", error);

      Alert.alert("Error", "Something went wrong while logging in.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Text style={styles.logo}>🔎 FindIt</Text>

      {/* Title */}
      <Text style={styles.title}>Welcome Back!</Text>

      <Text style={styles.subtitle}>Login to continue</Text>

      {/* User ID */}
      <Text style={styles.label}>User ID</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your User ID"
        value={userId}
        onChangeText={setUserId}
        autoCapitalize="none"
      />

      {/* Password */}
      <Text style={styles.label}>Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Sign Up */}
      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => router.push("/signup")}
      >
        <Text style={styles.signupButtonText}>Create New Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 25,
    paddingTop: 80,
  },

  logo: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 30,
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    fontSize: 16,
    marginBottom: 20,
  },

  loginButton: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
  },

  loginButtonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },

  signupButton: {
    borderWidth: 1,
    borderColor: "#4CAF50",
    padding: 15,
    borderRadius: 12,
    marginTop: 15,
  },

  signupButtonText: {
    color: "#4CAF50",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
