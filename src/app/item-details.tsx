import { Alert, StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useItems } from "../components/ui/context/ItemContext";
import { colors, shadow, categoryIcon } from "../constants/searchit-theme";

export default function ItemDetailsScreen() {
  // Home sends the id of the card you tapped
  const { id } = useLocalSearchParams<{ id: string }>();
  const { items, markAsFound } = useItems();

  const item = items.find((i) => i.id === id);

  if (!item) {
    return (
      <View style={styles.centered}>
        <Text style={styles.notFound}>Item not found.</Text>
      </View>
    );
  }

  const isLost = item.type === "Lost";

  const handleFoundItem = () => {
    Alert.alert("Item Found", "Are you sure this item was found?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes, mark as Found",
        onPress: () => {
          markAsFound(item.id); // changes Lost → Found in the shared list
        },
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* HERO */}
      <View style={styles.hero}>
        <View
          style={[
            styles.iconCircle,
            { backgroundColor: isLost ? colors.lostSoft : colors.foundSoft },
          ]}
        >
          <Text style={styles.icon}>{categoryIcon(item.category)}</Text>
        </View>

        <Text style={styles.title}>{item.itemName}</Text>

        <View
          style={[
            styles.badge,
            { backgroundColor: isLost ? colors.lostSoft : colors.foundSoft },
          ]}
        >
          <Text
            style={[styles.badgeText, { color: isLost ? colors.lost : colors.found }]}
          >
            {isLost ? "🔴 LOST" : "🟢 FOUND"}
          </Text>
        </View>
      </View>

      {/* INFO CARD */}
      <View style={styles.card}>
        <Row label="Category" value={item.category} />
        <Row label="Description" value={item.description} />
        <Row label="Location" value={`📍 ${item.location}`} />
        <Row label="Date" value={item.date} last={!item.foundLocation} />

        {item.foundLocation ? (
          <Row label="Found at" value={`📍 ${item.foundLocation}`} last={!item.foundNote} />
        ) : null}
        {item.foundNote ? <Row label="Note" value={item.foundNote} last /> : null}
      </View>

      {/* BUTTON or SUCCESS BOX */}
      {isLost ? (
        <TouchableOpacity style={styles.foundButton} onPress={handleFoundItem}>
          <Text style={styles.foundButtonText}>✅  I Found This</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.successBox}>
          <Text style={styles.successText}>🟢 This item has been found.</Text>
        </View>
      )}
    </ScrollView>
  );
}

// A small reusable piece: one "label + value" line
function Row({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <View style={[styles.row, last && styles.rowLast]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  notFound: { fontSize: 18, color: colors.muted },

  hero: { alignItems: "center", marginTop: 10, marginBottom: 24 },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: { fontSize: 46 },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.text,
    marginTop: 14,
    textAlign: "center",
  },
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 10,
  },
  badgeText: { fontWeight: "bold", letterSpacing: 0.5 },

  card: {
    backgroundColor: colors.card,
    borderRadius: 18,
    paddingHorizontal: 18,
    ...shadow,
  },
  row: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowLast: { borderBottomWidth: 0 },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.muted,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  value: { fontSize: 16, color: colors.text, marginTop: 4 },

  foundButton: {
    backgroundColor: colors.found,
    padding: 17,
    borderRadius: 14,
    marginTop: 24,
    ...shadow,
  },
  foundButtonText: {
    color: colors.white,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },
  successBox: {
    backgroundColor: colors.foundSoft,
    padding: 17,
    borderRadius: 14,
    marginTop: 24,
  },
  successText: {
    color: colors.found,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
