import { Stack } from "expo-router";
import { ItemProvider } from "../components/ui/context/ItemContext";
import { colors } from "../constants/searchit-theme";

export default function RootLayout() {
  return (
    <ItemProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.white,
          headerTitleStyle: { fontWeight: "bold" },
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="index"
          options={{
            headerShown: false, // Home draws its own header
          }}
        />

        <Stack.Screen
          name="post-item"
          options={{
            title: "Report Item",
          }}
        />

        <Stack.Screen
          name="profile"
          options={{
            title: "Profile",
          }}
        />

        <Stack.Screen
          name="item-details"
          options={{
            title: "Item Details",
          }}
        />
                <Stack.Screen
          name="found_item"
          options={{
            title: "I Found This",
          }}
        />
      </Stack>
    </ItemProvider>
  );
}