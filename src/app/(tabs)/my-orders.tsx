import Ionicons from '@expo/vector-icons/Ionicons';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';
import { loadOrders, Order } from '../../storage/orders';

export default function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
const [isLoading, setIsLoading] = useState(true);
useFocusEffect(
useCallback(() => {
async function fetchOrders() {
const saved = await loadOrders();
setOrders(saved);
setIsLoading(false);
}
fetchOrders();
}, [])
);

 return (
<SafeAreaView style={styles.screen}>
<Text style={styles.title}>Mis pedidos</Text>
{isLoading && <ActivityIndicator style={styles.empty} color={colors.primary} />}
{!isLoading && orders.length === 0 && (
<View style={styles.empty}>
<Ionicons name="receipt-outline" size={64} color={colors.primarySoft} />
<Text style={styles.emptyText}>Todavía no pediste nada</Text>
</View>
)}
{!isLoading && orders.length > 0 && (
<FlatList
data={orders}
keyExtractor={(order) => order.id}
contentContainerStyle={styles.list}
renderItem={({ item }) => (
<View style={styles.card}>
<View style={styles.cardInfo}>
<Text style={styles.cardName}>{item.product}</Text>
<Text style={styles.cardDate}>{item.date} · {item.name}</Text>
</View>
<Text style={styles.cardPrice}>Bs {item.price}</Text>
</View>
)}
/>
)}
</SafeAreaView>
);

}
const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, backgroundColor: colors.background },
  title: { fontSize: 18, fontFamily: fonts.h2, color: colors.text },
  empty: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  emptyText: { fontSize: 16, fontFamily: fonts.p, color: colors.textMuted },
  list: { gap: 12, paddingTop: 16 },
card: {
flexDirection: 'row',
alignItems: 'center',
padding: 16,
borderRadius: 24,
backgroundColor: colors.card,
},
cardInfo: { flex: 1, gap: 4 },
cardName: { fontSize: 16, fontFamily: fonts.h2, color: colors.text },
cardDate: { fontSize: 13, fontFamily: fonts.p, color: colors.textMuted },
cardPrice: { fontSize: 18, fontFamily: fonts.h2, color: colors.primary },
});
