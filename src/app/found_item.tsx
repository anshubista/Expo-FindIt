import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useItems } from "../components/ui/context/ItemContext";

export default function FoundItemScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { items, markAsFound } = useItems();

  const [foundLocation, setFoundLocation] = useState("");
  const [foundNote, setFoundNote] = useState("");

  const item = items.find((i) => i.id === id);

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Item not found</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleSubmit = () => {
    if (!foundLocation.trim()) {
      Alert.alert("Missing details", "Please tell us where you found it");
      return;
    }

    // This is the line that changes Lost → Found
    markAsFound(item.id, {
      foundLocation: foundLocation.trim(),
      foundNote: foundNote.trim(),
    });

    Alert.alert("Thank you!", "The item is now marked as Found.");
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>You found "{item.itemName}"?</Text>
      <Text style={styles.description}>
        Add a few details so the owner can get it back.
      </Text>

      <Text style={styles.label}>Where did you find it? *</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Near the library entrance"
        value={foundLocation}
        onChangeText={setFoundLocation}
      />

      <Text style={styles.label}>Note for the owner</Text>
      <TextInput
        style={styles.noteInput}
        placeholder="e.g. I kept it at the front desk"
        value={foundNote}
        onChangeText={setFoundNote}
        multiline
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>✓ Mark as Found</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 25,
    paddingTop: 60,
  },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 10 },
  description: {
    fontSize: 16,
    color: "#666666",
    lineHeight: 24,
    marginBottom: 25,
  },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 8, marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 12,
    padding: 15,
    fontSize: 15,
    marginBottom: 10,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 12,
    padding: 15,
    fontSize: 15,
    height: 120,
    textAlignVertical: "top",
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#4caf50",
    padding: 17,
    borderRadius: 12,
    marginTop: 20,
  },
  submitText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },
  backButton: { padding: 15, marginTop: 12, marginBottom: 30 },
  backText: { textAlign: "center", fontSize: 16, color: "#555555" },
});
