import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { useItems } from "../components/ui/context/ItemContext";
import { colors, shadow, categoryIcon } from "../constants/searchit-theme";

const TABS = ["All", "Lost", "Found"] as const;

export default function HomeScreen() {
  const [searchText, setSearchText] = useState("");
  const [selectedTab, setSelectedTab] = useState<(typeof TABS)[number]>("All");
  const { items } = useItems();

  const search = searchText.toLowerCase();

  const filterItems = items.filter((item) => {
    const matchesTab = selectedTab === "All" || item.type === selectedTab;
    const matchesSearch =
      item.itemName.toLowerCase().includes(search) ||
      item.location.toLowerCase().includes(search) ||
      item.category.toLowerCase().includes(search);

    return matchesTab && matchesSearch;
  });

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.logo}>FindIt</Text>
          <Text style={styles.subtitle}>University Campus • Lost & Found</Text>
        </View>

        <TouchableOpacity
          style={styles.profileIcon}
          onPress={() => router.push("/profile")}
        >
          <Text style={styles.profileIconText}>👤</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* SEARCH */}
        <TextInput
          style={styles.searchInput}
          placeholder="🔍  Search keys, phones, bags..."
          placeholderTextColor={colors.muted}
          value={searchText}
          onChangeText={setSearchText}
        />

        {/* MAIN BUTTON */}
        <TouchableOpacity
          style={styles.reportButton}
          onPress={() => router.push("/post-item")}
        >
          <Text style={styles.reportButtonText}>＋  Report a Lost Item</Text>
        </TouchableOpacity>

        {/* TABS */}
        <View style={styles.tabsContainer}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, selectedTab === tab && styles.activeTab]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === tab && styles.activeTabText,
                ]}
              >
                {tab === "Lost" ? "🔴 Lost" : tab === "Found" ? "🟢 Found" : "All"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.heading}>Recent Campus Activity</Text>

        {/* EMPTY STATE */}
        {filterItems.length === 0 && (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyIcon}>🗂️</Text>
            <Text style={styles.emptyTitle}>Nothing here yet</Text>
            <Text style={styles.emptyText}>
              Reported items will appear here.
            </Text>
          </View>
        )}

        {/* ITEM CARDS */}
        {filterItems.map((item) => {
          const isLost = item.type === "Lost";

          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.card,
                { borderLeftColor: isLost ? colors.lost : colors.found },
              ]}
              onPress={() =>
                router.push({
                  pathname: "/item-details",
                  params: { id: item.id },
                })
              }
            >
              <View
                style={[
                  styles.itemIcon,
                  { backgroundColor: isLost ? colors.lostSoft : colors.foundSoft },
                ]}
              >
                <Text style={styles.itemIconText}>
                  {categoryIcon(item.category)}
                </Text>
              </View>

              <View style={styles.itemInfo}>
                <Text style={styles.itemName} numberOfLines={1}>
                  {item.itemName}
                </Text>
                <Text style={styles.metaText} numberOfLines={1}>
                  📍 {item.location}
                </Text>
                <Text style={styles.metaText}>{item.date}</Text>
              </View>

              <View
                style={[
                  styles.badge,
                  { backgroundColor: isLost ? colors.lostSoft : colors.foundSoft },
                ]}
              >
                <Text
                  style={[
                    styles.badgeText,
                    { color: isLost ? colors.lost : colors.found },
                  ]}
                >
                  {isLost ? "LOST" : "FOUND"}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  // Header
  header: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 22,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerText: { flex: 1 },
  logo: { fontSize: 30, fontWeight: "bold", color: colors.white },
  subtitle: { color: "#C9D0F0", fontSize: 14, marginTop: 2 },
  profileIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.18)",
    justifyContent: "center",
    alignItems: "center",
  },
  profileIconText: { fontSize: 22 },

  content: { padding: 20, paddingBottom: 40 },

  // Search + main button
  searchInput: {
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    fontSize: 15,
    color: colors.text,
    ...shadow,
  },
  reportButton: {
    backgroundColor: colors.lost,
    borderRadius: 14,
    padding: 16,
    marginTop: 16,
    ...shadow,
  },
  reportButtonText: {
    color: colors.white,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },

  // Tabs
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#E9E6DE",
    borderRadius: 14,
    padding: 4,
    marginTop: 20,
  },
  tab: { flex: 1, paddingVertical: 10, borderRadius: 11, alignItems: "center" },
  activeTab: { backgroundColor: colors.primary },
  tabText: { fontWeight: "600", color: colors.muted },
  activeTabText: { color: colors.white },

  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginTop: 24,
    marginBottom: 12,
  },

  // Cards
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 16,
    borderLeftWidth: 5,
    padding: 14,
    marginBottom: 12,
    ...shadow,
  },
  itemIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  itemIconText: { fontSize: 26 },
  itemInfo: { flex: 1, marginLeft: 12, marginRight: 8 },
  itemName: { fontSize: 17, fontWeight: "bold", color: colors.text },
  metaText: { fontSize: 13, color: colors.muted, marginTop: 3 },
  badge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  badgeText: { fontSize: 11, fontWeight: "bold", letterSpacing: 0.5 },

  // Empty state
  emptyBox: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 30,
    alignItems: "center",
    ...shadow,
  },
  emptyIcon: { fontSize: 40 },
  emptyTitle: { fontSize: 17, fontWeight: "bold", marginTop: 8, color: colors.text },
  emptyText: { color: colors.muted, marginTop: 4 },
});
