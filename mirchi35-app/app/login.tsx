import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

const ChiliIcon = () => (
  <Svg width="40" height="60" viewBox="0 0 40 60" fill="none">
    <Path
      d="M15 8C15 8 18 2 25 5C32 8 35 15 32 25C29 35 25 45 20 50C15 55 8 52 8 45C8 38 12 30 15 20C18 10 15 8 15 8Z"
      fill="#D32F2F"
    />
    <Path
      d="M20 5C20 5 22 2 25 3C28 4 30 8 28 12C26 16 24 20 22 22C20 24 17 23 17 20C17 17 19 14 20 10C21 6 20 5 20 5Z"
      fill="#4CAF50"
    />
  </Svg>
);

export default function LoginScreen() {
  const [mobileNumber, setMobileNumber] = useState<string>('');
    const router = useRouter();

  const handleContinue = () => {
    // Add continue logic here
    console.log('Continue pressed with mobile number:', mobileNumber);
    
    // After entering mobile number, go to OTP screen
    (router as any).replace('/otp');
  };

  const handleOtpLogin = () => {
    // Add OTP login logic here
    console.log('OTP login pressed');  
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5E6A3" />
      
      <View style={styles.content}>
        {/* Logo and Title */}
        <View style={styles.header}>
          <ChiliIcon />
          <Text style={styles.title}>Mirchi 35</Text>
        </View>

        {/* Login Section */}
        <View style={styles.loginSection}>
          <Text style={styles.loginTitle}>Log in</Text>
          <Text style={styles.subtitle}>Enter your mobile number to log in</Text>

          {/* Mobile Number Input */}
          <View style={styles.inputContainer}>
            <View style={styles.countryCode}>
              <Text style={styles.countryCodeText}>+91</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Mobile number"
              placeholderTextColor="#666"
              value={mobileNumber}
              onChangeText={setMobileNumber}
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>

          {/* Continue Button */}
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={handleContinue}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>

          {/* Divider */}
          <Text style={styles.divider}>or</Text>

          {/* OTP Login */}
          <TouchableOpacity 
            style={styles.otpButton}
            onPress={handleOtpLogin}
          >
            <Text style={styles.otpButtonText}>Log in with OTP</Text>
          </TouchableOpacity>
        </View>
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
    paddingTop: 60,
    maxWidth: 768,
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 80,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#C62828',
    marginTop: 16,
    textAlign: 'center',
  },
  loginSection: {
    alignItems: 'center',
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 40,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 24,
    backgroundColor: '#FFF',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#333',
    overflow: 'hidden',
  },
  countryCode: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#DDD',
  },
  countryCodeText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#FFF',
  },
  continueButton: {
    width: '100%',
    backgroundColor: '#1B4F72',
    paddingVertical: 16,
    borderRadius: 25,
    marginBottom: 24,
  },
  continueButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  divider: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  otpButton: {
    paddingVertical: 8,
  },
  otpButtonText: {
    fontSize: 16,
    color: '#2C3E50',
    fontWeight: '500',
    textAlign: 'center',
  },
});