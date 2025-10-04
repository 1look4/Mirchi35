import React, { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Search() {
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const data = require('./data/businesses.json');
    setBusinesses(data);
    setResults(data);
  }, []);

  useEffect(() => {
    if (query.length > 3) {
      const q = query.toLowerCase();
      const filtered = businesses.filter(b => (b.name + ' ' + b.address + ' ' + b.description).toLowerCase().includes(q));
      setResults(filtered);
    } else {
      setResults(businesses);
    }
  }, [query, businesses]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          placeholder="Search businesses..."
          value={query}
          onChangeText={setQuery}
          style={styles.searchInput}
        />
      </View>

      <FlatList
        data={results}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Image source={{ uri: item.imageUrl }} style={styles.rowImage} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.rowTitle}>{item.name}</Text>
              <Text style={styles.rowSub}>{item.address}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  searchBarContainer: { padding: 12, backgroundColor: '#F5E6A3' },
  searchInput: { backgroundColor: '#fff', padding: 12, borderRadius: 8 },
  row: { flexDirection: 'row', marginBottom: 12, backgroundColor: '#fff', borderRadius: 10, padding: 8, alignItems: 'center' },
  rowImage: { width: 80, height: 60, borderRadius: 8 },
  rowTitle: { fontWeight: '700' },
  rowSub: { color: '#6b7280', fontSize: 12 },
});
