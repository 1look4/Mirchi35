import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SetLocation() {
  const router = useRouter();
  const [location] = useState('New York, NY');

  const saveLocation = () => {
    // In real app persist to storage/context
    console.log('Location set to', location);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Set Location</Text>
        <Text style={styles.subtitle}>(Map placeholder) Choose a location on the map</Text>

        <View style={styles.placeholderMap}>
          <Text style={{ color: '#666' }}>Map area (tap anywhere to set sample location)</Text>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={saveLocation}>
          <Text style={styles.saveText}>Set Location</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5E6A3' },
  content: { padding: 16, flex: 1 },
  title: { fontSize: 22, fontWeight: '800', color: '#C62828', marginBottom: 8 },
  subtitle: { color: '#374151', marginBottom: 12 },
  placeholderMap: { height: 300, backgroundColor: '#fff', borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  saveButton: { marginTop: 16, backgroundColor: '#1B4F72', padding: 12, borderRadius: 10, alignItems: 'center' },
  saveText: { color: '#fff', fontWeight: '700' },
});
