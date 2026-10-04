import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { useItems } from "../components/ui/context/ItemContext";
import { colors, shadow } from "../constants/searchit-theme";
export default function PostItemScreen() {
  const { addItem } = useItems();
  const type = "Lost"; // this form only reports lost items
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = () => {
    if (
      !itemName.trim() ||
      !category.trim() ||
      !description.trim() ||
      !location.trim() ||
      !date.trim()
    ) {
      Alert.alert("Missing details", "Please fill in all the fields marked *");
      return;
    }

    addItem({
      id: Date.now().toString(),
      itemName: itemName.trim(),
      category: category.trim(),
      description: description.trim(),
      location: location.trim(),
      date: date.trim(),
      type,
    });

    Alert.alert("Done", "Item report submitted!");
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🔴 Report a Lost Item</Text>

      <Text style={styles.description}>
        Tell us what you lost so others can help find it.
      </Text>


      {/* Item Name */}
      <Text style={styles.label}>Item Name *</Text>

      <TextInput
        style={styles.input}
        placeholder="e.g. Black Wallet"
        value={itemName}
        onChangeText={setItemName}
      />

      {/* Category */}
      <Text style={styles.label}>Category *</Text>

      <TextInput
        style={styles.input}
        placeholder="e.g. Wallet, Electronics, Books"
        value={category}
        onChangeText={setCategory}
      />

      {/* Description */}
      <Text style={styles.label}>Description *</Text>

      <TextInput
        style={styles.descriptionInput}
        placeholder="Tell us more about the item..."
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {/* Location */}
      <Text style={styles.label}>Location *</Text>

      <TextInput
        style={styles.input}
        placeholder="e.g. College Canteen"
        value={location}
        onChangeText={setLocation}
      />

      {/* Date */}
      <Text style={styles.label}>Date *</Text>

      <TextInput
        style={styles.input}
        placeholder="e.g. 03/10/2026"
        value={date}
        onChangeText={setDate}
      />

      {/* Submit */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>✓ Submit Report</Text>
      </TouchableOpacity>

      {/* Back */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 8,
  },

  description: {
    fontSize: 15,
    color: colors.muted,
    lineHeight: 22,
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 8,
    marginTop: 10,
  },

  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 14,
    fontSize: 15,
    marginBottom: 10,
  },

  descriptionInput: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 14,
    fontSize: 15,
    height: 120,
    textAlignVertical: "top",
    marginBottom: 10,
  },

  submitButton: {
    backgroundColor: colors.lost,
    padding: 16,
    borderRadius: 14,
    marginTop: 20,
    ...shadow,
  },

  submitText: {
    color: colors.white,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },

  backButton: {
    padding: 15,
    marginTop: 10,
  },

  backText: {
    textAlign: "center",
    fontSize: 16,
    color: colors.muted,
  },
});
