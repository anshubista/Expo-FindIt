// One place for the app's colours. Change a colour here and every screen updates.
export const colors = {
  primary: "#1E2A5A", // deep navy: header, main buttons
  background: "#F5F3EE", // warm off-white page background
  card: "#FFFFFF",
  text: "#1B1F2A",
  muted: "#6B7280",
  border: "#E5E2DA",
  lost: "#E5484D",
  lostSoft: "#FDECEC",
  found: "#2E9E6B",
  foundSoft: "#E4F5EC",
  white: "#FFFFFF",
};

// A soft shadow used by cards
export const shadow = {
  shadowColor: "#000000",
  shadowOpacity: 0.08,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 3 },
  elevation: 3,
};

// Picks an emoji from the category the user typed
export function categoryIcon(category: string) {
  const c = category.toLowerCase();
  if (c.includes("wallet") || c.includes("purse")) return "👛";
  if (c.includes("phone") || c.includes("mobile")) return "📱";
  if (c.includes("laptop") || c.includes("electronic") || c.includes("charger")) return "💻";
  if (c.includes("key")) return "🔑";
  if (c.includes("book") || c.includes("note")) return "📚";
  if (c.includes("bag") || c.includes("backpack")) return "🎒";
  if (c.includes("card") || c.includes("id")) return "🪪";
  if (c.includes("bottle")) return "🧴";
  if (c.includes("cloth") || c.includes("jacket")) return "🧥";
  return "📦";
}
