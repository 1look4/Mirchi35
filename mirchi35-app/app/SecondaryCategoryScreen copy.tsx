import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SECONDARY = {
  restaurants: [
    { id: 'italian', title: 'Italian' },
    { id: 'chinese', title: 'Chinese' },
    { id: 'indian', title: 'Indian' },
  ],
  services: [
    { id: 'plumbing', title: 'Plumbing' },
    { id: 'electrician', title: 'Electrician' },
    { id: 'cleaning', title: 'Cleaning' },
  ],
  shopping: [
    { id: 'clothing', title: 'Clothing' },
    { id: 'electronics', title: 'Electronics' },
  ],
  beauty: [
    { id: 'salon', title: 'Salon' },
    { id: 'spa', title: 'Spa' },
  ],
  cafes: [
    { id: 'coffee', title: 'Coffee' },
    { id: 'desserts', title: 'Desserts' },
  ],
};

export default function SecondaryCategoryScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const category = (params as any).category as string | undefined;

  const items = category ? SECONDARY[category as keyof typeof SECONDARY] || [] : [];

  const onProceed = (subId: string) => {
    // Here you'd store the selected category/subcategory in state or backend
    // After choosing, navigate to home.
    (router as any).replace('/home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a subcategory</Text>
      <Text style={styles.subtitle}>{category ? `Category: ${category}` : ''}</Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => onProceed(item.id)}>
            <Text style={styles.itemText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    padding: 16,
  },
  subtitle: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    color: '#6b7280',
  },
  item: {
    padding: 16,
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    marginBottom: 12,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
