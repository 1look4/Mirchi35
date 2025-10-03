import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onLogin = () => {
    setError(null);
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }
    setLoading(true);
    // Mock login delay
    setTimeout(() => {
      setLoading(false);
      // In a real app you'd validate credentials and navigate
      // For now, we'll just log to console
      console.log('Logged in', { email });
      // Navigate to tabs by replacing the stack; expo-router will resolve the route named "(tabs)"
  // Typed routes in this project are strict; cast to any to avoid type error here.
  (router as any).replace('/home');
    }, 900);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.brand}>
        <Image source={require('../assets/images/icon.png')} style={styles.logo} />
        <Text style={styles.title}>LocalFind</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={[styles.label, { marginTop: 12 }]}>Password</Text>
        <TextInput
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity onPress={onLogin} style={[styles.button, loading && styles.buttonDisabled]} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Signing in...' : 'Sign In'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.link} onPress={() => console.log('Navigate to Sign up')}>
          <Text style={styles.linkText}>Create an account</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>By continuing you agree to our Terms & Privacy</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  brand: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 72,
    height: 72,
    borderRadius: 14,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  form: {
    backgroundColor: '#fafafa',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 8,
  },
  label: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 6,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 16,
    backgroundColor: '#ef4444',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  link: {
    marginTop: 12,
    alignItems: 'center',
  },
  linkText: {
    color: '#6b7280',
  },
  error: {
    color: '#b91c1c',
    marginTop: 8,
  },
  footer: {
    marginTop: 18,
    alignItems: 'center',
  },
  footerText: {
    color: '#9ca3af',
    fontSize: 12,
  },
});
