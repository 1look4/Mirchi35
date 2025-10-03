import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CATEGORIES = [
  { id: 'restaurants', title: 'Restaurants' },
  { id: 'services', title: 'Services' },
  { id: 'shopping', title: 'Shopping' },
  { id: 'beauty', title: 'Beauty' },
  { id: 'cafes', title: 'Cafes' },
];

export default function CategoryScreen() {
  const router = useRouter();

  const onSelect = (categoryId: string) => {
    // Navigate to secondary category screen with selected id
    (router as any).push({ pathname: '/SecondaryCategoryScreen', params: { category: categoryId } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a Category</Text>
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => onSelect(item.id)}>
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
