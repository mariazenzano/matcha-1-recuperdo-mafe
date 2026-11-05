import * as Haptics from "expo-haptics";
import { router, useLocalSearchParams } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/colors";
import { fonts } from "../../constants/fonts";
import { products } from "../../constants/products";
export default function ProductDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const product = products.find((item) => String(item.id) === id);

  if (!product) {
    return <Text>Producto no encontrado.</Text>;
  }

  return (
    <View style={styles.screen}>
      <Image source={product.image} style={styles.image} />

      <View style={styles.sheet}>
        <Text style={styles.name}>{product.name}</Text>

        <Text style={styles.price}>Bs {product.price}</Text>

        <Text style={styles.description}>{product.description}</Text>

        <Pressable
          style={styles.button}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            router.push({ pathname: "/order", params: { id: product.id } });
          }}
        >
          <Text style={styles.buttonText}>Pedir</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  image: {
    width: "100%",
    height: 280,
    resizeMode: "contain",
  },
  sheet: {
    flex: 1,
    marginTop: 8,
    padding: 28,
    gap: 8,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: colors.card,
  },
  name: {
    fontSize: 30,
    fontFamily: fonts.h1,
    letterSpacing: -0.5,
    color: colors.text,
  },
  price: { fontSize: 34, fontFamily: fonts.h2, color: colors.primary },
  description: {
    fontSize: 15,
    fontFamily: fonts.p,
    lineHeight: 24,
    color: colors.textMuted,
    marginTop: 8,
  },
  button: {
    marginTop: "auto",
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: "center",
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
