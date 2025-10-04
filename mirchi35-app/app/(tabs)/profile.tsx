import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// Dynamically import ImagePicker at runtime to avoid devtime module resolution if not installed
import { useTheme } from '@/components/ThemeContext';

export default function Profile() {
  const { colors } = useTheme();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [name, setName] = useState('Jane Doe');
  const [email, setEmail] = useState('jane@example.com');
  const [phone, setPhone] = useState('9876543210');

  useEffect(() => {
    (async () => {
      try {
        const ImagePickerModule = await import('expo-image-picker');
        const { status } = await ImagePickerModule.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission required', 'We need gallery permissions to select a profile photo.');
        }
      } catch (err) {
        // expo-image-picker not installed; ignore during dev
        console.warn('expo-image-picker not available', err);
      }
    })();
  }, []);

  const pickImage = async (set: (uri: string) => void) => {
    try {
      const ImagePicker = await import('expo-image-picker');
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: true,
        aspect: [1, 1],
      } as any);
      if (!result.cancelled) {
        set((result as any).uri);
      }
    } catch (err) {
      console.warn('Image picker not available', err);
    }
  };

  const takePhoto = async (set: (uri: string) => void) => {
    try {
      const ImagePicker = await import('expo-image-picker');
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'We need camera permissions to take a photo.');
        return;
      }
      const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [1, 1], quality: 0.8 } as any);
      if (!result.cancelled) {
        set((result as any).uri);
      }
    } catch (err) {
      console.warn('Camera not available', err);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={{ padding: 16 }}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <View style={styles.avatarWrap}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatarPlaceholder, { backgroundColor: colors.primaryDark }]}>
              <Text style={{ color: '#fff', fontWeight: '700', fontSize: 18 }}>JB</Text>
            </View>
          )}
        </View>
        <Text style={[styles.headerName, { color: colors.surface }]}>{name}</Text>
      </View>

      <View style={styles.form}>
        <Text style={[styles.label, { color: colors.text }]}>Full name</Text>
        <TextInput value={name} onChangeText={setName} style={[styles.input, { backgroundColor: colors.surface, color: colors.text }]} />

        <Text style={[styles.label, { color: colors.text, marginTop: 12 }]}>Email</Text>
        <TextInput value={email} onChangeText={setEmail} keyboardType="email-address" style={[styles.input, { backgroundColor: colors.surface, color: colors.text }]} />

        <Text style={[styles.label, { color: colors.text, marginTop: 12 }]}>Phone</Text>
        <TextInput value={phone} onChangeText={setPhone} keyboardType="phone-pad" style={[styles.input, { backgroundColor: colors.surface, color: colors.text }]} />

        <View style={{ flexDirection: 'row', gap: 12, marginTop: 16 }}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.primary }]} onPress={() => takePhoto(setAvatar)}>
            <Text style={styles.actionText}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.secondary }]} onPress={() => pickImage(setAvatar)}>
            <Text style={styles.actionText}>Upload</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 18 }}>
          <Text style={[styles.label, { color: colors.text }]}>Thumbnail</Text>
          <View style={{ flexDirection: 'row', gap: 12, marginTop: 8 }}>
            {thumbnail ? (
              <Image source={{ uri: thumbnail }} style={styles.thumb} />
            ) : (
              <View style={[styles.thumbPlaceholder, { backgroundColor: colors.surface }]}>
                <Text style={{ color: colors.textLight }}>No thumbnail</Text>
              </View>
            )}
            <View style={{ justifyContent: 'center' }}>
              <TouchableOpacity style={[styles.smallAction, { backgroundColor: colors.primary }]} onPress={() => takePhoto(setThumbnail)}>
                <Text style={styles.actionText}>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.smallAction, { backgroundColor: colors.secondary, marginTop: 8 }]} onPress={() => pickImage(setThumbnail)}>
                <Text style={styles.actionText}>Gallery</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity style={[styles.saveButton, { backgroundColor: colors.primary }]} onPress={() => Alert.alert('Saved', 'Profile saved (mock)')}>
          <Text style={styles.saveText}>Save Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { height: 180, borderRadius: 12, marginBottom: 12, padding: 16, justifyContent: 'flex-end', alignItems: 'center' },
  avatarWrap: { position: 'absolute', top: 16, left: 16 },
  avatar: { width: 96, height: 96, borderRadius: 48, borderWidth: 3, borderColor: '#fff' },
  avatarPlaceholder: { width: 96, height: 96, borderRadius: 48, alignItems: 'center', justifyContent: 'center' },
  headerName: { fontSize: 20, fontWeight: '800' },
  form: { padding: 8 },
  label: { fontSize: 13, fontWeight: '700' },
  input: { height: 44, borderRadius: 10, paddingHorizontal: 12, marginTop: 8 },
  actionButton: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 10 },
  actionText: { color: '#fff', fontWeight: '700' },
  thumb: { width: 88, height: 88, borderRadius: 10 },
  thumbPlaceholder: { width: 88, height: 88, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  smallAction: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  saveButton: { marginTop: 20, paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  saveText: { color: '#fff', fontWeight: '800' },
});
