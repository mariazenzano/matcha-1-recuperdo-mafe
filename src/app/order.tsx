import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { colors } from "../constants/colors";
import { fonts } from "../constants/fonts";
import { products } from "../constants/products";

export default function Order() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const product = products.find((item) => String(item.id) === id);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");

  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const isFormValid = name.trim().length >= 3 && phone.length === 8;

  if (!product) {
    return <Text>Producto no encontrado.</Text>;
  }

  const handlePhoneChange = (text: string) => {
    const digits = text.replace(/\D/g, "").slice(0, 8);

    setPhone(digits);

    if (digits.length > 0 && digits.length < 8) {
      setPhoneError("Faltan " + (8 - digits.length) + " números");
    } else {
      setPhoneError("");
    }
  };

  const handleSubmit = () => {
    let isValid = true;

    if (name.trim().length < 3) {
      setNameError("Escribe al menos 3 letras");
      isValid = false;
    } else {
      setNameError("");
    }

    if (phone.length !== 8) {
      setPhoneError("El celular debe tener 8 números");
      isValid = false;
    } else {
      setPhoneError("");
    }

    if (isValid) {
      router.push({
        pathname: "/order-confirmed",
        params: { name: name.trim(), product: product.name },
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.summary}>
        <Image source={product.image} style={styles.summaryImage} />

        <View style={styles.summaryInfo}>
          <Text style={styles.summaryName}>{product.name}</Text>

          <Text style={styles.summaryPrice}>Bs {product.price}</Text>
        </View>
      </View>

      <Text style={styles.label}>Tu nombre</Text>

      <TextInput
        style={[styles.input, nameError !== "" && styles.inputError]}
        value={name}
        onChangeText={(value) => {
          setName(value);
          setNameError("");
        }}
        placeholder="Ej. Ana"
        placeholderTextColor={colors.textMuted}
        autoCapitalize="words"
      />
      {nameError !== "" && <Text style={styles.error}>{nameError}</Text>}
      <Text style={styles.label}>Celular</Text>

      <TextInput
        style={[styles.input, phoneError !== "" && styles.inputError]}
        value={phone}
        onChangeText={handlePhoneChange}
        placeholder="Ej. 71234567"
        placeholderTextColor={colors.textMuted}
        keyboardType="number-pad"
        maxLength={8}
      />

      {phoneError !== "" && <Text style={styles.error}>{phoneError}</Text>}

      <Text style={styles.label}>Nota para el pedido (opcional)</Text>

      <TextInput
        style={styles.input}
        value={note}
        onChangeText={setNote}
        placeholder="Ej. menos hielo"
        placeholderTextColor={colors.textMuted}
      />

      <Pressable
        style={[styles.button, !isFormValid && styles.buttonDisabled]}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Confirmar pedido</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 24,
    gap: 8,
  },

  summary: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 14,
    marginBottom: 16,
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

  summaryInfo: {
    flex: 1,
    gap: 6,
  },

  summaryImage: {
    width: 72,
    height: 72,
    borderRadius: 20,
    resizeMode: "contain",
    backgroundColor: colors.primarySoft,
  },

  summaryName: {
    fontSize: 18,
    fontFamily: fonts.h2,
    color: colors.text,
  },

  summaryPrice: { fontSize: 20, fontFamily: fonts.h2, color: colors.primary },
  label: {
    fontSize: 13,
    fontFamily: fonts.h2,
    color: colors.textMuted,
    marginTop: 12,
    marginLeft: 4,
  },
  input: {
    paddingVertical: 16,
    paddingHorizontal: 18,
    fontSize: 16,
    fontFamily: fonts.p,
    borderWidth: 1.5,
    borderRadius: 18,
    borderColor: colors.border,
    backgroundColor: colors.card,
    color: colors.text,
  },

  inputError: {
    borderColor: colors.error,
  },

  error: {
    fontSize: 13,
    fontFamily: fonts.p,
    color: colors.error,
    marginLeft: 4,
  },

  button: {
    marginTop: 32,
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

  buttonDisabled: {
    opacity: 0.4,
    elevation: 0,
    shadowOpacity: 0,
  },
});
