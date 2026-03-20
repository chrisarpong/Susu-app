import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, ZoomIn } from 'react-native-reanimated';
import ConfettiCannon from 'react-native-confetti-cannon';
import * as Haptics from 'expo-haptics';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';
import GlassBackground from '../components/GlassBackground';

export default function SuccessScreen({ navigation, route }) {
  // We can pass dynamic messages to this screen depending on the action!
  const {
    title = "Success!",
    message = "Welcome to the SUSU app.",
    onLogin // Pass an optional custom action to run when the timer finishes
  } = route.params || {};

  useEffect(() => {
    // 1. Play a heavy haptic vibration immediately when the success screen hits
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    // 2. Automatically pop this screen off the navigation stack after 3.5 seconds
    // This provides a seamless, premium flow where the user doesn't have to manually click "Done"
    const timer = setTimeout(() => {
      if (onLogin) {
        // If we came from the Auth flow, we need to trigger the global AppNavigator state change
        onLogin();
      } else {
        // Otherwise, just go back to the previous screen (e.g., if we were creating a group)
        navigation.goBack();
      }
    }, 4500);

    return () => clearTimeout(timer); // Cleanup timer if user manually navigates away
  }, [navigation]);

  return (
    <GlassBackground>
      <View style={styles.container}>

        {/* === CONFETTI CANNON === */}
        {/* We place it at the top so confetti falls downwards over the entire screen */}
        <ConfettiCannon
          count={100} // A dense, premium blast of confetti
          origin={{ x: -10, y: 0 }}
          autoStart={true}
          fadeOut={true} // Fades out nicely at the end instead of vanishing
          colors={[COLORS.primary, COLORS.secondary, COLORS.success, '#8B5CF6']} // Branded colors
        />

        {/* === SUCCESS CONTENT === */}
        <Animated.View entering={ZoomIn.duration(600).springify()} style={styles.cardWrapper}>
          <BlurView intensity={80} tint="light" style={[styles.successCardGlass, SHADOWS.large]}>

            {/* Massive Green Checkmark */}
            <View style={styles.iconContainer}>
              <Ionicons name="checkmark-circle" size={100} color={COLORS.success} />
            </View>

            <Animated.Text entering={FadeInDown.delay(300).duration(800).springify()} style={styles.title}>
              {title}
            </Animated.Text>

            <Animated.Text entering={FadeInDown.delay(400).duration(800).springify()} style={styles.message}>
              {message}
            </Animated.Text>

          </BlurView>
        </Animated.View>

      </View>
    </GlassBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.paddingXl,
  },
  cardWrapper: {
    width: '100%',
  },
  successCardGlass: {
    alignItems: 'center',
    paddingVertical: SIZES.paddingXl * 1.5,
    paddingHorizontal: SIZES.paddingLg,
    borderRadius: SIZES.radiusLg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    overflow: 'hidden',
  },
  iconContainer: {
    marginBottom: SIZES.paddingLg,
    // Add a subtle white glow behind the checkmark to make it pop against the glass
    shadowColor: COLORS.white,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    ...FONTS.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});
