import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../constants/colors";
import { fonts } from "../constants/fonts";
import { products } from "../constants/products";

export default function Index() {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Matcha.</Text>

        <Text style={styles.subtitle}>¿Qué vas a tomar hoy?</Text>

        {products.map((product) => (
          <Link
            key={product.id}
            href={{
              pathname: "/product/[id]",
              params: { id: String(product.id) },
            }}
            asChild
          >
            <Pressable style={styles.card}>
              <Image source={product.image} style={styles.cardImage} />

              <View style={styles.cardInfo}>
                <Text style={styles.cardName}>{product.name}</Text>

                <Text style={styles.cardPrice}>Bs {product.price}</Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.textMuted}
              />
            </Pressable>
          </Link>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 24,
    gap: 16,
  },
  title: {
    fontSize: 36,
    fontFamily: fonts.h1,
    letterSpacing: -1,
    color: colors.text,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: fonts.p,
    color: colors.textMuted,
    marginBottom: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 14,
    borderRadius: 28,
    backgroundColor: colors.card,
    shadowColor: colors.text,
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 2,
  },
  cardImage: {
    width: 84,
    height: 84,
    borderRadius: 22,
    resizeMode: "contain",
    backgroundColor: colors.primarySoft,
  },
  cardInfo: {
    flex: 1,
    gap: 6,
  },
  cardName: { fontSize: 18, fontFamily: fonts.h2, color: colors.text },
  cardPrice: { fontSize: 20, fontFamily: fonts.h2, color: colors.primary },
});
