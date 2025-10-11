import { languageMetadata, useLanguage } from '@/components/LanguageContext';
import { useTheme } from '@/components/ThemeContext';
import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const [selectedLang, setSelectedLang] = useState(language);

  const save = () => {
    setTheme(selectedTheme);
    setLanguage(selectedLang as any);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Theme</Text>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Button title="Light" onPress={() => setSelectedTheme('light')} />
          <Button title="Dark" onPress={() => setSelectedTheme('dark')} />
          <Button title="Auto" onPress={() => setSelectedTheme('auto')} />
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Language</Text>
        <ScrollView style={{ maxHeight: 220 }}>
          {Object.keys(languageMetadata).map((code) => {
            const meta = (languageMetadata as any)[code];
            const selected = code === selectedLang;
            return (
              <TouchableOpacity key={code} style={[styles.langItem, selected && styles.langItemActive]} onPress={() => setSelectedLang(code as any)}>
                <Text style={styles.langText}>{meta.flag} {meta.name}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <View style={{ marginTop: 24 }}>
        <Button title="Save" onPress={save} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '800', marginBottom: 12 },
  row: { marginBottom: 18 },
  label: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
  langItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    marginBottom: 8,
  },
  langItemActive: {
    backgroundColor: '#fde68a',
  },
  langText: {
    fontSize: 16,
  },
});
