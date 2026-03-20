import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, Image } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import * as ImagePicker from 'expo-image-picker';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import GlassBackground from '../../components/GlassBackground';
import { useUser } from '../../context/UserContext';

// We pass down a special prop (onLogin) from the AppNavigator to trigger the app state change
export default function ProfileSetupScreen({ navigation, route }) {
  const { onLogin } = route.params || {};
  const { updateUser } = useUser();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const pickImage = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleCompleteSetup = () => {
    setIsLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); // Haptic feedback on button press

    // In a real app, we would make a POST request to '/users/create' here

    setTimeout(() => {
      setIsLoading(false);

      // Save user data to context so HomeScreen and ProfileScreen can read it!
      updateUser({ fullName: fullName.trim(), email: email.trim(), profileImage });

      // Trigger the login which flips the auth state in AppNavigator
      // This replaces the entire Auth stack with the Main app stack
      if (onLogin) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        onLogin();
      }

    }, 1500);
  };

  const isFormValid = fullName.trim().length > 0 && email.trim().length > 0;

  return (
    <GlassBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>

          <View style={styles.content}>
            <Animated.Text entering={FadeInDown.delay(100).duration(800).springify()} style={styles.title}>
              Complete your profile
            </Animated.Text>
            <Animated.Text entering={FadeInDown.delay(200).duration(800).springify()} style={styles.subtitle}>
              Tell us a bit about yourself to get started with PledgePay.
            </Animated.Text>

            {/* Profile Picture - Tap to pick from photo library */}
            <Animated.View entering={FadeInDown.delay(300).duration(800).springify()} style={styles.avatarContainer}>
              <TouchableOpacity onPress={pickImage}>
                <BlurView intensity={80} tint="light" style={styles.avatarGlass}>
                  {profileImage ? (
                    <Image source={{ uri: profileImage }} style={styles.avatarImage} />
                  ) : (
                    <Ionicons name="camera-outline" size={32} color={COLORS.textSecondary} />
                  )}
                </BlurView>
                {/* Small edit badge overlay */}
                <View style={styles.editBadge}>
                  <Ionicons name="pencil" size={12} color={COLORS.white} />
                </View>
              </TouchableOpacity>
            </Animated.View>

            {/* Form Fields */}
            <Animated.View entering={FadeInDown.delay(400).duration(800).springify()} style={styles.formGroup}>
              <Text style={styles.label}>Full Name</Text>
              <BlurView intensity={80} tint="light" style={styles.inputGlass}>
                <Ionicons name="person-outline" size={20} color={COLORS.textSecondary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Name"
                  placeholderTextColor={COLORS.textLight}
                  value={fullName}
                  onChangeText={setFullName}
                />
              </BlurView>
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(500).duration(800).springify()} style={styles.formGroup}>
              <Text style={styles.label}>Email Address</Text>
              <BlurView intensity={80} tint="light" style={styles.inputGlass}>
                <Ionicons name="mail-outline" size={20} color={COLORS.textSecondary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="email@example.com"
                  placeholderTextColor={COLORS.textLight}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </BlurView>
            </Animated.View>

          </View>
        </ScrollView>

        <Animated.View entering={FadeInDown.delay(600).duration(800).springify()} style={styles.footer}>
          <TouchableOpacity
            style={[styles.primaryButton, (!isFormValid || isLoading) && styles.buttonDisabled]}
            disabled={!isFormValid || isLoading}
            onPress={handleCompleteSetup}
          >
            {isLoading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={styles.primaryButtonText}>Finish Setup</Text>
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
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    paddingHorizontal: SIZES.paddingXl,
    paddingTop: SIZES.paddingXl * 2, // Extra top padding since there's no back button on this screen
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
    marginBottom: SIZES.paddingXl,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: SIZES.paddingXl,
  },
  avatarGlass: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    overflow: 'hidden',
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  formGroup: {
    marginBottom: SIZES.paddingLg,
  },
  label: {
    ...FONTS.medium,
    color: COLORS.textSecondary,
    marginBottom: 8,
    marginLeft: 4,
  },
  inputGlass: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    borderRadius: SIZES.radiusLg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    overflow: 'hidden',
    paddingHorizontal: SIZES.padding,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    ...FONTS.md,
    color: COLORS.text,
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
    backgroundColor: COLORS.textLight,
  },
  primaryButtonText: {
    color: COLORS.white,
    ...FONTS.h3,
  },
});
