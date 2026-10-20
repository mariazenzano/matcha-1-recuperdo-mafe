import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";
import { fonts } from "../constants/fonts";

export default function OrderConfirmed() {
  const { name, product } = useLocalSearchParams<{
    name: string;
    product: string;
  }>();

  return (
    <View style={styles.screen}>
      <Ionicons name="checkmark-circle" size={110} color={colors.primary} />

      <Text style={styles.title}>¡Pedido listo, {name}!</Text>

      <Text style={styles.subtitle}>Tu {product} ya se está preparando.</Text>

      <Pressable style={styles.button} onPress={() => router.dismissAll()}>
        <Text style={styles.buttonText}>Volver al menú</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    gap: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },

  title: {
    fontSize: 28,
    fontFamily: fonts.h1,
    letterSpacing: -0.5,
    color: colors.text,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 16,
    fontFamily: fonts.p,
    lineHeight: 24,
    color: colors.textMuted,
    textAlign: "center",
  },

  button: {
    marginTop: 32,
    paddingVertical: 18,
    paddingHorizontal: 48,
    borderRadius: 30,
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 4,
  },

  buttonText: {
    fontSize: 17,
    fontFamily: fonts.h2,
    letterSpacing: 0.3,
    color: colors.onPrimary,
  },
});
