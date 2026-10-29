import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { useEffect } from "react";
import { colors } from "../../constants/colors";
import { fonts } from "../../constants/fonts";
export default function TabsLayout() {
  useEffect(() => {
    console.log(colors);
  }, []);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: { fontFamily: fonts.h2 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Menú",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cafe-outline" size={size} color={color as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="my-orders"
        options={{
          title: "Mis pedidos",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="receipt-outline"
              size={size}
              color={color as string}
            />
          ),
        }}
      />
    </Tabs>
  );
}
