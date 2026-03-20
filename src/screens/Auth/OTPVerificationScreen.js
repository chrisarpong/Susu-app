import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import GlassBackground from '../../components/GlassBackground';

export default function OTPVerificationScreen({ navigation, route }) {
  // We get the phone number passed from the previous screen
  const { phoneNumber } = route.params || { phoneNumber: '+233 XX XXX XXXX' };
  
  // State for a 4 digit code
  const [code, setCode] = useState(['', '', '', '']);
  
  // References to the 4 input boxes so we can automatically move the cursor between them
  const inputs = useRef([]);

  const handleCodeChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Auto-advance to the next input box if a number was typed
    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    // If they press backspace on an empty box, move to the previous box
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  // Check if all 4 boxes have a number
  const isCodeComplete = code.every(digit => digit !== '');
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('ProfileSetup');
    }, 1500);
  };

  return (
    <GlassBackground>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.container}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Animated.Text entering={FadeInDown.delay(100).duration(800).springify()} style={styles.title}>
            Verify your number
          </Animated.Text>
          <Animated.Text entering={FadeInDown.delay(200).duration(800).springify()} style={styles.subtitle}>
            Enter the 4-digit code we sent to +{phoneNumber}
          </Animated.Text>

          <Animated.View entering={FadeInDown.delay(300).duration(800).springify()} style={styles.otpContainer}>
            {/* We map over our array of 4 empty strings to render 4 identical boxes */}
            {code.map((digit, index) => (
              <BlurView key={index} intensity={80} tint="light" style={styles.otpBoxGlass}>
                <TextInput
                  ref={ref => inputs.current[index] = ref}
                  style={styles.otpInput}
                  keyboardType="number-pad"
                  maxLength={1} // Only 1 digit per box
                  value={digit}
                  onChangeText={(text) => handleCodeChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  autoFocus={index === 0} // Auto focus the first box when screen loads
                />
              </BlurView>
            ))}
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(400).duration(800).springify()}>
            <TouchableOpacity style={styles.resendBtn}>
              <Text style={styles.resendText}>I didn't receive a code</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        <Animated.View entering={FadeInDown.delay(500).duration(800).springify()} style={styles.footer}>
          <TouchableOpacity 
            style={[styles.primaryButton, (!isCodeComplete || isLoading) && styles.buttonDisabled]}
            disabled={!isCodeComplete || isLoading} 
            onPress={handleVerify}
          >
            {isLoading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={styles.primaryButtonText}>Verify</Text>
            )}
          </TouchableOpacity>
        </Animated.View>

      </KeyboardAvoidingView>
    </GlassBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.padding,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: SIZES.paddingXl,
    paddingTop: SIZES.paddingXl,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    ...FONTS.md,
    color: COLORS.textSecondary,
    marginBottom: SIZES.paddingXl * 1.5,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.paddingXl,
  },
  otpBoxGlass: {
    width: 64,
    height: 72,
    borderRadius: SIZES.radiusLg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpInput: {
    ...FONTS.h1,
    color: COLORS.text,
    textAlign: 'center',
    width: '100%',
    height: '100%',
  },
  resendBtn: {
    alignItems: 'center',
    marginTop: SIZES.padding,
  },
  resendText: {
    color: COLORS.primary,
    ...FONTS.medium,
  },
  footer: {
    paddingHorizontal: SIZES.paddingXl,
    paddingBottom: SIZES.paddingXl,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.paddingLg,
    borderRadius: SIZES.radiusFull,
  },
  buttonDisabled: {
    backgroundColor: COLORS.textLight,
  },
  primaryButtonText: {
    color: COLORS.white,
    ...FONTS.h3,
  },
});
