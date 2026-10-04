import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>

      <Text style={styles.icon}>
        👤
      </Text>

      <Text style={styles.title}>
        My Profile
      </Text>

      <Text style={styles.email}>
        student@example.com
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardText}>
          📋 My Posts
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardText}>
          🔖 Saved Items
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardText}>
          🔔 Notifications
        </Text>
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backText}>
          ← Back to Home
        </Text>
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

  icon: {
    fontSize: 60,
    textAlign: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },

  email: {
    textAlign: "center",
    color: "gray",
    marginTop: 5,
    marginBottom: 30,
  },

  card: {
    backgroundColor: "#f5f5f5",
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
  },

  cardText: {
    fontSize: 17,
    fontWeight: "500",
  },

  backButton: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 10,
    marginTop: 20,
  },

  backText: {
    textAlign: "center",
    fontSize: 16,
  },
});