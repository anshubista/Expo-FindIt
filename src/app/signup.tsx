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

export default function SignupScreen() {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    // Check empty fields
    if (
      name.trim() === "" ||
      userId.trim() === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    // Check passwords
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      // Get existing users
      const existingUsers = await AsyncStorage.getItem("users");

      // If users exist, convert them from JSON to array
      // Otherwise create an empty array
      const users = existingUsers ? JSON.parse(existingUsers) : [];

      // Check if User ID already exists
      const userAlreadyExists = users.some(
        (user: any) =>
          user.userId.toLowerCase() === userId.trim().toLowerCase(),
      );

      if (userAlreadyExists) {
        Alert.alert(
          "Error",
          "This User ID already exists. Please choose another one.",
        );
        return;
      }

      // Create new user
      const newUser = {
        name: name.trim(),
        userId: userId.trim(),
        password: password,
      };

      // Add new user to users array
      users.push(newUser);

      // Save users in AsyncStorage
      await AsyncStorage.setItem("users", JSON.stringify(users));

      Alert.alert("Success", "Account created successfully!", [
        {
          text: "OK",
          onPress: () => router.replace("/login"),
        },
      ]);
    } catch (error) {
      console.log("Signup error:", error);

      Alert.alert("Error", "Something went wrong while creating the account.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Text style={styles.logo}>🔎 FindIt</Text>

      {/* Title */}
      <Text style={styles.title}>Create Account</Text>

      <Text style={styles.subtitle}>Sign up to continue</Text>

      {/* Name */}
      <Text style={styles.label}>Name</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      {/* User ID */}
      <Text style={styles.label}>User ID</Text>

      <TextInput
        style={styles.input}
        placeholder="Create a User ID"
        value={userId}
        onChangeText={setUserId}
        autoCapitalize="none"
      />

      {/* Password */}
      <Text style={styles.label}>Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Create a password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Confirm Password */}
      <Text style={styles.label}>Confirm Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter password again"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupText}>Create Account</Text>
      </TouchableOpacity>

      {/* Login */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace("/login")}
      >
        <Text style={styles.backText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 25,
    paddingTop: 60,
  },

  logo: {
    fontSize: 38,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 25,
  },

  label: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 7,
  },

  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },

  signupButton: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
  },

  signupText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },

  backButton: {
    marginTop: 20,
    padding: 12,
  },

  backText: {
    textAlign: "center",
    color: "#555555",
    fontSize: 15,
  },
});
