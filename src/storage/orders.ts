import AsyncStorage from '@react-native-async-storage/async-storage';
export type Order = {
id: string;
product: string;
price: number;
name: string;
date: string;
};
const ORDERS_KEY = 'orders';
export async function loadOrders(): Promise<Order[]> {
const saved = await AsyncStorage.getItem(ORDERS_KEY);
if (saved === null) {
return [];
}
return JSON.parse(saved);
}
export async function saveOrders(orders: Order[]) {
await AsyncStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}
