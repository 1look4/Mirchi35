import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    Keyboard,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function OtpScreen() {
  const router = useRouter();
  const [digits, setDigits] = useState<string[]>(['', '', '', '']);
  const inputs = [useRef<TextInput | null>(null), useRef<TextInput | null>(null), useRef<TextInput | null>(null), useRef<TextInput | null>(null)];

  const handleChange = (idx: number, value: string) => {
    const char = value.replace(/[^0-9]/g, '').slice(-1);
    const next = [...digits];
    next[idx] = char;
    setDigits(next);
    if (char && idx < 3) {
      inputs[idx + 1].current?.focus();
    }
  };

  const handleKeyPress = (idx: number, e: any) => {
    if (e.nativeEvent.key === 'Backspace' && !digits[idx] && idx > 0) {
      inputs[idx - 1].current?.focus();
    }
  };

  const handleProceed = () => {
    const code = digits.join('');
    console.log('Entered OTP:', code);
    Keyboard.dismiss();
    // For now accept any 4-digit code and navigate to home
    (router as any).replace('/(tabs)/home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5E6A3" />

      <View style={styles.content}>
  <Text style={styles.title}>Enter OTP</Text>
  <Text style={styles.subtitle}>We&apos;ve sent a 4-digit code to your mobile number</Text>

        <View style={styles.otpRow}>
          {digits.map((d, i) => (
            <TextInput
              key={i}
              ref={(ref) => { inputs[i].current = ref; }}
              value={d}
              onChangeText={(val) => handleChange(i, val)}
              onKeyPress={(e) => handleKeyPress(i, e)}
              keyboardType="number-pad"
              maxLength={1}
              style={styles.otpInput}
              textAlign="center"
              placeholder="•"
              placeholderTextColor="#999"
              autoFocus={i === 0}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
          <Text style={styles.proceedButtonText}>Proceed</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resend} onPress={() => console.log('Resend OTP')}>
          <Text style={styles.resendText}>We&apos;ve sent a 4-digit code to your mobile number</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E6A3',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    maxWidth: 768,
    alignSelf: 'center',
    width: '100%'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 32,
    textAlign: 'center'
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    marginBottom: 24,
  },
  otpInput: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#333',
    fontSize: 28,
    color: '#333'
  },
  proceedButton: {
    width: '100%',
    backgroundColor: '#1B4F72',
    paddingVertical: 16,
    borderRadius: 25,
    marginTop: 8
  },
  proceedButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  resend: {
    marginTop: 12,
  },
  resendText: {
    color: '#2C3E50',
    textAlign: 'center'
  }
});
