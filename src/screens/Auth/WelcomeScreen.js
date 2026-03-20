import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, { FadeInDown } from 'react-native-reanimated';
import * as LocalAuthentication from 'expo-local-authentication';
import * as Haptics from 'expo-haptics';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import GlassBackground from '../../components/GlassBackground';
import { Ionicons } from '@expo/vector-icons';

export default function WelcomeScreen({ navigation, route }) {
  // We extract onLogin so Biometrics can bypass the entire Auth flow!
  const { onLogin } = route.params || {};

  const handleBiometricAuth = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // 1. Check if hardware supports biometrics
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible) {
      alert("This device doesn't support biometric login.");
      return;
    }

    // 2. Check if a fingerprint/face is enrolled
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    if (!enrolled) {
      alert("No biometrics (Face ID/Touch ID) found on this device.");
      return;
    }

    // 3. Prompt the OS biometric scanner
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Log in to PledgePay',
      fallbackLabel: 'Use Passcode',
      disableDeviceFallback: false,
    });

    // 4. If successful, bypass OTP and log them straight into the dashboard
    if (result.success && onLogin) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      onLogin(); 
    }
  };

  return (
    <GlassBackground>
      {/* We use flex: 1 to ensure this View pushes the footer to the bottom */}
      <View style={styles.container}>
        
        {/* === BRANDING SECTION === */}
        <View style={styles.brandingContainer}>
          {/* A glass icon placeholder for the Susu/PledgePay logo */}
          <Animated.View entering={FadeInDown.delay(100).duration(800).springify()}>
            <BlurView intensity={80} tint="light" style={styles.logoGlass}>
              <Ionicons name="wallet" size={48} color={COLORS.primary} />
            </BlurView>
          </Animated.View>
          
          <Animated.Text entering={FadeInDown.delay(200).duration(800).springify()} style={styles.title}>
            PledgePay
          </Animated.Text>
          <Animated.Text entering={FadeInDown.delay(300).duration(800).springify()} style={styles.subtitle}>
            Modern community savings. Join a trusted Susu group and reach your financial goals together.
          </Animated.Text>
        </View>

        {/* === FOOTER ACTION SECTION === */}
        <Animated.View entering={FadeInDown.delay(500).duration(800).springify()} style={styles.footer}>
          
          <View style={styles.buttonRow}>
            {/* Main Call To Action (CTA) Button - Now takes up less space to fit the FaceID button */}
            <TouchableOpacity 
              style={[styles.primaryButton, { flex: 1, marginRight: 12 }]}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                navigation.navigate('PhoneRegistration');
              }}
            >
              <Text style={styles.primaryButtonText}>Get Started</Text>
              <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
            </TouchableOpacity>

            {/* Premium FaceID / TouchID Quick Login Button */}
            <TouchableOpacity 
              style={styles.biometricButton}
              onPress={handleBiometricAuth}
            >
              <BlurView intensity={80} tint="light" style={styles.biometricGlass}>
                <Ionicons name="scan-outline" size={24} color={COLORS.primary} />
              </BlurView>
            </TouchableOpacity>
          </View>
          
          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('PhoneRegistration')}>
              <Text style={styles.loginLink}>Log In</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

      </View>
    </GlassBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Take up all available space inside the GlassBackground Safe Area
    justifyContent: 'space-between', // Pushes branding up, footer down
    paddingHorizontal: SIZES.paddingXl,
    paddingBottom: SIZES.paddingXl,
  },
  brandingContainer: {
    flex: 1,
    justifyContent: 'center', // Centers the logo vertically on the screen
    alignItems: 'center',
  },
  logoGlass: {
    width: 100,
    height: 100,
    borderRadius: 30, // Slight squircle shape instead of perfect circle
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: SIZES.paddingLg,
    overflow: 'hidden',
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: -1,
    marginBottom: SIZES.padding,
  },
  subtitle: {
    ...FONTS.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24, // Adds line spacing for readability
    paddingHorizontal: SIZES.padding,
  },
  footer: {
    width: '100%',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  primaryButton: {
    backgroundColor: COLORS.primary, // Dark professional blue
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.paddingLg,
    borderRadius: SIZES.radiusFull, // Pill shape
    gap: 8,
  },
  biometricButton: {
    width: SIZES.paddingLg * 3.5, // Make it roughly square to match the height of primaryButton
    height: SIZES.paddingLg * 3.5,
  },
  biometricGlass: {
    flex: 1,
    borderRadius: SIZES.radiusLg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    overflow: 'hidden',
  },
  primaryButtonText: {
    color: COLORS.white,
    ...FONTS.h3,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SIZES.paddingLg,
  },
  loginText: {
    color: COLORS.textSecondary,
    ...FONTS.medium,
  },
  loginLink: {
    color: COLORS.primary,
    ...FONTS.bold,
  },
});
