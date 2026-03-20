import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import GlassBackground from '../../components/GlassBackground';

export default function PhoneRegistrationScreen({ navigation }) {
  // State to store what the user types in the input box
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = () => {
    setIsLoading(true);
    // Simulate a network request connecting to the Spring Boot backend
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('OTPVerification', { phoneNumber });
    }, 1500); // 1.5 second loading delay
  };

  return (
    <GlassBackground>
      {/* KeyboardAvoidingView prevents the onscreen keyboard from covering our input fields */}
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
            Enter your phone number
          </Animated.Text>
          <Animated.Text entering={FadeInDown.delay(200).duration(800).springify()} style={styles.subtitle}>
            We'll send you a 4-digit code to verify your account.
          </Animated.Text>

          {/* Our custom glass input container */}
          <Animated.View entering={FadeInDown.delay(300).duration(800).springify()}>
            <BlurView intensity={80} tint="light" style={styles.inputContainerGlass}>
              {/* Country code prefix (Hardcoded to Ghana for now based on deep dive) */}
              <Text style={styles.countryCode}>+233</Text>
              {/* The actual text input field */}
              <TextInput
                style={styles.input}
                placeholder="XXXXXXXXX"
                placeholderTextColor={COLORS.textLight}
                keyboardType="phone-pad" // Shows the numeric keyboard instantly
                value={phoneNumber}
                onChangeText={setPhoneNumber} // Updates the React State every time they type
                autoFocus={true} // Pops the keyboard up automatically
              />
            </BlurView>
          </Animated.View>
        </View>

        {/* Continue Button */}
        <Animated.View entering={FadeInDown.delay(500).duration(800).springify()} style={styles.footer}>
          <TouchableOpacity 
            // We use conditional styling. If the phone number is too short, the button looks "disabled"
            style={[styles.primaryButton, (phoneNumber.length < 9 || isLoading) && styles.buttonDisabled]}
            disabled={phoneNumber.length < 9 || isLoading} 
            onPress={handleContinue}
          >
            {isLoading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={styles.primaryButtonText}>Continue</Text>
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
  inputContainerGlass: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    height: 64,
    borderRadius: SIZES.radiusLg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    overflow: 'hidden',
  },
  countryCode: {
    ...FONTS.h3,
    color: COLORS.text,
    paddingRight: 12,
    borderRightWidth: 1,
    borderRightColor: COLORS.divider,
  },
  input: {
    flex: 1,
    ...FONTS.h3,
    color: COLORS.text,
    paddingLeft: 12,
    height: '100%',
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
    backgroundColor: COLORS.textLight, // Greyed out if phone number isn't long enough
  },
  primaryButtonText: {
    color: COLORS.white,
    ...FONTS.h3,
  },
});
