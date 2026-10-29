import { DMSans_400Regular } from "@expo-google-fonts/dm-sans";
import { Lexend_600SemiBold } from "@expo-google-fonts/lexend";
import { Manrope_800ExtraBold } from "@expo-google-fonts/manrope";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { colors } from "../constants/colors";
import { fonts } from "../constants/fonts";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Manrope_800ExtraBold,
    Lexend_600SemiBold,
    DMSans_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Stack
      screenOptions={{
        headerTitleStyle: { fontFamily: fonts.h2 },
        title: "",
        headerShadowVisible: false,
        headerTintColor: colors.text,
        headerStyle: {
          backgroundColor: colors.background,
        },
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
<Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen
        name="product/[id]"
        options={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.onPrimary,
        }}
      />

      <Stack.Screen name="order" options={{ title: "Tu pedido" }} />

      <Stack.Screen name="order-confirmed" options={{ headerShown: false }} />
    </Stack>
  );
}
