import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { router } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email === "" || password === "") {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    Alert.alert("Success", "Login successful");

    router.replace("/");
  };

  return (
    <View style={styles.container}>

      {/* Title */}
      <Text style={styles.logo}>
        🔎 FindIt
      </Text>

      <Text style={styles.title}>
        Welcome Back!
      </Text>

      <Text style={styles.subtitle}>
        Login to continue
      </Text>

      {/* Email */}
      <Text style={styles.label}>
        Email
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password */}
      <Text style={styles.label}>
        Password
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Login Button */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
      >
        <Text style={styles.loginButtonText}>
          Login
        </Text>
      </TouchableOpacity>

      {/* Register */}
      <Text style={styles.registerText}>
        Don't have an account? Register
      </Text>

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

  backButton: {
    marginTop: 20,
    padding: 12,
  },

   registerText: {
    textAlign: "center",
    color: "gray",
    marginTop: 25,
  },

  backText: {
    textAlign: "center",
    fontSize: 16,
    color: "#555555",
  },
});